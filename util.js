'use strict';

const Promise = global.Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');

const lwip = require('lwip');

const mkdirs = Promise.promisify(fs.mkdirs);

const util = module.exports = {
  file: {
    read: Promise.promisify(lwip.open),
    write: (file, batch) => mkdirs(path.dirname(file)).then(
      () => new Promise(
        (resolve, reject) => batch.writeFile(file, (err) => err ? reject(err) : resolve())
      )
    ),
    process: (src, dest, fn) => util.file.read(src)
    .then(fn)
    .then((batch) => util.file.write(dest, batch))
    .then(() => console.log('Completed'))
    .catch(console.error.bind(console)),
  },
  color: {
    gray: (g) => [g, g, g],
  },
  image: {
    create: Promise.promisify(lwip.create),
    byPixel: (image, fn) => {
      const width = image.width();
      const height = image.height();
      const batch = image.batch();
      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          batch.setPixel(i, j, fn(i, j));
        }
      }
      return batch;
    },
  },
}
