'use strict';

const util = require('../util');

const directions = [
  [1, 0],
  [Math.cos(Math.PI / 8), Math.sin(Math.PI / 8)],
  [Math.SQRT1_2, Math.SQRT1_2]
];
directions.push([directions[1][1], directions[1][0]]);
for (let j = 0; j < 4; j++) {
  directions.push([-directions[j][1], directions[j][0]]);
}

module.exports = (matrix) => {
  const width = util.matrix.width(matrix);
  const height = util.matrix.height(matrix);
  const kernelSize = Math.min(width, height) / 30;
  const kernelRadius = Math.round(kernelSize / 2);
  const within = (i, j) => 0 <= i && i < width && 0 <= j && j < height;
  const _grid = (i, j) => within(i, j) ? matrix[i][j] : 0;
  const grid = (i, j) => _grid(Math.round(i), Math.round(j));
  return directions.map((direction) => util.matrix.createWith(
    width, height,
    (i, j) => {
      let sum = 0;
      for (let k = -kernelRadius; k < kernelRadius; k++) {
        sum += grid(i + k * direction[0], j + k * direction[1]);
      }
      return sum;
    }
  ));
};
