//FASE MÃE TERRA
var player;
var checkar2 = [200,500];
var jacaré
var grades
var vida = 3;
var tronco1, tronco2,tronco3, tronco4, tronco5, tronco6, tronco7, tronco8, tronco9, tronco10;
var besouro1, besouro2, besouro3, besouro4, besouro5, besouro6, besouro7, besouro8, besouro9, besouro10, besouro11, besouro12, besouro13, besouro14, besouro15;
var besouro1, besouro2, besouro3, besouro4, besouro5, besouro6, besouro7, besouro8, besouro9, besouro10, besouro11, besouro12, besouro13, besouro14, besouro15;
var cipo;
var playernoChao;
var moeda1, moeda2, moeda3, moeda4, moeda5, moeda6, moeda7, moeda8, moeda9, moeda10;
var platAuxScene, platAux, platAux2, platAux3;
var bolacha1, bolacha2, bolacha3, bolacha4, bolacha5;
var chaoA, chaoB, chaoC, chaoD, chaoE, chaoF;
var morte

class Scene03 extends Phaser.Scene {

    constructor(){ 
        super({key: "Scene03"}, 'Main');
        this.textoHacker = null;
        this.balaoDeFala = null;
    }

    //criação da parallax de fundo
    createParallax(count, bg , scrollFactor) {
        let x = 0;
        for (let i =0; i < count; ++i) {
            const scene = this.add.image(x, 600, bg).setOrigin(0,1).setScrollFactor(scrollFactor)
            x += 900
        }
    }

    morreu(){
        vida -= 1;
        window.sharedData.life -= 1;
        const som = this.sound.add('dano');
        som.play();

        if(vida == 0){
            window.sharedData.life = 3;
            vida = 3;
            checkar2 = [200,500];
            this.scene.start('SceneGameOver');
        };
        this.scene.restart('Scene03');
    };

    // Adição dos recursos na tela do game
    create() { 
        //transicao com fade in
        this.cameras.main.fadeIn(200, 0, 0, 0)
        this.scene.setVisible(true, 'SceneHUD');

        this.cenaAtual = 'Scene03';
        console.log('cena atual: '+ this.cenaAtual)

        const width = this.scale.width;
        const height = this.scale.height;

        this.teclado = this.input.keyboard.createCursorKeys();
        // Criação de teclas personalizadas para movimentação com WASD
        this.WASD = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //plataforma auxiliar que faz a transição das cenas
        platAux = this.physics.add.staticImage(12500,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        morte = this.physics.add.staticImage(0,1000,'').setSize(7000,1)
        this.physics.add.collider(player,morte, () =>{
            this.morreu()
        })

        //Adicionando background
        this.cameras.main.setBackgroundColor("#ffec9a");
        this.createParallax(6.8, 'montanhas', 0.2); 
        this.createParallax(6.8, 'colinas', 0.4);
        this.createParallax(6.8, 'arvore', 0.6);

        teclado = this.input.keyboard.createCursorKeys(); // carregando entrada de informações vindas to teclado

        //fazer camera seguir player
        this.cameras.main.setBounds(0, 0, width*6.8, 600);
        this.physics.world.setBounds(0, 0, width*6.8, 600);
 
        //criacao do player
        player = this.physics.add.sprite(checkar2[0],checkar2[1],'player').setSize(100,150).setScale(0.8);
        
        //player = this.physics.add.sprite(5900,500,'player').setSize(100,150).setScale(0.8);
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('player', { start:0, end:7 }),
            frameRate: 12,
            repeat: -1
        });

        //configurando a câmera
        this.cameras.main.startFollow(player);
        player.setDragY(0.6);

        //adiciona chao
        chaoA = this.physics.add.staticImage(460,600,'chaomt').setSize(980, 60).setScale(1.1,1);
        chaoA = this.physics.add.staticImage(460,600,'chaomt').setSize(980, 60).setScale(1.1,1);
        this.physics.add.collider(player,chaoA, () =>{
            playernoChao = true;
            this.physics.add.collider(besouro1,chaoA);
        });

        chaoB = this.physics.add.staticImage(2800,600,'chaomt').setSize(980, 60).setScale(1.1,1);
        this.physics.add.collider(player,chaoB, () =>{
            playernoChao = true;
            this.physics.add.collider(besouro2,chaoB);
        })

        chaoC = this.physics.add.staticImage(4250,600,'chaomt').setSize(980, 60).setScale(1.1,1);
        this.physics.add.collider(player,chaoC, () =>{
            playernoChao = true;
            this.physics.add.collider(besouro4,chaoC);
        });

        chaoD = this.physics.add.staticImage(5630,600,'chaomt').setSize(980, 60).setScale(1.1,1);
        this.physics.add.collider(player,chaoD, () =>{
            playernoChao = true;
            this.physics.add.collider(besouro4,chaoD);
        })

        

