const util = require('../util');

const images = Object.create(null);

util.read('output/grayscale.png')
  .then((src) => {
    images.src = src;
    return util.create(src.width() - 1, src.height() - 1);
  })
  .then((dest) =>
    util.write('output/gradients.png', util.byPixel(dest,
      (i, j) => util.color.gray(Math.round(Math.sqrt(
        Math.pow(images.src.getPixel(i + 1, j).r - images.src.getPixel(i, j).r, 2) +
        Math.pow(images.src.getPixel(i, j + 1).r - images.src.getPixel(i, j).r, 2)
      )))
    ))
  )
  .then(() => console.log('Completed'))
  .catch(console.error.bind(console));
