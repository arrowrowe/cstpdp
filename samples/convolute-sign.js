'use strict';

const util = require('../util');
const convert = require('../lib/convert');
const convolute8 = require('../lib/convolute8');

util.file.process(
  'output/sign/gradients.png',
  (i) => 'output/sign/convolute/' + i + '.png',
  (image) => convolute8(convert.grayToMatrix(image)).map(convert.matrixToGray)
);
