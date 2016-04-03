const Promise = global.Promise = require('bluebird');
const fs = require('fs-extra');
const path = require('path');

const lwip = require('lwip');

const mkdirs = Promise.promisify(fs.mkdirs);

module.exports = {
  read: Promise.promisify(lwip.open),
  write: (file, batch) => mkdirs(path.dirname(file)).then(
    () => new Promise(
      (resolve, reject) => batch.writeFile(file, (err) => err ? reject(err) : resolve())
    )
  ),
}
