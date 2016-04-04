require('../util').file.process(
  'input/tower.png',
  'output/tower/rotate.png',
  (image) => image.batch().rotate(45, 'white')
);
