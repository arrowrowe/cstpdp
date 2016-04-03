const util = require('../util');

util.read('input/tower.png')
  .then((image) =>
    util.write(
      'output/tower-rotated.png',
      image.batch()
        .rotate(45, 'white')
    )
  )
  .then(() => console.log('Completed'))
  .catch(console.error.bind(console));
