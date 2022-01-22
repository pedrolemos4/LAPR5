import { Component, OnInit } from '@angular/core';
import { RedeService } from 'src/app/Services/Rede/rede.service';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import * as THREE from 'three/build/three.module.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Relacao } from 'src/app/Models/Relacao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rede',
  templateUrl: './rede.component.html',
  styleUrls: ['./rede.component.css']
})
export class RedeComponent implements OnInit {
  aux: string[] = [];
  email: string | undefined = '';
  estadoHumor: any;
  imagePreview: string | ArrayBuffer = '';
  selected: THREE.Mesh = null;
  idPerfilAtual: string | undefined = '';
  activePlayerObject!: Jogador;
  scene!: any;
  renderer!: any;
  labelRenderer!: any;
  camera!: THREE.PerspectiveCamera;
  cameraAux!: THREE.PerspectiveCamera;
  cameraAux2!: THREE.PerspectiveCamera;
  miniMapCamera!: THREE.OrthographicCamera;
  cameraPrimeiraPessoa!: THREE.PerspectiveCamera;
  arrayAmigos: Jogador[] = new Array<Jogador>();;
  nome: string | undefined = '';
  perfilByJogador!: Perfil;
  relacao!: Relacao;
  relacaoAux!: Relacao;
  listaRelacao: Relacao[] = [];
  mapaNomePosicao = new Map();
  raioCirculo: number = 0.15;
  container: any;
  insetWidth: any;
  insetHeight: any;
  checkForm: FormGroup;
  isCheckedBox: boolean = false;
  mouse: THREE.Vector2 = new THREE.Vector2();
  raycaster: THREE.Raycaster = new THREE.Raycaster();
  controlsMiniMap: OrbitControls;
  playerTip = document.createElement('playerTip');
  selectedCamera: string;
  dragX?: any;
  dragY?: any;

  constructor(private redeService: RedeService, private formBuilder: FormBuilder) {
    this.checkForm = this.formBuilder.group({
      check: ['', Validators.requiredTrue]
    });
  }

  isChecked() {
    if (this.isCheckedBox == false) {
      this.isCheckedBox = true;
      this.miniMapCamera = new THREE.OrthographicCamera(- 2, 2, 2, -2, 0.01, 1000);
      this.camera.add(this.miniMapCamera);
      this.controlsMiniMap = new OrbitControls(this.miniMapCamera, this.renderer.domElement);
      this.controlsMiniMap.enablePan = false;
    } else {
      this.isCheckedBox = false;
      this.miniMapCamera = new THREE.OrthographicCamera(- 2, 2, 2, -2, 0.01, 1000);
      this.cameraAux.add(this.miniMapCamera);
      this.scene.add(this.camera);
    }

  }

