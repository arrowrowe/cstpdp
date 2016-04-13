'use strict';

const directions = require('./directions');
const convoluteWithDirection = require('./convolute-with-direction');

module.exports = (matrix) => directions.map(convoluteWithDirection(matrix));
