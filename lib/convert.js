const util = require('../util');

module.exports = {
  grayToMatrix: (image) => util.matrix.createWith(image.width(), image.height(), (i, j) => image.getPixel(i, j).r),
  matrixToGray: (matrix) => util.image.createWith(
    util.matrix.width(matrix), util.matrix.height(matrix),
    (i, j) => util.color.gray(Math.round(Math.min(Math.max(0, matrix[i][j]), 255)))
  )
};
