# -*- coding: utf-8 -*-
import unittest
import app

class TestCase(unittest.TestCase):

    def test_calc_img_position_of_normal(self):
        lef, upp, rig, low = app.calc_img_position(2, 2, 10, 10)
        self.assertEqual(lef, 20)
        self.assertEqual(upp, 20)
        self.assertEqual(rig, 30)
        self.assertEqual(low, 30)

    def test_make_img_path_of_normal(self):
        self.assertTrue(app.make_img_path('dst/test.txt'))

    def test_calc_interval_of_normal(self):
        ver_s, hori_s, ver_interval, hori_interval = app.calc_interval(100, 200, 10)
        self.assertEqual(ver_s, 100)
        self.assertEqual(hori_s, 200)
        self.assertEqual(ver_interval, 10)
        self.assertEqual(hori_interval, 20)

if __name__ == '__main__':
    unittest.main()

