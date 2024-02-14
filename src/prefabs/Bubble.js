class Bubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bubble')
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setVelocityX(-200)
        this.body.setAllowGravity(false)
    }

    update() {
        if (this.x < -this.width) {
            this.destroy()
        }
    }

    collect(player) {
        player.hasBubble = true
        this.destroy()
    }
}