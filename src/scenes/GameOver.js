class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene')
    }

    create() {
        this.add.rectangle(0, 0, this.game.config.width, this.game.config.height, 0x000000, 0.5).setOrigin(0)

        this.add.text(this.game.config.width / 2, this.game.config.height / 2, 'GAME OVER\nPress R to Replay', {
            fontSize: '32px',
            fill: '#FFFFFF'
        }).setOrigin(0.5)

        this.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update() {
        if (this.restartKey.isDown) {
            this.sound.play('replay')
            this.scene.start('playScene')
        }
    }
}
