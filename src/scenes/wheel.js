import Phaser from "phaser";

export class Wheel extends Phaser.Scene {
  constructor() {
    super("Wheel");
    this.students = [
      "Brandon",
      "Greg",
      "Kristea",
      "Laurhens",
      "Malcolm",
      "Orangel",
      "Tara",
      "Steve"
    ];
    this.colors = [
      "0x336b87",
      "0x009132",
      "0x68829e",
      "0xaebd38",
      "0x0d26aa",
      "0xff0000",
      "0xb247ff",
      "0xff3d3d"
    ];

    this.rotationTime = 4000;
    this.wheelRadius = 250;
    this.canSpin = true;
    this.graphics;
    this.sliceDegrees;
    this.selectedStudent;

    this.spinWheel = () => {
      if (this.canSpin) {
        this.selectedStudent.setText("");

        let rounds = Phaser.Math.Between(2, 8);

        // then will rotate by a random number from 0 to 360 degrees. This is the actual spin
        let degrees = Phaser.Math.Between(0, 360);
        degrees =
          degrees % this.sliceDegrees
            ? degrees
            : degrees + this.sliceDegrees / 4;

        // before the wheel ends spinning, we already know the prize according to "degrees" rotation and the number of slices
        let index =
          this.students.length -
          1 -
          Math.floor(degrees / (360 / this.students.length));

        let student = this.students[index];
        let color = this.colors[index];
        // now the wheel cannot spin because it's already spinning
        this.canSpin = false;

        // animation tweeen for the spin: duration 3s, will rotate by (360 * rounds + degrees) degrees
        // the quadratic easing will simulate friction
        this.tweens.add({
          // adding the wheel to tween targets
          targets: [this.wheel],

          // angle destination
          angle: 360 * rounds + degrees,

          // tween duration
          duration: this.rotationTime,

          // tween easing
          ease: "Cubic.easeOut",

          // callback scope
          callbackScope: this,

          // function to be executed once the tween has been completed
          onComplete: function(tween) {
            // displaying prize text
            this.selectedStudent.setColor(`#${color.slice(2)}`);
            this.selectedStudent.setText(student);

            this.canSpin = true;
          }
        });
      }
    };
  }

  preload() {}
  create() {
    this.graphics = this.make.graphics({ x: 0, y: 0, add: false });
    this.sliceDegrees = 360 / this.students.length;
    for (let i = 0; i < this.students.length; i++) {
      // setting graphics fill style
      this.graphics.fillStyle(this.colors[i], 1);

      // drawing the slice
      this.graphics.slice(
        this.wheelRadius,
        this.wheelRadius,
        this.wheelRadius,
        Phaser.Math.DegToRad(270 + i * this.sliceDegrees),
        Phaser.Math.DegToRad(270 + (i + 1) * this.sliceDegrees),
        false
      );

      // filling the slice
      this.graphics.fillPath();
    }

    // generate a texture called "wheel" from graphics data
    this.graphics.generateTexture(
      "wheel",
      this.wheelRadius * 2,
      this.wheelRadius * 2
    );

    // creating a sprite with wheel image as if it was a preloaded image
    this.wheel = this.add.sprite(300, 300, "wheel");

    // adding the pin in the middle of the canvas
    //this.pin = this.add.sprite(game.config.width / 2, game.config.height / 2, "pin");

    // adding the text field
    this.selectedStudent = this.add.text(300, 580, "Spin the wheel", {
      font: "bold 32px Arial",
      align: "center",
      color: "white"
    });

    // center the text
    this.selectedStudent.setOrigin(0.5);

    // waiting for your input, then calling "spinWheel" function
    this.input.on("pointerdown", this.spinWheel, this);
  }
}
