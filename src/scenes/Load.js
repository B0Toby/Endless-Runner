class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('tilesprite', 'img/tilesprite.png')
        this.load.image('background', 'img/background.png')
        this.load.image('motor', 'img/motor.png')
        this.load.image('sun', 'img/sun.png')

        this.load.atlas('sprite', 'img/sprite.png', 'img/sprite.json')

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
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
        });
    }
}
