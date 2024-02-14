class Bubble2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bubble2')
        scene.add.existing(this)
    }

    updatePosition(x, y) {
        this.setPosition(x, y)
    }
}