        //adiciona tronco
        tronco1 = this.physics.add.staticImage(400,500,'tronco').setSize(200,40).setScale(0.3);
        this.physics.add.collider(player, tronco1, () => {
            playernoChao = true;
        });

        tronco2 = this.physics.add.staticImage(770, 420,'tronco').setSize(200,40).setScale(0.3);
        this.physics.add.collider(player, tronco2, () => {
            playernoChao = true;
        });

        tronco3 = this.physics.add.staticImage(1140, 490,'tronco').setSize(200,40).setScale(0.3);
        this.physics.add.collider(player, tronco3, () => {
            playernoChao = true;
        });

        tronco4 = this.physics.add.staticImage(1510, 460,'tronco').setSize(200,40).setScale(0.3);
        this.physics.add.collider(player, tronco4, () => {
            playernoChao = true;
        });

        //adiciona bolacha
        bolacha1 = this.physics.add.staticImage(1720, 376,'bolacha').setSize(200,52).setScale(1);
        this.physics.add.collider(player, bolacha1, () => {
            playernoChao = true;
        });

        bolacha2 = this.physics.add.staticImage(1780, 200,'bolacha').setSize(200,52).setScale(1);
        this.physics.add.collider(player, bolacha2, () => {
            playernoChao = true;
        });
        cipo = this.physics.add.staticImage(1290, 280,'cipo').setSize(0,0).setScale(1);

        bolacha3 = this.physics.add.staticImage(2100, 300,'bolacha').setSize(200,52).setScale(1);
        this.physics.add.collider(player, bolacha3, () => {
            playernoChao = true;
        });

        bolacha4 = this.physics.add.staticImage(3500, 450,'bolacha').setSize(200,52).setScale(1);
        this.physics.add.collider(player, bolacha4, () => {
            playernoChao = true;
        });

        bolacha5 = this.physics.add.staticImage(4950, 450,'bolacha').setSize(200,52).setScale(1);
        this.physics.add.collider(player, bolacha5, () => {
            playernoChao = true;
        });

        //adiciona besouro
        besouro1 = this.physics.add.sprite(600, 20, 'besouro').setBounce(1).setScale(0.3).setSize(180, 250);
        besouro1.setVelocityY(10);
        besouro1.setPushable(false);
        besouro1.setMaxVelocity(700)
        this.physics.add.collider(player,besouro1, () => {
            this.morreu()
        }); 
        this.physics.add.collider(besouro1,chaoA)
        
        besouro2 = this.physics.add.sprite(2600, 40, 'besouro').setBounce(1).setScale(0.3).setSize(180, 250);
        besouro2.setVelocityY(10);
        besouro2.setVisible (true);
        besouro2.setPushable(false);
        besouro2.setMaxVelocity(700)
        this.physics.add.collider(player,besouro2, () => {
            this.morreu()
        });

        besouro3 = this.physics.add.sprite(3000, 40, 'besouro').setBounce(1).setScale(0.3).setSize(180, 250);
        besouro3.setVelocityY(10);
        besouro3.setVisible (true);
        besouro3.setPushable(false);
        besouro3.setMaxVelocity(700)
        this.physics.add.collider(besouro3,chaoB);
        this.physics.add.collider(player,besouro3, () => {
            this.morreu()
        });

        besouro4 = this.physics.add.sprite(4000, 40, 'besouro').setBounce(1).setScale(0.3).setSize(180, 250);
        besouro4.setVelocityY(10);
        besouro4.setVisible (true);
        besouro4.setPushable(false);
        besouro4.setMaxVelocity(700)
        this.physics.add.collider(besouro4,chaoC);
        this.physics.add.collider(player,besouro4, () => {
            this.morreu()
        });

        besouro5 = this.physics.add.sprite(4500, 40, 'besouro').setBounce(1).setScale(0.3).setSize(180, 250);
        besouro5.setVelocityY(10);
        besouro5.setVisible (true);
        besouro5.setPushable(false);
        besouro5.setMaxVelocity(700)
        this.physics.add.collider(besouro5,chaoC);
        this.physics.add.collider(player,besouro5, () => {
            this.morreu()
        });

        //adiciona moeda
        moeda1 = this.physics.add.staticImage(1300, 190,'moeda').setSize(200,40).setScale(0.2);
        this.physics.add.overlap(player, moeda1, () => {
            moeda1.destroy();
        });

        moeda2 = this.physics.add.staticImage(1780, 110,'moeda').setSize(200,40).setScale(0.2);
        this.physics.add.overlap(player, moeda2, () => {
            moeda2.destroy();
        });

        //adiciona plataformas auxiliares/invisíveis
        platAux = this.physics.add.staticImage(1275,230,'').setSize(122,10).setScale(0.3).setVisible(false);
        this.physics.add.collider(player, platAux, () =>{
            playernoChao = true;
        }); //plataforma do cipo

        platAux = this.physics.add.staticImage(1380,240,'').setSize(70,10).setScale(0.3).setVisible(false);
        this.physics.add.collider(player, platAux, () =>{
            playernoChao = true;
        }); //plataforma do cipo

