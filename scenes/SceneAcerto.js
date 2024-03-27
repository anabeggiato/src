var senha = ['UNI', 'OPS']
var cenas = ['','Scene02','Scene03']

class SceneAcerto extends Phaser.Scene {
    constructor() {
        super({key: 'SceneAcerto'}, 'Main');
        this.counter = 0
    }

 
    create() {
        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0)

        //lógica de pontos
        let sceneQuiz = this.scene.manager.getScene('SceneQuiz');
        let pontosTotais = sceneQuiz.pontosTotais;
        console.log(pontosTotais)

        //design de fundo
        this.add.image(0,0,'bgAcerto').setOrigin(0,0);
        /*
        this.add.text(450, 250, 'Parabéns!\nVocê desbloqueou parte da chave:\n'+ senha[this.counter], {
            fontSize: '50px',
            fill: '#000000',
            wordWrap: { width: 800 },
            align: 'center'
        }).setOrigin(0.5);
        */

        this.add.text(450, 120, 'PARABÉNS', {fontSize: '80px', fill: '#000000'}).setOrigin(0.5);
        this.add.text(450, 230, 'Você desbloqueou parte da chave:', {fontSize: '40px', align: 'center', wordWrap: { width: 800 }, fill: '#000000'}).setOrigin(0.5);

        if (this.counter == 0) {
            this.add.text(450, 300, senha[this.counter], {fontSize: '60px', fill: '#000000'}).setOrigin(0.5);
            this.counter++
        } else if (this.counter == 1) {
            this.add.text(450, 300, senha[this.counter], {fontSize: '60px', fill: '#000000'}).setOrigin(0.5);
            this.counter++
        }

        this.add.text(450, 380, 'Pontuação: '+ pontosTotais, {fontSize: '30px', fill: '#000000'}).setOrigin(0.5);
        this.pressBotao('bntContinuar',cenas[this.counter]);
    }

    
    pressBotao(image,cena){
        let bnt = this.add.image(450, 480, image).setOrigin(0.5).setScale(0.8);
            bnt.setInteractive({ useHandCursor: true });

            bnt.on('pointerover', () => {
                bnt.setScale(0.85);
            })

            bnt.on('pointerout', () => {
                bnt.setScale(0.8);
            })

            bnt.on('pointerdown', () => {
                this.cameras.main.fadeOut(200, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                    this.scene.start(cena)
                })
            })
    }
}
