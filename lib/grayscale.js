const util = require('../util');

const average = (color) => util.color.gray(Math.round((color.r + color.g + color.b) / 3));

module.exports = (image) => util.image.byPixel(image,
  (i, j) => average(image.getPixel(i, j))
);
