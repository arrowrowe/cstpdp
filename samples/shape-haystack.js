'use strict';

const util = require('../util');
const convert = require('../lib/convert');
const convolute8 = require('../lib/convolute8');
const classifyByDirection = require('../lib/classify-by-direction');
const joinClassifieds = require('../lib/join-classifieds');

util.file.process(
  'input/haystack-gradient.png',
  'output/haystack/joint.png',
  (image) => {
    const grayMatrix = convert.grayToMatrix(image);
    util.log.trace('Got: the gradients matrix');
    const directionMatrices = convolute8(grayMatrix);
    util.log.trace('Got: 8 convoluted matrices');
    const classifieds = classifyByDirection(grayMatrix, directionMatrices);
    util.log.trace('Got: 8 classified matrices');
    const joint = joinClassifieds(grayMatrix, classifieds);
    util.log.trace('Got: the joint matrix');
    const jointImage = convert.matrixToGray(joint);
    util.log.trace('Got: the joint image');
    return jointImage;
  }
);
