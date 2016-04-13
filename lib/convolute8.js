'use strict';

const util = require('../util');

const directions = require('./directions');
const convoluteWithDirection = require('./convolute-with-direction');

module.exports = (matrix) => directions.map(convoluteWithDirection(matrix));
