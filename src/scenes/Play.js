class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0)

        this.ground = this.add.tileSprite(0, this.game.config.height - 64, this.game.config.width, 64, 'tilesprite').setOrigin(0)

        this.physics.add.existing(this.ground, true)

        this.player = this.physics.add.sprite(this.game.config.width / 4, this.game.config.height - 128, 'player', 0)

        this.player.setGravityY(600)

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        })

        this.player.anims.play('run', true)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.physics.add.collider(this.player, this.ground)
    }

    update() {
        this.ground.tilePositionX += 4

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-350)
        }

        if (this.player.body.touching.down) {
            this.player.anims.play('run', true)
        } else {
            this.player.anims.stop()
        }
    }
}