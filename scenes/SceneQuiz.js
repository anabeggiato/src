var bntA;
var bntB;
var bntC;
var bntD;
var virus;
var pergunta = ['Quanto é 2+2?', 'Quando a Revolução francesa\nocorreu?'];
var respostas = ['A) 1 \nB) 2 \nC) 3 \nD) 4', 'A) 1500 \nB) 1789 \nC) 300 \nD) 0'];
var cenaAnterior = 0

class SceneQuiz extends Phaser.Scene {
    constructor() {
        super({key: 'SceneQuiz'})
        this.pontosTotais = 0;
        this.pontosGanhos = 8;
    }

    preload(){
        this.load.image('bgPergunta', 'assets/C_pergunta/bgPergunta.png');
        this.load.image('fundoPergunta', 'assets/C_pergunta/fundoPergunta.png');
        this.load.image('bntA', 'assets/C_pergunta/bntA.png');
        this.load.image('bntB', 'assets/C_pergunta/bntB.png');
        this.load.image('bntC', 'assets/C_pergunta/bntC.png');
        this.load.image('bntD', 'assets/C_pergunta/bntD.png');
        this.load.spritesheet('virus', 'assets/C_pergunta/virus.png', {frameWidth: 225, frameHeight: 180});
    }

    create() {
        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0);
        this.scene.setVisible(false, 'SceneHUD');

        //adiciona fundos
        this.add.image(0,0, 'bgPergunta').setOrigin(0,0);
        this.add.image(50,20, 'fundoPergunta').setOrigin(0,0);

        //animacao do virus
        this.anims.create({
            key: 'piscarVirus',
            frames: this.anims.generateFrameNumbers('virus', { start:0, end:1 }),
            frameRate: 2,
            repeat: -1
        })
        virus = this.add.sprite(200,330,'virus');
        virus.anims.play('piscarVirus');

        //adiciona botões
        bntA = this.add.image(180,520, 'bntA').setScale(1.2)
        bntB = this.add.image(360,520, 'bntB').setScale(1.2)
        bntC = this.add.image(540,520, 'bntC').setScale(1.2)
        bntD = this.add.image(720,520, 'bntD').setScale(1.2)

        //muda quiz por fase
        if (cenaAnterior == 0) {
            this.add.text(80, 70, pergunta[0], {fill: '#EB0000', fontSize: '50px'});
            this.add.text(450, 240, respostas[0], {fill: '#000000', fontSize: '40px'});
            this.responder(bntD, bntB, bntC, bntA, this.pontosGanhos, this.pontosTotais);

        } else if (cenaAnterior == 1) {
            this.add.text(80, 70, pergunta[1], {fill: '#EB0000', fontSize: '40px'});
            this.add.text(450, 240, respostas[1], {fill: '#000000', fontSize: '40px'});
            this.responder(bntB, bntD, bntC, bntA, this.pontosGanhos, this.pontosTotais);

        }  

        //lógica de pontuação:
        if (this.pontosGanhos != 8){
            //ligação entre cenas
            let sceneErro = this.scene.manager.getScene('SceneErro');
            this.pontosGanhos = sceneErro.pontosGanhos;
        }
    }


    responder(bntCerto, bntErrado1, bntErrado2, bntErrado3) {
        //affordance dos botoes
        this.bntAffordance(bntCerto);
        this.bntAffordance(bntErrado1);
        this.bntAffordance(bntErrado2);
        this.bntAffordance(bntErrado3);

        //botao certo é apertado
        bntCerto.on('pointerdown', () => {
            this.pontosTotais += this.pontosGanhos;
            this.pontosGanhos = 8
            cenaAnterior++
            this.cameras.main.fadeOut(200, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('SceneAcerto')
            })
        })

        bntErrado1.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })

        bntErrado2.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })

        bntErrado3.on('pointerdown', () => {
            this.scene.launch('SceneErro');
            this.pontosGanhos /= 2;
        })
    }
    

    bntAffordance(bnt) {
        bnt.setInteractive({ useHandCursor: true });
        bnt.on('pointerover', () => {
            bnt.setScale(1.25);
        })

        bnt.on('pointerout', () => {
            bnt.setScale(1.2);
        })
    }
}