class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.pScore = 0
    }

    create() {
        // up arrow
        this.cursors = this.input.keyboard.createCursorKeys()

        // bgm
        this.bgmusic = this.sound.add('bgmusic', { volume: 0.2, loop: true })
        this.bgmusic.play()
        
        // background
        this.add.image(0, 0, 'background').setOrigin(0, 0)
        this.sun = this.add.tileSprite(0, 0, 1600, 450, 'sun').setOrigin(0)

        this.ground = this.add.tileSprite(0, this.game.config.height - 64, this.game.config.width, 64, 'tilesprite').setOrigin(0)
        this.physics.add.existing(this.ground, true)
        this.ground.body.immovable = true
        this.ground.body.allowGravity = false

        // player
        this.player = this.physics.add.sprite(this.game.config.width / 4, this.game.config.height - 120, 'sprite')
        this.player.setGravityY(600)

        this.player.play('run')
        this.physics.add.collider(this.player, this.ground)

        this.jumps = 0
        this.jumpMax = 2

        // motor
        this.motorSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(3000, 5500),
            callback: this.spawnMotor,
            callbackScope: this,
            loop: true
        })

        // score
        this.score = 0
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '28px',
            fill: '#FFF'
        })

        

        // debugger
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        this.ground.tilePositionX += 4
        this.sun.tilePositionX += 0.25

        if (this.cursors.up.isDown && this.jumps < this.jumpMax && !this.isJumping) {
            this.player.setVelocityY(-450)
            this.isJumping = true
            this.sound.play('jump')
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

        if (this.time.now > this.pScore) {
            this.score ++
            this.scoreText.setText('Score: ' + this.score)
            this.pScore = this.time.now + 750
        }
    }

    spawnMotor() {
        let motor = new Motor(this, this.game.config.width + 64, this.game.config.height - 100, 'motor')
        this.physics.add.collider(motor, this.ground)
        motor.body.setVelocityX(-300)
        this.physics.add.collider(this.player, motor, () => {
            this.bgmusic.stop()
            this.scene.start('gameOverScene')
        }, null, this)
    }
}
