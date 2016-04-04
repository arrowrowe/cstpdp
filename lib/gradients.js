const util = require('../util');

module.exports = (src) => util.image.create(src.width() - 2, src.height() - 2)
  .then((dest) => util.image.byPixel(dest,
    (i, j) => util.color.gray(Math.round(Math.sqrt(
      Math.pow((src.getPixel(i + 2, j + 1).r - src.getPixel(i, j + 1).r) / 2, 2) +
      Math.pow((src.getPixel(i + 1, j + 2).r - src.getPixel(i + 1, j).r) / 2, 2)
    )))
  ));