        platAux = this.physics.add.staticImage(2600,599,'').setSize(10,10).setScale(0.3).setVisible(false);
        this.physics.add.collider(besouro2, platAux, () =>{
            playernoChao = true;
        });

        platAux = this.physics.add.staticImage(3000,599,'').setSize(10,10).setScale(0.3).setVisible(false);
        this.physics.add.collider(besouro3, platAux, () =>{
            playernoChao = true;
        });

        platAux = this.physics.add.staticImage(4000,599,'').setSize(10,10).setScale(0.3).setVisible(false);
        this.physics.add.collider(besouro4, platAux, () =>{
            playernoChao = true;
        });
        
        platAux = this.physics.add.staticImage(4500,599,'').setSize(10,10).setScale(0.3).setVisible(false);
        this.physics.add.collider(besouro4, platAux, () =>{
            playernoChao = true;
        });


        // adiciona o celular
        celular = this.physics.add.sprite(5350,500,'celular').setScale(0.5).setVisible(true);
        celular.body.setSize(500, 800, true)
        this.physics.add.overlap(player, celular, () => {
            this.mostrarBalaoDeFala();
            if(this.teclaE.isDown){
                checkar2 = [5350,500]
                this.scene.pause('Scene03');
                this.scene.start('SceneQuiz');  
            }
        });

        // jacaré = this.physics.add.sprite(12300,500,'omo').setScale(0.3);
        // jacaré.anims.play('pular', true);
        // jacaré.setMaxVelocity (0);
        // grades = this.physics.add.sprite(5750, 500, 'grades').setScale(1.2);
        // this.physics.add.collider(player, grades, () =>{
        //     playernoChao = true;
        // })
        // grades.setPushable(false);

        portal = this.physics.add.sprite(6000,460,'portal').setScale(0.5).setVisible(false);
        this.physics.add.overlap(player,portal, () =>{
            this.scene.stop('Scene03');
            this.scene.stop('SceneHUD');
        })
        this.anims.create({
            key: 'mexer',
            frames: this.anims.generateFrameNumbers('portal', { start:0, end:2 }),
            frameRate: 5,
            repeat: -1
        });
        // adiciona o affordance da letra E
        botaoE = this.physics.add.sprite(5350, 400, 'botaoE').setScale(0.15);

        // adiciona plataforma auxiliar que torna o portal visivel 
        platAux2 = this.physics.add.staticImage(5750,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        this.physics.add.overlap(player, platAux2, () =>{
            portal.setVisible (true);
        });

        // Adiciona o balão de falas do hacker
        this.balaoDeFala = this.add.image(5750, 40, 'balaoDeFala').setOrigin(1, 0).setScale(0.3).setVisible(false);

        // Adiciona o texto dentro do balão de falas
        this.textoHacker = this.add.text(5500, 90, "Não esperava que você chegasse tão longe! Deve ter sido sorte de principiante, então tente responder essa pergunta", {
            fontSize: '16px',
            fill: '#fff',
            wordWrap: { width: 300 },
            align: 'center'
        }).setVisible(false);
        this.textoHacker.setOrigin(0.5, 0);
    };

    mostrarBalaoDeFala(){
        this.balaoDeFala.setVisible(true);
        this.textoHacker.setVisible(true);
    }

    update() {
        console.log(checkar2[0],checkar2[1])
        // impede que as sprites sofram com a velocidade da gravidade e caiam
        celular.setMaxVelocity (0);
        botaoE.setMaxVelocity (0);
        //texto1.setMaxVelocity (0);

        // adiciona a animação da sprite sheet do portal
        portal.anims.play('mexer', true);
        portal.setMaxVelocity (0);

        //quando as duas teclas são pressionada, o player para
        if(teclado.left.isDown && teclado.right.isDown){
        
            player.setVelocityX(0);
        }
        // Lógica para movimentação com as teclas WASD ou setas
        const isMovingLeft = teclado.left.isDown || this.WASD.left.isDown;
        const isMovingRight = teclado.right.isDown || this.WASD.right.isDown;
        const isJumping = teclado.up.isDown || this.WASD.up.isDown|| this.spaceBar.isDown;

        if (isMovingLeft) {
            player.setFlip(true);
            player.setVelocityX(-300);
            player.anims.play('andar', true);
        } else if (isMovingRight) {
            player.setFlip(false);
            player.setVelocityX(300);
            player.anims.play('andar', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('andar', false);
        }

        if (isJumping && playernoChao && player.body.touching.down) {
            player.setVelocityY(-400);
            player.anims.play('andar', true);
            playernoChao = false;
        }

        // adiciona o botão da letra E
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.teclaQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        //depois de 2s que o "E" foi pressionado, o HUD de links aparece
        if (this.teclaQ.isDown) {
            celular.setVisible(true);
            //texto1.setVisible(true);
            this.scene.launch('SceneLink');
        };
    };
};
    
