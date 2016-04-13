'use strict';

const util = require('../util');

const directions = require('./directions');

module.exports = (grayMatrix, classifieds) => {
  const width = util.matrix.width(grayMatrix);
  const height = util.matrix.height(grayMatrix);

  const kernelSize = Math.min(width, height) / 30;
  const kernelRadius = Math.round(kernelSize / 2);
  const within = (i, j) => 0 <= i && i < width && 0 <= j && j < height;
  const _grid = (k, i, j) => within(i, j) ? classifieds[k][i][j] : 0;
  const grid = (k, i, j) => _grid(k, Math.round(i), Math.round(j));

  const joint = util.matrix.createWith(width, height, 0);

  for (let classifiedIndex = 0; classifiedIndex < classifieds.length; classifiedIndex++) {
    const classified = classifieds[classifiedIndex];
    const direction = directions[classifiedIndex];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        for (let k = -kernelRadius; k < kernelRadius; k++) {
          joint[i][j] += grid(classifiedIndex, i + k * direction[0], j + k * direction[1]);
        }
      }
    }
  }

  return joint;
};
