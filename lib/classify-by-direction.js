'use strict';

const util = require('../util');

const directions = require('./directions');

module.exports = (grayMatrix, directionMatrices) => {
  const width = util.matrix.width(grayMatrix);
  const height = util.matrix.height(grayMatrix);
  const classifieds = directions.map(() => util.matrix.createWith(width, height, 0));
  util.matrix.forEachIn(grayMatrix, (i, j) => {
    let minK = 0;
    let minG = directionMatrices[0][i][j];
    for (let k = 1; k < directionMatrices.length; k++) {
      if (directionMatrices[k][i][j] < minG) {
        minG = directionMatrices[k][i][j];
        minK = k;
      }
    }
    classifieds[minK][i][j] = grayMatrix[i][j];
  });
  return classifieds;
};
