class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0)

        this.ground = this.add.tileSprite(0, this.game.config.height - 64, this.game.config.width, 64, 'tilesprite').setOrigin(0)
        this.physics.add.existing(this.ground, true)
        this.ground.body.immovable = true
        this.ground.body.allowGravity = false

        this.player = this.physics.add.sprite(this.game.config.width / 4, this.game.config.height - 128, 'player', 0)
        this.player.setGravityY(600)

        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        })

        this.player.anims.play('run', true)
        this.physics.add.collider(this.player, this.ground)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.jumps = 0
        this.jumpMax = 2

        this.motorSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(4000, 6000),
            callback: this.spawnMotor,
            callbackScope: this,
            loop: true
        })

        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        this.ground.tilePositionX += 4

        if (this.cursors.up.isDown && this.jumps < this.jumpMax && !this.isJumping) {
            this.player.setVelocityY(-450)
            this.isJumping = true
        }

        if (this.cursors.up.isUp && this.isJumping) {
            this.jumps++
            this.isJumping = false
        }

        if (this.player.body.touching.down) {
            this.jumps = 0
            this.player.anims.play('run', true)
        } else {
            this.player.anims.stop()
        }

        if (this.player.body.touching.down) {
            this.jumps = 0
        }
    }

    spawnMotor() {
        let motor = new Motor(this, this.game.config.width + 64, this.game.config.height - 128, 'motor')
        this.physics.add.collider(motor, this.ground)
        motor.body.setVelocityX(-300)
        this.physics.add.collider(this.player, motor, () => this.scene.start('gameOverScene'), null, this)
    }
}
