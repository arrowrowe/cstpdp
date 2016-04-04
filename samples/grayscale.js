const util = require('../util');

const average = (color) => {
  const avg = Math.round((color.r + color.g + color.b) / 3);
  return [avg, avg, avg, color.a];
};

util.read('input/children.png')
  .then((image) =>
    util.write('output/grayscale.png', util.byPixel(image, average))
  )
  .then(() => console.log('Completed'))
  .catch(console.error.bind(console));
