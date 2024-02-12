class Motor extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }

    update() {
        if (this.x < -this.width) {
            this.destroy()
        }
    }
}
