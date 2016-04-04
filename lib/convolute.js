'use strict';

const util = require('../util');

module.exports = (kernel, matrix) => {
  const width = util.matrix.width(matrix);
  const height = util.matrix.height(matrix);
  const within = (i, j) => 0 <= i && i < width && 0 <= j && j < height;
  const grid = (i, j) => within(i, j) ? matrix[i][j] : 0;
  return util.matrix.createWith(
    width, height,
    (i, j) => {
      let k = 0;
      util.matrix.forEachIn(kernel.matrix, (x, y) => {
        k += grid(i + x + kernel.dx, j + y + kernel.dy) * kernel.matrix[x][y];
      });
      return k;
    }
  );
};
