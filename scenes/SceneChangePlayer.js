class SceneChangePlayer extends Phaser.Scene{
    constructor(){
        super({key: "SceneChangePlayer"}, 'Main');
    };

    typewriteText(text){
	    const length = text.length
	    let i = 0
	    this.time.addEvent({
		callback: () => {
			this.label.text += text[i]
			++i
		},
		repeat: length - 1,
		delay: 65
    	})
    }

    
    create(){
        this.add.image(0,0,'bgChangePlayer').setOrigin(0,0)
        this.label = this.add.text(450, 120, '', {font: "55px", fill: "#000000"}).setOrigin(0.5);
	    this.typewriteText('Escolha seu personagem!')

        this.escolhaDoPlayer();
    }

    escolhaDoPlayer(){
        let azul = this.add.sprite(180,350,'urso_default_azul').setScale(1.3).setOrigin(0.5);
        let amarelo = this.add.sprite(360,350,'urso_default_amarelo').setScale(0.4).setOrigin(0.5);
        let rosa = this.add.sprite(540,350,'urso_default_rosa').setScale(0.4).setOrigin(0.5);
        let laranja = this.add.sprite(720,350,'urso_default_laranja').setScale(0.4).setOrigin(0.5);

        azul.setInteractive();
        azul.on('pointerover', () => {
            azul.setScale(1.5)
        });
        azul.on('pointerout', () => {
            azul.setScale(1.25)
        });
        azul.on('pointerdown', () => {
            this.anims.create({
                key: 'andar',
                frames: this.anims.generateFrameNumbers('urso_azul', { start: 0, end: 7 }),
                frameRate: 12,
                repeat: -1
            }),
            this.scene.stop('SceneChangePlayer'),
            this.scene.start('Scene01')

        });

        amarelo.setInteractive();
        amarelo.on('pointerover', () => {
            amarelo.setScale(0.5);
        })
        amarelo.on('pointerout', () => {
            amarelo.setScale(0.4);
        })
        amarelo.on('pointerdown', () => {
            this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('urso_amarelo', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        }),
            this.scene.stop('SceneChangePlayer'),
            this.scene.start('Scene01')
        })

        rosa.setInteractive();
        rosa.on('pointerover', () => {
            rosa.setScale(0.5)
        });
        rosa.on('pointerout', () => {
            rosa.setScale(0.4)
        });
        rosa.on('pointerdown', () => {
            this.anims.create({
                key: 'andar',
                frames: this.anims.generateFrameNumbers('urso_rosa', { start: 0, end: 7 }),
                frameRate: 12,
                repeat: -1
            }),
            this.scene.stop('SceneChangePlayer'),
            this.scene.start('Scene01')
        });

        laranja.setInteractive();
        laranja.on('pointerover', () => {
            laranja.setScale(0.5)
        });
        laranja.on('pointerout', () => {
            laranja.setScale(0.4)
        });
        laranja.on('pointerdown', () => {
            this.anims.create({
                key: 'andar',
                frames: this.anims.generateFrameNumbers('urso_laranja', { start: 0, end: 7 }),
                frameRate: 12,
                repeat: -1
            }),
            this.scene.stop('SceneChangePlayer'),
            this.scene.start('Scene01')
        });
    }

}
