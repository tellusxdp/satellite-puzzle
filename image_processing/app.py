# -*- coding: utf-8 -*-

from flask import Flask, request, jsonify
from flask_api import status
from PIL import Image
# DOSの危険があるので注意
Image.MAX_IMAGE_PIXELS = 963092800
import os.path
import requests
from exception import MyException
from io import BytesIO
import logging
import pathlib

app = Flask(__name__)

img_url = 'https://gisapi.opf-dev.jp'
map_kinds = {
    'osm': 'osm',
    'landsat8': 'landsat8',
    'landsat8-201808': 'landsat8-201808',
    'true': 'true',
    'natural': 'natural',
    'band1blue': 'av2ori/band1',
    'band2green': 'av2ori/band2'
}

# SAR画像の切り取る部分をハードコード
# 後に仕様変更される
sar_crop_params = {
    'true-9-449-202': [1000, 7800, 23000, 33000],
    'true-10-909-403': [],
    'true-8-226-98': [0, 0, 27720, 31440]
}
# SAR画像のパス、ハードコード
sar_tif_img_path = {
    'true-9-449-202': '/var/biwa.tif',
    'true-10-909-403': '/var/tokyo.tif',
    'true-8-226-98': '/var/sado.tif'
}

@app.errorhandler(Exception)
def handle_exception(error):
    logging.exception(error)
    return jsonify({'message': 'internal server error'}), status.HTTP_500_INTERNAL_SERVER_ERROR

@app.errorhandler(MyException)
def handle_my_exception(error):
    logging.exception(error)
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.route("/")
def index():
    # query stringのパラメータ取得
    _x, _y, _z, _map_kind, _split_n = get_request()

    # 画像を保存するディレクトリ
    _save_img_dir = 'dst/%s/%d-%d-%d-%d' % (map_kinds[_map_kind], _z, _x, _y, _split_n)
    if not _make_img_path(_save_img_dir):
        raise MyException("img directory couldn't be made", 500)

    # 光学画像を保存、分割する
    _func_op_img(_save_img_dir, _x, _y, _z, _map_kind, _split_n)
    # SAR画像を切り取り、保存する処理
    _func_sar_img(_save_img_dir, _x, _y, _z, _map_kind, _split_n)

    return jsonify({'message': 'image processing was completed'})

# 光学画像処理
def _func_op_img(save_img_dir, x, y, z, map_kind, split_n):
    _img = None
    try:
        # urlから取得した画像をメモリの保持
        _req_url = '%s/%s/%d/%d/%d.png' % (img_url, map_kinds[map_kind], z, x, y)
        _res = requests.get(_req_url)
        _img = Image.open(BytesIO(_res.content))

        # 光学画像のファイルパス
        _save_op_img_path = '%s/completed.png' % save_img_dir

        # 最終完成イメージ保存
        _img.save(_save_op_img_path, quality = 95)

        _ver_s, _hori_s = _img.size
        # 切り取り間隔を取得
        _ver_interval, _hori_interval = _calc_interval(_ver_s, _hori_s, split_n)
        # 光学画像を切り取り、保存する処理
        _split_and_save_img(_img, _ver_interval, _hori_interval, save_img_dir, split_n)
    except:
        raise MyException("couldn't split or save optical image", 500)
    finally:
        if _img is not None:
            _img.close()

