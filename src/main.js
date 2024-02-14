// Name: Toby Pang
// Title: Neon Collapse: Velocity Edge
// Approximate time: 18 hours
/*
Creative Tilt Justification:
For the technical aspect of the game, I implemented a dynamic game speed system, 
which increases the game's speed based on the player's score. 
This not only escalates the challenge as the player progresses, 
but also adds a sense of urgency and excitement. 
The code adjusts game elements' speed and timers based on the speedMultiplier, 
which is determined by the player's current score, 
making the game faster and more challenging over time.
Look for // game speed comment part in my code.

For the visual aspect of the game, I think my graphical assets are average, 
but my audio assets are pretty fitting and the background music is dynamic and energetic. 
A unique visual feature is the camera shake effect, which intensifies the longer the player survives. 
It gives the player the feeling that the world is falling apart.
Look for // camera shake comment part in my code.
*/

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    zoom: 1,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 100 }
        }
    },
    scene: [ Load, Menu, Play, GameOver ]
}

let game = new Phaser.Game(config)
