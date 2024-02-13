class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0)

        this.add.text(20, 20, "Press UP Arrow to Start and Jump", {
            font: "25px Arial",
            fill: "white"
        })

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.cursors.up.isDown) {
            this.sound.play('select')
            this.scene.start('playScene')
        }
    }
}