  selectCamera(event: any) {
    let WIDTH = 1275;
    let HEIGHT = 663;
    const aspectRatio = WIDTH / HEIGHT;
    this.selectedCamera = event.target.value;
    // if (this.selectedCamera == "fixed") {
    //   console.log("linha 81");
    //   this.camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.01, 1000);
    //   this.camera.position.z = 2.5;
    //   const controls = new OrbitControls(this.camera, this.renderer.domElement);
    //   this.scene.add(this.camera);
    // } else {
    //   console.log("linha 84");
    //   this.cameraPrimeiraPessoa = new THREE.PerspectiveCamera(70, aspectRatio, 0.01, 1000);
    //   this.cameraPrimeiraPessoa.position.z = 15;

    //   //  const controls = new OrbitControls(this.camera, this.renderer.domElement);

    //   //  this.cameraAux2.add(this.camera);
    //   this.scene.add(this.cameraPrimeiraPessoa);
    //   this.cameraPrimeiraPessoa.updateProjectionMatrix()

    // }
  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.email = currentUser?.replace(/\"/g, "");
    this.redeService.getPerfilAtual(this.email).subscribe(Perfil => {
      this.idPerfilAtual = Perfil.id;
      this.estadoHumor = Perfil.estadoHumor;
      this.redeService.getJogadorAtual(this.idPerfilAtual).subscribe(Jogador => {
        this.activePlayerObject = Jogador;
        this.redeService.getPerfilAtual(this.email).subscribe(Perfil => {
          this.nome = Perfil.nome;
          this.initialize();
          this.animate();
        });
      });
    });

  }

  createPlayer(playerName, email, estadoHumor, centerx, centery, centerz, radiusCircle, color) {
    let geometryPlayer12 = new THREE.SphereGeometry(radiusCircle, 15, 64);
    let materialPlayer12 = new THREE.MeshPhongMaterial({ color: color });
    let player = new THREE.Mesh(geometryPlayer12, materialPlayer12);
    player.position.set(centerx, centery, centerz);

    let playerDiv = document.createElement('div');
    playerDiv.className = 'label';
    if(playerName == '') {
      playerDiv.textContent = '- ' + email;
    } else {
      playerDiv.textContent = playerName + ' ' + email;
    }
    
    playerDiv.style.marginLeft = '+3px';
    playerDiv.style.marginRight = '+3px';
    playerDiv.style.backgroundColor = color;
    playerDiv.style.borderRadius = '12.5px';
    playerDiv.style.fontSize = '12px';

    var estado = '';
    let maior = 0.0;
    let estadoHumorDiv = document.createElement('div');
    for (let key in estadoHumor) {
      if (estadoHumor[key] > maior) {
        maior = estadoHumor[key];
        estado = key;
      }
    }

    switch (estado) {
      case 'Joyful': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '☀️';
        break;
      }
      case 'Distressed': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '⛈️';
        break;
      }
      case 'Hopeful': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '🤞';
        break;
      }
      case 'Fearful': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '😱';
        break;
      }
      case 'Relieved': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '😌';
        break;
      }
      case 'Disappointed': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '😞';
        break;
      }
      case 'Proud': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '😊';
        break;
      }
      case 'Remorseful': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '😔';
        break;
      }
      case 'Grateful': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '😄';
        break;
      }
      case 'Angry': {
        estadoHumorDiv.className = 'label';
        estadoHumorDiv.textContent = '😡';
      }
    }

    estadoHumorDiv.style.marginLeft = '+3px';
    estadoHumorDiv.style.marginRight = '+3px';
    estadoHumorDiv.style.marginTop = '+30px';
    estadoHumorDiv.style.backgroundColor = 'none';
    estadoHumorDiv.style.fontSize = '35px';

    let playerLabel = new CSS2DObject(playerDiv);
    let estadoLabel = new CSS2DObject(estadoHumorDiv);
    //playerLabel.position.setZ(-0.35);
    player.add(playerLabel);
    player.add(estadoLabel);
    this.scene.add(player);
  }

  createRelationship(peso12, peso21, anguloHorizontal, anguloVertical, centerx, centery, centerz, distance) {

    let geometryPlayer122 = new THREE.CylinderGeometry(0.03, 0.03, distance, 32);
    let materialPlayer122;

    if (peso12 > peso21) {
      materialPlayer122 = new THREE.ShaderMaterial({
        uniforms: {
          color1: {
            value: new THREE.Color("red")
          },
          color2: {
            value: new THREE.Color("green")
          }
        }, vertexShader: `
                          varying vec2 vUv;
  
                          void main() {
                              vUv = uv;
                               gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                          }
                      `,
        fragmentShader: `
                          uniform vec3 color1;
                          uniform vec3 color2;
    
                          varying vec2 vUv;
      
                          void main() {
        
                              gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
                          }
                      `,
        wireframe: true
      });
    } else if (peso21 > peso12) {
      materialPlayer122 = new THREE.ShaderMaterial({
        uniforms: {
          color1: {
            value: new THREE.Color("green")
          },
          color2: {
            value: new THREE.Color("red")
          }
        }, vertexShader: `
                          varying vec2 vUv;
  
                          void main() {
                              vUv = uv;
                               gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                          }
                      `,
        fragmentShader: `
                          uniform vec3 color1;
                          uniform vec3 color2;
    
                          varying vec2 vUv;
      
                          void main() {
        
                              gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
                          }
                      `,
        wireframe: false
      });
    } else {
      materialPlayer122 = new THREE.MeshPhongMaterial({ color: 'blue', flatShading: true })
    }

    let cylinder = new THREE.Mesh(geometryPlayer122, materialPlayer122);
    cylinder.position.x += centerx;
    cylinder.position.y += centery;
    cylinder.position.z += centerz;
    cylinder.rotateY(anguloHorizontal);
    cylinder.rotateX(anguloVertical);
    this.scene.add(cylinder);
  }

  getPerfil(id: string) {
    const promise = new Promise((resolve, reject) => {
      this.redeService.getPerfil(id).subscribe(Perfil => {
        this.perfilByJogador = Perfil;
        resolve(Perfil);
      });
    });
    promise.then((sucess) => {
      //console.log("Promise resolved with: " + this.perfilByJogador.nome);
    }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return promise;
  }

  getRelacao(id: string) {
    let promise = new Promise((resolve, reject) => {
      this.redeService.getRelacao(id).subscribe(Relacao => {
        this.listaRelacao = Relacao;
        resolve(Relacao);
      });
    });
    promise.then((sucess) => {
      console.log("Promise resolved with: " + this.listaRelacao.length);
    }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
    return promise;
  }

  animate() {
    let WIDTH = 1275;
    let HEIGHT = 663;
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.setClearColor(0x000000);

    this.renderer.setViewport(0, 0, WIDTH, HEIGHT);
    if (this.selectedCamera == "fixed" || this.selectedCamera == null) {
      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);

    } else {
      this.renderer.render(this.scene, this.cameraPrimeiraPessoa);
      this.labelRenderer.render(this.scene, this.cameraPrimeiraPessoa);

    }

    this.renderer.setClearColor(0x333333);

    this.renderer.clearDepth();

    this.renderer.setScissorTest(true);

    this.renderer.setScissor(1010, window.innerHeight - this.insetHeight - 550, this.insetWidth, this.insetHeight - 60);
    this.renderer.setViewport(1010, window.innerHeight - this.insetHeight - 550, this.insetWidth, this.insetHeight - 60);

    this.renderer.render(this.scene, this.miniMapCamera);

    this.renderer.setScissorTest(false);
  }

  windowResize() {
    let WIDTH = 1275;
    let HEIGHT = 663;
    this.camera.aspect = WIDTH / HEIGHT;
    this.renderer.setSize(WIDTH, HEIGHT);
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(WIDTH, HEIGHT);

    this.insetWidth = window.innerHeight / 4;
    this.insetHeight = window.innerHeight / 4;

    this.miniMapCamera.aspect = this.insetWidth / this.insetHeight;
    this.miniMapCamera.updateProjectionMatrix();
  }

  async initialize() {
    let WIDTH = 1275;
    let HEIGHT = 663;

    // Create an perspective camera
    const aspectRatio = WIDTH / HEIGHT;
    this.camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.01, 1000);
    this.camera.position.z = 2.5;

    this.cameraAux = new THREE.PerspectiveCamera(70, aspectRatio, 0.01, 1000);
    this.cameraAux.position.z = 2.5;

    this.miniMapCamera = new THREE.OrthographicCamera(- 2, 2, 2, -2, 0.01, 1000);
    this.cameraAux.add(this.miniMapCamera);

    //camera primeira pessoa
    // this.cameraAux2 = new THREE.PerspectiveCamera(0, aspectRatio, 0.01, 1000);
    this.cameraPrimeiraPessoa = new THREE.PerspectiveCamera(70, aspectRatio, 0.01, 1000);
    this.cameraPrimeiraPessoa.position.z = 0;
    // this.cameraAux2.add(this.cameraPrimeiraPessoa);



    // Create a renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(this.renderer.domElement);

    //Orbit Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    //controls.enablePan = false;

    // controlsMiniMap = new OrbitControls( this.miniMapCamera, this.renderer.domElement );
    // controlsMiniMap.enablePan = false;


    //Create label render
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(WIDTH, HEIGHT);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';

    this.labelRenderer.domElement.style.pointerEvents = 'none'
    document.body.appendChild(this.labelRenderer.domElement);

    // Create a scene
    this.scene = new THREE.Scene();
    // if(this.view) 
    this.scene.add(this.camera);
    this.scene.add(this.cameraAux);
    this.scene.add(this.cameraPrimeiraPessoa);

    //Create invisble label for players info

    this.playerTip.className = 'playerTip';
    this.playerTip.style.backgroundColor = "invisble";
    this.playerTip.style.borderRadius = '12.5px';
    this.playerTip.style.fontSize = '12px';
    this.playerTip.style.marginTop = '-20px';
    this.playerTip.style.color = 'white';



    //Create panning and zoom controls
    //window.addEventListener('mousedown', event => this.mouseDown(event));
    //window.addEventListener('mouseup', event => this.mouseUp(event));


    //Create directional light
    //verde
    const light = new THREE.PointLight(0x00ff00, 1.2);
    light.position.set(2, 2, 0);
    this.scene.add(light);

    //vermelho
    const light1 = new THREE.PointLight(0xff0000, 1.2);
    light1.position.set(-2, -2, 0);
    this.scene.add(light1);


    // foco solidário com a posicao da camera
    var flashlight = new THREE.SpotLight(0xffffff,0.5);
    this.camera.add(flashlight);

    // Ambient Light
    const lightAmbient = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(lightAmbient);

    this.container = document.getElementById("canvas");
    this.container.appendChild(this.renderer.domElement);
    this.container.appendChild(this.labelRenderer.domElement);

    this.container.addEventListener('mousemove', event => this.onMouseMove(event), false);
    this.container.addEventListener('keypress', event => this.onKeyPressed(event), false);

    window.addEventListener('resize', this.windowResize, false);
    this.windowResize();

    const radiusCircle = 0.15;

    //Active player´s position, center
    const posicaoCentral = new THREE.Vector3(0, 0, 0);
    this.createPlayer(this.nome, this.email, this.estadoHumor, posicaoCentral.x, posicaoCentral.y, posicaoCentral.z, radiusCircle, 'white');

    //Vai buscar lista de relacoes
    await this.getRelacao(this.activePlayerObject.id);

    var mapRelacao = new Array<Relacao>(); //key id jogador

    var mapNodePosicao = new Map(); //key = jogador id

    mapNodePosicao.set(this.activePlayerObject.id, [0, 0, 0]);

    const anguloFixo = 360 / this.listaRelacao.length, radius = 0.7;

    var angulo;


    //1 Nível de amigos, adiciona a lista os jogadores já na rede e as suas posições à rede
    for (var i = 0; i < this.listaRelacao.length; i++) {

      angulo = THREE.MathUtils.degToRad(anguloFixo * i);

      if (angulo == Math.PI) {
        angulo = 14 * Math.PI / 11;
      }

      var calculoZ = radius * angulo;

      //Compara com a posição inicial da camera no Z
      if (calculoZ >= 2.5) {
        calculoZ = 2.5 - calculoZ;
      }

      let pos = new THREE.Vector3(radius * Math.cos(angulo), radius * Math.sin(angulo), calculoZ);

      this.relacao = this.listaRelacao[i];

      await this.getPerfil(this.relacao.jogador2);

      this.createPlayer(this.perfilByJogador.nome, this.perfilByJogador.email, this.perfilByJogador.estadoHumor, pos.x, pos.y, pos.z, radiusCircle, 'skyblue');

      var auxiliar = [pos.x, pos.y, pos.z];

      mapNodePosicao.set(this.relacao.jogador2, auxiliar);

      mapRelacao.push(this.relacao);
    }


    var cont = 0.2, f = -1;     //aumenta sucessivamente para aumentar o raio
    var color = ['green', 'yellow', 'red', 'skyblue', 'purple'];

    for (var key of mapNodePosicao.keys()) {
      f++;
      await this.getRelacao(key);

      if (key != this.activePlayerObject.id && this.listaRelacao.length > 0) {

        let anguloAtual = 360 / this.listaRelacao.length;

        for (var l = 0; l < this.listaRelacao.length; l++) {

          this.relacao = this.listaRelacao[l];

          if (!mapNodePosicao.has(this.relacao.jogador2)) {

            angulo = THREE.MathUtils.degToRad(anguloAtual * l);

            if (angulo == Math.PI) {
              angulo = 14 * Math.PI / 11;
            }

            var calculoZ = (radius + cont) * angulo;

            if (calculoZ >= 2.5) {
              calculoZ = 2.5 - calculoZ;
            }

            let pos2 = new THREE.Vector3((radius + cont) * Math.cos(angulo), (radius + cont) * Math.sin(angulo), calculoZ);

            await this.getPerfil(this.relacao.jogador2);

            this.createPlayer(this.perfilByJogador.nome, this.perfilByJogador.email, this.perfilByJogador.estadoHumor, pos2.x, pos2.y, pos2.z, radiusCircle, color[f]);

            var auxiliar12 = [pos2.x, pos2.y, pos2.z];

            console.log(auxiliar12 + " " + this.perfilByJogador.nome)

            mapNodePosicao.set(this.relacao.jogador2, auxiliar12);
          }
          mapRelacao.push(this.relacao);

        }
      }
      cont = cont + 0.5;
    }

    for (var k = 0; k < mapRelacao.length; k++) {

      this.relacao = mapRelacao[k];
      var forca12 = this.relacao.forcaRelacao, forca21;

      for (var j = 0; j < mapRelacao.length; j++) {

        this.relacaoAux = mapRelacao[j];
        console.log(mapRelacao.length);
        if (this.relacaoAux.jogador1 == this.relacao.jogador2 && this.relacaoAux.jogador2 == this.relacao.jogador1) {
          forca21 = this.relacaoAux.forcaRelacao;
        }
      }

      let posicao1 = mapNodePosicao.get(this.relacao.jogador1);
      let posicao2 = mapNodePosicao.get(this.relacao.jogador2);

      let hipotenusa = Math.pow(Math.pow(Math.abs(posicao2[0] - posicao1[0]), 2) + Math.pow(Math.abs(posicao2[1] - posicao1[1]), 2) + Math.pow(Math.abs(posicao2[2] - posicao1[2]), 2), 0.5);

      var anguloHorizontal = Math.atan2((posicao1[0] - posicao2[0]), (posicao1[2] - posicao2[2]));

      var anguloVertical = Math.acos((posicao1[1] - posicao2[1]) / hipotenusa);

      let pontoIntermedio = new THREE.Vector3(((posicao2[0] + posicao1[0]) / 2), ((posicao2[1] + posicao1[1]) / 2), ((posicao2[2] + posicao1[2]) / 2));

      this.createRelationship(forca12, forca21, anguloHorizontal, anguloVertical, pontoIntermedio.x, pontoIntermedio.y, pontoIntermedio.z, hipotenusa);
    }

  }

  async onKeyPressed(event: KeyboardEvent) {
    let key = event.key;
    const direction = new THREE.Vector3(0, 0, 0);
    this.cameraPrimeiraPessoa.getWorldDirection(direction);
    console.log(direction);
    console.log("Position: " + this.cameraPrimeiraPessoa.position.z);
    if (key == 'w') {
      if (this.cameraPrimeiraPessoa.position.z <= 0 && (direction.z < 0.0 || (direction.z > 0.0 && direction.z < 0.4))) {//this.cameraPrimeiraPessoa.position.z - 1 > 0) {
        console.log("W 1 IF");
        this.cameraPrimeiraPessoa.position.z -= 1;
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      } else if (direction.z > 0.0) {
        console.log("W 2 IF");
        this.cameraPrimeiraPessoa.position.z += 1;
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      } else
        if (this.cameraPrimeiraPessoa.position.z <= 0 && this.cameraPrimeiraPessoa.position.z + 1 < 0) {
          console.log("W 3 IF");
          this.cameraPrimeiraPessoa.position.z += 1;
          console.log("X: " + this.cameraPrimeiraPessoa.position.x);
          console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
          console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
          this.windowResize();
        } else if (this.cameraPrimeiraPessoa.position.z - 1 < 0 && this.cameraPrimeiraPessoa.position.z != 0) {
          console.log("W 4 IF");
          this.cameraPrimeiraPessoa.position.z += 1;
          console.log("X: " + this.cameraPrimeiraPessoa.position.x);
          console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
          console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
          this.windowResize();
        } else {
          console.log("W 5 IF");
          this.cameraPrimeiraPessoa.position.z -= 1;
          console.log("X: " + this.cameraPrimeiraPessoa.position.x);
          console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
          console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
          this.windowResize();
        }
    }
    if (key == 'a') {
      if (this.cameraPrimeiraPessoa.position.z == 0) {
        this.cameraPrimeiraPessoa.rotateX(-1);
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      }
    }
    if (key == 's') {
      if (this.cameraPrimeiraPessoa.position.z < 0) {
        console.log("S 1 if")
        this.cameraPrimeiraPessoa.position.z += 1;
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      } else if (this.cameraPrimeiraPessoa.position.x == 0 && this.cameraPrimeiraPessoa.position.z > 0 && direction.z < 0.0) {
        console.log("S 2 if");
        this.cameraPrimeiraPessoa.position.z += 1;
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      } else if (this.cameraPrimeiraPessoa.position.x == 0 && this.cameraPrimeiraPessoa.position.z > 0 && direction.z > 0.0) {
        console.log("S 3 IF");
        this.cameraPrimeiraPessoa.position.z -= 1;
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);

      } else if (this.cameraPrimeiraPessoa.position.y == 0 && this.cameraPrimeiraPessoa.position.z > 0) {
        console.log("S 4 if")
        this.cameraPrimeiraPessoa.position.z += 1;
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      }

    }
    if (key == 'd') {
      if (this.cameraPrimeiraPessoa.position.z == 0) {
        this.cameraPrimeiraPessoa.rotateX(1);
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      }
    }
    if (key == 'p') {
      if (this.cameraPrimeiraPessoa.position.z == 0) {
        this.cameraPrimeiraPessoa.rotateY(1);
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      }
    }
    if (key == 'l') {
      if (this.cameraPrimeiraPessoa.position.z == 0) {
        this.cameraPrimeiraPessoa.rotateY(-1);
        console.log("X: " + this.cameraPrimeiraPessoa.position.x);
        console.log("Y: " + this.cameraPrimeiraPessoa.position.y);
        console.log("Z: " + this.cameraPrimeiraPessoa.position.z);
        this.windowResize();
      }
    }
  }

  /*render(): void{
    var left, bottom, width, height;

    left = 1; bottom = 1; width = 
  }*/

  async onMouseMove(event: any) {
    event.preventDefault();

    var rect = document.getElementById("canvas").getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2.0 - 1.0;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2.0 + 1.0;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    var intersects = this.raycaster.intersectObjects(this.scene.children, true);

    let playerLabelAux = new CSS2DObject(this.playerTip);
    playerLabelAux.visible = false;

    if (intersects.length > 0) {
      this.selected = intersects[0].object;
      if (this.selected.geometry.type == "SphereGeometry") {
        var aux = this.selected.children[0].element.innerText;
        var list:string[] = aux.split(" ");
        this.redeService.getPerfilAtual(list[1]).subscribe(Perfil => { 
          if (Perfil.avatar.length != 0) {
            const imageBlob = this.dataURItoBlob(Perfil.avatar);
            var avatarPostar = new File([imageBlob], "avatar", { type: 'image/png' });
            const reader = new FileReader();
            reader.onload = () => {
              this.imagePreview = reader.result;
            };
            reader.readAsDataURL(avatarPostar);
            console.log(Perfil);
            this.playerTip.textContent = "Nome: " + Perfil.nome + ". Tags: " + Perfil.tags;
          } else {
            this.playerTip.textContent = "Nome: " + Perfil.nome + ". Tags: " + Perfil.tags + ". Não tem avatar.";
          }

        });

        intersects[0].object.material.transparent = true;
        intersects[0].object.material.opacity = 0.5;

        playerLabelAux.visible = true;
        playerLabelAux.position.set(this.selected.position.x, this.selected.position.y, this.selected.position.z);

        this.scene.add(playerLabelAux);
        let playerTipAvatar = document.getElementById("playerTipAvatar");

        let tipAvatar = new CSS2DObject(playerTipAvatar);

        tipAvatar.position.set(this.selected.position.x, this.selected.position.y, this.selected.position.z);
        this.scene.add(tipAvatar);
        // sleep
        await new Promise(r => setTimeout(r, 1500));
        intersects[0].object.material.opacity = 1.0;

        tipAvatar.visible = false;
        playerLabelAux.visible = true;
      }
    }

    playerLabelAux.visible = false;

    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

}