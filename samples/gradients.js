const util = require('../util');

module.exports = (src) => util.create(src.width() - 1, src.height() - 1)
  .then((dest) => util.byPixel(dest,
    (i, j) => util.color.gray(Math.round(Math.sqrt(
      Math.pow(src.getPixel(i + 1, j).r - src.getPixel(i, j).r, 2) +
      Math.pow(src.getPixel(i, j + 1).r - src.getPixel(i, j).r, 2)
    )))
  ));
