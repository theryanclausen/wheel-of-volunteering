import 'phaser';

import { Wheel } from './scenes/wheel';

const gameConfig = {
  width: 600,
  height: 600,
  scene: Wheel
};

new Phaser.Game(gameConfig);