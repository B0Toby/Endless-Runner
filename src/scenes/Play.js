class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
        this.pScore = 0
        this.speedMultiplier = 1
    }

    create() {
        // add cam
        this.cameras.main.setBounds(0, 0, this.game.config.width, this.game.config.height)
        
        // game speed
        this.speedLevels = []
        for (let i = 100; i <= 100000; i += 100) {
            this.speedLevels.push(i)
        }

        // up arrow
        this.cursors = this.input.keyboard.createCursorKeys()

        // bgm
        this.bgmusic = this.sound.add('bgmusic', { volume: 0.2, loop: true })
        this.bgmusic.play()

        // background
        this.add.image(0, 0, 'background').setOrigin(0, 0)
        this.cloud = this.add.tileSprite(0, 0, 1600, 450, 'cloud').setOrigin(0)
        this.sun = this.add.tileSprite(0, 0, 1600, 450, 'sun').setOrigin(0)

        this.cloud.setDepth(1)
        this.sun.setDepth(0)

        this.ground = this.add.tileSprite(0, this.game.config.height - 64, this.game.config.width, 64, 'tilesprite').setOrigin(0)
        this.physics.add.existing(this.ground, true)
        this.ground.body.immovable = true
        this.ground.body.allowGravity = false

        // player
        this.player = this.physics.add.sprite(this.game.config.width / 4, this.game.config.height - 120, 'sprite')
        this.player.setGravityY(600)
        this.player.hasBubble = false

        this.player.play('run')
        this.physics.add.collider(this.player, this.ground)

        this.jumps = 0
        this.jumpMax = 2

        // motor
        this.motorSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(3000, 5500),
            callback: () => {
                let motor = new Motor(this, this.game.config.width, this.game.config.height - 96, 'motor')
                this.physics.add.collider(motor, this.ground)
                this.physics.add.collider(this.player, motor, this.checkMotorCollision, null, this)
            },
            callbackScope: this,
            loop: true
        })

        // bubble
        this.bubbleSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(5000, 15000),
            callback: () => {
                let bubble = new Bubble(this, this.game.config.width, this.game.config.height - 86, 'bubble')
                this.physics.add.overlap(this.player, bubble, this.checkBubbleCollision, null, this)
            },
            callbackScope: this,
            loop: true
        })

        // platform
        this.platformSpawnTimer = this.time.addEvent({
            delay: Phaser.Math.Between(6000, 10000),
            callback: () => {
                let platform = new Platform(this, this.game.config.width, this.game.config.height - Phaser.Math.Between(140, 220), 'platform')
                this.physics.add.collider(platform, this.ground)
                this.physics.add.collider(this.player, platform, this.checkPlatformCollision, null, this)
            },
            callbackScope: this,
            loop: true
        })

        // score
        this.score = 0
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '28px',
            fill: '#FFF'
        })

        // camera shake
        this.cameraIntensity = 0.0001

        // debugger
        // this.input.keyboard.on('keydown-D', function() {
        //     this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        //     this.physics.world.debugGraphic.clear()
        // }, this)
    }

    update() {
        // game speed
        for (let i = 0; i < this.speedLevels.length; i++) {
            if (this.score >= this.speedLevels[i]) {
                this.speedMultiplier = 1 + (i + 1) * 0.1
            }
        }

        this.ground.tilePositionX += 4 * this.speedMultiplier
        this.cloud.tilePositionX += 0.5 * this.speedMultiplier
        this.sun.tilePositionX += 0.25 * this.speedMultiplier

        this.motorSpawnTimer.delay = Phaser.Math.Between(3000, 5500) / this.speedMultiplier
        this.bubbleSpawnTimer.delay = Phaser.Math.Between(5000, 15000) / this.speedMultiplier
        this.platformSpawnTimer.delay = Phaser.Math.Between(6000, 10000) / this.speedMultiplier

        // camera shake
        this.cameraIntensity += 0.000001
        this.cameras.main.shake(100, this.cameraIntensity)
    
        // jump
        if (this.cursors.up.isDown && this.jumps < this.jumpMax && !this.isJumping) {
            this.player.setVelocityY(-450)
            this.isJumping = true
            this.sound.play('jump')
            this.player.setTexture('sprite', 'sprite3')
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

        if (this.time.now > this.pScore) {
            this.score++
            this.scoreText.setText('Score: ' + this.score)
            this.pScore = this.time.now + 150
        }

        if (this.bubble2 && this.player.hasBubble) {
            this.bubble2.updatePosition(this.player.x, this.player.y - this.player.height / 5)
        }
    }

    checkMotorCollision(player, motor) {
        if (player.hasBubble) {
            this.sound.play('explosion')
            motor.destroy()
            this.score += 40
            this.scoreText.setText('Score: ' + this.score)
            player.hasBubble = false
            if (this.bubble2) {
                this.bubble2.destroy()
                this.bubble2 = null
            }
            player.body.velocity.x = 0
        } else {
            this.sound.play('gg')
            this.bgmusic.stop()
            this.scene.start('gameOverScene')
        }
    }

    checkPlatformCollision(player, platform) {
        if (player.body.touching.down && platform.body.touching.up) {
            this.sound.play('jump')
            platform.destroy()
            player.setVelocityY(-450)
            this.score += 20
            this.scoreText.setText('Score: ' + this.score)
        } else if (player.hasBubble) {
            this.sound.play('explosion')
            platform.destroy()
            player.hasBubble = false
            if (this.bubble2) {
                this.bubble2.destroy()
                this.bubble2 = null
            }
            this.score += 40
            this.scoreText.setText('Score: ' + this.score)
            player.setVelocityX(0)
        } else {
            this.sound.play('gg')
            this.bgmusic.stop()
            this.scene.start('gameOverScene')
        }
    }

    checkBubbleCollision(player, bubble) {
        this.sound.play('pickup')
        player.hasBubble = true
        if (!this.bubble2) {
            this.bubble2 = new Bubble2(this, player.x, player.y - player.height / 2)
            this.add.existing(this.bubble2)
        }
        bubble.destroy()
    }
}
