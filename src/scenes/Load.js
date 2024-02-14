class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        // audio
        this.load.audio('bgmusic', './audio/bgmusic.wav')
        this.load.audio('jump', './audio/jump.wav')
        this.load.audio('gg', './audio/gg.wav')
        this.load.audio('select', './audio/select.wav')
        this.load.audio('pickup', './audio/pickup.wav')
        this.load.audio('replay', './audio/replay.wav')
        this.load.audio('explosion', './audio/explosion.wav')

        // img
        this.load.image('tilesprite', 'img/tilesprite.png')
        this.load.image('background', 'img/background.png')
        this.load.image('bubble', 'img/bubble.png')
        this.load.image('bubble2', 'img/bubble2.png')
        this.load.image('motor', 'img/motor.png')
        this.load.image('platform', 'img/platform.png')
        this.load.image('cloud', 'img/cloud.png')
        this.load.image('sun', 'img/sun.png')

        this.load.atlas('sprite', 'img/sprite.png', 'img/sprite.json')

        // loadingBar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xFFFFFF
            }
        })
        
        this.load.on('fileprogress', (file, value) => {
            loadingBar.fillRect(0, this.cameras.main.height / 2, this.cameras.main.width * value, 5)
        })

        this.load.on('complete', () => {
            this.scene.start('menuScene')
        })
    }

    create() {
        this.anims.create({ 
            key: 'run', 
            frames: this.anims.generateFrameNames('sprite', {
                prefix:"sprite",
                start:1, 
                end:3
                }), 
            repeat: -1 
        })
    }
}
