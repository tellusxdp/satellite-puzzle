from flask import Flask, request, jsonify
from flask_api import status
from PIL import Image
import os.path
import requests
from exception import MyException
from io import BytesIO
import logging
import pathlib

app = Flask(__name__)

img_url = 'https://img.opf-dev.jp'
map_kinds = {
        'osm': 'osm',
        'landsat8': 'landsat8',
        'landsat8-201808': 'landsat8-201808',
        'true': 'true',
        'natural': 'natural',
        'band1blue': 'av2ori/band1',
        'band2green': 'av2ori/band2'
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
    x, y, z, map_kind, split_n = get_request()

    # urlから取得した画像をメモリの保持
    req_url = '%s/%s/%d/%d/%d.png' % (img_url, map_kinds[map_kind], z, x, y)
    res = requests.get(req_url)
    img = Image.open(BytesIO(res.content))

    # 画像保存パラメータ
    img_quality = 95
    save_img_directory = 'dst/%s/%d-%d-%d-%d' % (map_kinds[map_kind], z, x, y, split_n)
    if not make_img_path(save_img_directory):
        raise MyException("img directory couldn't not be made", 500)

    save_img_path = '%s/completed.png' % save_img_directory

    # 最終完成イメージ保存
    img.save(save_img_path, quality = img_quality)

    # 切り取り間隔を取得
    ver_s, hori_s, ver_interval, hori_interval = calc_interval(img, split_n)

    # 画像を切り取り、保存する処理
    for ver_i in range(split_n):
        for hori_i in range(split_n):
            # 切り取る領域を計算
            left, upper, right, lower = calc_img_pozition(hori_i, ver_i, hori_interval, ver_interval)
            box = (left, upper, right, lower)

            # 画像を保存するパス
            save_img_path = '%s/%d.png' % (save_img_directory, ((ver_i * split_n) + hori_i))
            # 画像切り取り、保存
            img.crop(box).save(save_img_path, quality = img_quality)
    img.close()

    return jsonify({'message': 'image processing was completed'})

# 画像保存先のディレクトリ作成
def make_img_path(save_img_directory):
    p = pathlib.Path(save_img_directory)
    if p.exists():
        return True
    else:
        p.mkdir(parents=True)
        return p.is_dir()


# 切り取り画像のいちを計算
def calc_img_pozition(hori_i, ver_i, hori_interval, ver_interval):
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
def calc_interval(img, split_n):
    try:
        ver_s, hori_s = img.size
        ver_interval = ver_s / split_n
        hori_interval = hori_s / split_n
        return ver_s, hori_s, ver_interval, hori_interval
    except ZeroDivisionError as e:
        raise MyException('zero division error', 400)

