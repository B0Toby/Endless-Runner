class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0)

        this.add.text(this.game.config.width / 2, this.game.config.height / 3, "Press UP Arrow to Start and Jump.\n\nYou can jump on the platform to destroy it~\n\nUse bubble as a shield to destroy the enemy!", {
            fontSize: "20px",
            fill: "#FFFFFF",
            align: "center"
        }).setOrigin(0.5)

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        if (this.cursors.up.isDown) {
            this.sound.play('select')
            this.scene.start('playScene')
        }
    }
}