# SAR画像処理
def _func_sar_img(save_img_dir, x, y, z, map_kind, split_n):
    # 画像保存ディレクトリ作成
    _save_sar_png_img_dir = save_img_dir + '/sar'
    if not _make_img_path(_save_sar_png_img_dir):
        raise MyException("img directory couldn't be made", 500)

    _save_sar_png_img_path = _save_sar_png_img_dir + '/completed.png'
    if _has_sar_img(_save_sar_png_img_path):
        return

    # ハードコードされているmapからvalueを取得するためのkey
    key = '%s-%d-%d-%d' % (map_kinds[map_kind], z, x, y)

    # SAR画像のtifのファイルパス
    _sar_tif_img_path = _get_sar_tif_img_path(key)

    try:
        # SARのフル画像を規定のサイズにcropし、pngに変換してsaveする
        _crop_and_save_convert_sar_png_img(_sar_tif_img_path, _save_sar_png_img_path, key)
    except:
        raise MyException("couldn't save sar png img", 500)

    # SARのpng画像を分割して保存
    _img = None
    try:
        _img = Image.open(_save_sar_png_img_path)
        _ver_s, _hori_s = _img.size
        # 切り取り間隔を取得
        _ver_interval, _hori_interval = _calc_interval(_ver_s, _hori_s, split_n)

        # SAR画像を切り取り、保存する処理
        _split_and_save_img(_img, _ver_interval, _hori_interval, _save_sar_png_img_dir, split_n)
    except:
        raise MyException("couln't split and save sar img", 500)
    finally:
        if _img is not None:
            _img.close()

# SARのフル画像を光学画像に合わせるようにcrop
def _crop_and_save_convert_sar_png_img(read_sar_img_path, save_sar_png_img_path, key, op_size = 256):
    _left, _upper, _right, _lower = _get_sar_crop_params(key)
    _box = (_left, _upper, _right, _lower)

    _img = None
    try:
        _img = Image.open(read_sar_img_path)
        _img.point(lambda i:i*(1./256)).convert('L').crop(_box).resize((op_size, op_size)).save(save_sar_png_img_path, 'PNG', quality=True)
    except:
        raise MyException("couldn't crop sar full image", 500)
    finally:
        if _img is not None:
            _img.close()

# SAR画像のtifのファイルパスを取得
def _get_sar_tif_img_path(key):
    try:
        return sar_tif_img_path[key]
    except KeyError as e:
        raise MyException('sar crop parameter nothing', 400)

# SAR画像のcropパラメータ取得
def _get_sar_crop_params(key):
    try:
        return sar_crop_params[key]
    except KeyError as e:
        raise MyException('sar crop parameter nothing', 400)


# 画像分割して保存をする
def _split_and_save_img(img, ver_interval, hori_interval, save_img_dir, split_n, q = 95):
    for ver_i in range(split_n):
        for hori_i in range(split_n):
            # 切り取る領域を計算
            left, upper, right, lower = _calc_img_position(hori_i, ver_i, hori_interval, ver_interval)
            box = (left, upper, right, lower)

            # 画像を保存するパス
            save_img_path = '%s/%d.png' % (save_img_dir, ((ver_i * split_n) + hori_i))
            # 画像切り取り、保存
            img.crop(box).save(save_img_path, quality = q)


# SAR画像分割処理
def _has_sar_img(sar_img_path):
    return pathlib.Path(sar_img_path).exists()

# 画像保存先のディレクトリ作成
def _make_img_path(save_img_directory):
    p = pathlib.Path(save_img_directory)
    if p.exists():
        return True
    else:
        p.mkdir(parents=True)
        return p.is_dir()

# 切り取り画像のいちを計算
def _calc_img_position(hori_i, ver_i, hori_interval, ver_interval):
    return hori_interval * hori_i, ver_interval * ver_i, hori_interval * (hori_i + 1), ver_interval * (ver_i+ 1)

# query stringからパラメータを取得
def get_request():
    try:
        req_args = request.args
        x, y, z, map_kind, split_n = int(req_args.get('x')), int(req_args.get('y')), int(req_args.get('z')), req_args.get('kind'), int(req_args.get('split_n'))
        if x <= 0 or y <= 0 or z <= 0 or split_n <= 0:
            raise MyException('invalid parameter. x, y, z, split_n variables must be greater than 0', 400, req_args)
        return x, y, z, map_kind, split_n
    except (ValueError, TypeError) as e:
        raise MyException('invalid parameter. please confirm query string', 400, req_args)
    except e:
        raise MyException('internal server error', 500, req_args)

# 切り取り間隔を計算
def _calc_interval(ver_s, hori_s, split_n):
    try:
        ver_interval = ver_s / split_n
        hori_interval = hori_s / split_n
        return ver_interval, hori_interval
    except ZeroDivisionError as e:
        raise MyException('zero division error', 400)


