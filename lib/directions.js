'use strict';

const directions = [
  [1, 0],
  [Math.cos(Math.PI / 8), Math.sin(Math.PI / 8)],
  [Math.SQRT1_2, Math.SQRT1_2]
];
directions.push([directions[1][1], directions[1][0]]);
for (let j = 0; j < 4; j++) {
  directions.push([-directions[j][1], directions[j][0]]);
}

module.exports = directions;
