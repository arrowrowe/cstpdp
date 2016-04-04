const util = require('../util');

const average = (color) => util.color.gray(Math.round((color.r + color.g + color.b) / 3));

util.read('input/children.png')
  .then((image) =>
    util.write('output/grayscale.png', util.byPixel(image,
      (i, j) => average(image.getPixel(i, j))
    ))
  )
  .then(() => console.log('Completed'))
  .catch(console.error.bind(console));
