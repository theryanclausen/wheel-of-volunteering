import 'phaser';

import { Wheel } from './scenes/wheel';

const gameConfig = {
  width: 680,
  height: 400,
  scene: SimpleScene
};

new Phaser.Game(gameConfig);