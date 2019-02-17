# -*- coding: utf-8 -*-
import unittest
from unittest import mock
import app
from PIL import Image
import pathlib
from exception import MyException

class TestCase(unittest.TestCase):

    def test_calc_img_position_of_normal(self):
        lef, upp, rig, low = app._calc_img_position(2, 2, 10, 10)
        self.assertEqual(lef, 20)
        self.assertEqual(upp, 20)
        self.assertEqual(rig, 30)
        self.assertEqual(low, 30)

    def test_make_img_path_of_normal(self):
        pathlib.Path('dst/testdata/test').rmdir()
        self.assertTrue(app._make_img_path('dst/testdata/test'))

    def test_calc_interval_of_normal(self):
        ver_interval, hori_interval = app._calc_interval(100, 200, 10)
        self.assertEqual(ver_interval, 10)
        self.assertEqual(hori_interval, 20)

    def test_has_sar_img_of_normal(self):
        self.assertTrue(app._has_sar_img('dst/testdata/test.png'))

    def test_split_and_save_img(self):
        pathlib.Path('dst/testdata/0.png').unlink()
        _img = Image.open('dst/testdata/test.png')
        app._split_and_save_img(_img, 64, 64, 'dst/testdata', 4)
        _img.close()
        self.assertTrue(pathlib.Path('dst/testdata/0.png').exists())

    def test_get_sar_crop_params_of_normal(self):
        _params = app._get_sar_crop_params('true-9-449-202')
        self.assertEqual(_params, [1000, 7800, 23000, 33000])

    def test_get_sar_crop_params_of_raise(self):
        with self.assertRaises(MyException):
            app._get_sar_crop_params('')

    def test_get_sar_tif_img_path_of_normal(self):
        _val = app._get_sar_tif_img_path('true-9-449-202')
        self.assertEqual(_val, '/1/6/data')

    def test_get_sar_tif_img_path_of_raise(self):
        with self.assertRaises(MyException):
            app._get_sar_tif_img_path('')

    @mock.patch('app._get_sar_crop_params')
    def test_crop_and_save_convert_sar_png_img_of_normal(self, mock_get_sar_crop_params):
        _read_api_path = '/1/6/data'
        _save_path = 'dst/testdata/testtif.png'
        if pathlib.Path(_save_path).exists():
            pathlib.Path(_save_path).unlink()
        mock_get_sar_crop_params.return_value = [10, 10, 20, 20]
        app._crop_and_save_convert_sar_png_img(_read_api_path, _save_path, '')
        self.assertTrue(pathlib.Path(_save_path).exists())

if __name__ == '__main__':
    unittest.main()

