'use strict';

const Promise = global.Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');

const lwip = require('lwip');

const mkdirs = Promise.promisify(fs.mkdirs);

const util = module.exports = {
  log: require('log4js').getLogger(require('./package').name),
  file: {
    read: Promise.promisify(lwip.open),
    write: (file, batch) => mkdirs(path.dirname(file)).then(
      () => new Promise(
        (resolve, reject) => batch.writeFile(file, (err) => err ? reject(err) : resolve())
      )
    ),
    process: (src, dest, fn) => util.file.read(src)
      .tap(() => util.log.trace('   Loaded: [%s]', src))
      .then(fn)
      .tap(() => util.log.trace('Processed: [%s]', src))
      .then(
        (stuff) => stuff instanceof Array ?
          Promise.all(stuff.map(
            (one, imageIndex) => Promise.resolve(one).then(
              (image) => util.file.write(dest[imageIndex] || dest(imageIndex), image)
            )
          )) :
          util.file.write(dest, stuff)
      )
      .then(() => util.log.trace('Completed: [%s] -> [%s]', src, dest))
      .catch(util.log.trace.bind(util.log)),
  },
  color: {
    gray: (g) => [g, g, g],
  },
  image: {
    create: Promise.promisify(lwip.create),
    createWith: (width, height, fn) => util.image.create(width, height)
      .then((image) => util.image.byPixel(image, fn)),
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
    resize: (image, ratio) => new Promise((resolve, reject) => image.resize(image.width() * ratio, image.height() * ratio, (err, image) => err ? reject(err) : resolve(image))),
  },
  matrix: {
    width: (matrix) => matrix.length,
    height: (matrix) => matrix[0] ? matrix[0].length : 0,
    createWith: (width, height, fn) => {
      const matrix = new Array(width);
      util.matrix.forEach(
        width, height,
        (i, j) => matrix[i][j] = fn(i, j),
        (i) => matrix[i] = new Array(height)
      );
      return matrix;
    },
    forEachIn: (matrix, fn, fnCol) => util.matrix.forEach(
      util.matrix.width(matrix), util.matrix.height(matrix),
      fn, fnCol
    ),
    forEach: (width, height, fn, fnCol) => {
      for (let i = 0; i < width; i++) {
        fnCol && fnCol(i);
        for (let j = 0; j < height; j++) {
          fn(i, j);
        }
      }
    },
  },
}
