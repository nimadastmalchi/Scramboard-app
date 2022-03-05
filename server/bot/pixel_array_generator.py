# pixel_array_generator.py
# This file takes as input a 50x50 image called image.png in the
# same directory as this file and outputs a 2d array in JavaScript
# format that represents the image as an array of RGB values.

import PIL
from PIL import Image
import numpy as np
import math
import sys


def get_hex(dec):
    return "0x{:02x}".format(dec).split('x')[1]


class Pixel:
    def __init__(self, r, g, b):
        self.r = r
        self.g = g
        self.b = b
    def __repr__(self):
        return '#' + get_hex(self.r) + get_hex(self.g) + get_hex(self.b)


def main():
    image_filename = input('Enter image file name in bot/images directory: ')
    image = PIL.Image.open('images/' + image_filename)
    image = image.resize((50,50), Image.ANTIALIAS)
    image_sequence = image.getdata()
    image_array = np.array(image_sequence)

    pixels_1d_list = [0 for _ in range(len(image_array))]
    i = 0
    while i < len(image_array):
        pixels_1d_list[i] = Pixel(image_array[i][0], image_array[i][1], image_array[i][2])
        i += 1

    pixels_len = len(pixels_1d_list)

    n = int(math.sqrt(pixels_len))
    pixels_2d_list = [[0 for _ in range(n)] for _ in range(n)]

    for i in range(n):
        for j in range(n):
            pixel = pixels_1d_list[i*n + j]
            pixels_2d_list[i][j] = Pixel(pixel.r, pixel.g, pixel.b)

    outfile = open('PixelArrayData.txt', 'w')
    for i in range(50):
        for j in range(50):
            outfile.write(str(pixels_2d_list[i][j]))
            if j != 49:
                outfile.write(' ')
        outfile.write('\n')
    

    #sys.stdout.write('[')
    #for i in range(50):
    #    sys.stdout.write('[')
    #    for j in range(50):
    #        sys.stdout.write(str(pixels_2d_list[i][j]))
    #        if j != 49:
    #            sys.stdout.write(', ')
    #    sys.stdout.write(']')
    #    if i != 49:
    #        sys.stdout.write(', ')
    #sys.stdout.write(']')

if __name__ == '__main__':
    main()
