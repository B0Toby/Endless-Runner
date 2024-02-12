class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        this.load.path = './assets/'

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })

        this.load.image('background', 'img/background.png')
        
        this.load.spritesheet('player', 'img/player.png', {
            frameWidth: 48,
            frameHeight: 48
        })
        
        this.load.image('tilesprite', 'img/tilesprite.png')

        this.load.on('fileprogress', (file, value) => {
            loadingBar.fillRect(0, this.cameras.main.height / 2, this.cameras.main.width * value, 5)
        })

        this.load.on('complete', () => {
            this.scene.start('menuScene')
        })
    }
}