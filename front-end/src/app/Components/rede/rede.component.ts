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

  email: string | undefined = '';
  imagePreview: string | ArrayBuffer = '';
  selected: THREE.Mesh = null;
  idPerfilAtual: string | undefined = '';
  activePlayerObject!: Jogador;
  scene!: any;
  renderer!: any;
  labelRenderer!: any;
  camera!: THREE.PerspectiveCamera;
  cameraAux!: THREE.PerspectiveCamera;
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

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.email = currentUser?.replace(/\"/g, "");
    this.redeService.getPerfilAtual(this.email).subscribe(Perfil => {
      this.idPerfilAtual = Perfil.id;
      this.redeService.getJogadorAtual(this.idPerfilAtual).subscribe(Jogador => {
        this.activePlayerObject = Jogador;
        console.log(this.activePlayerObject.id);
        this.redeService.getPerfilAtual(this.email).subscribe(Perfil => {
          this.nome = Perfil.nome;
          this.initialize();
          this.animate();
        });
      });
    });

  }

  createPlayer(playerName, email, centerx, centery, centerz, radiusCircle, color) {
    let geometryPlayer12 = new THREE.SphereGeometry(radiusCircle, 15, 64);
    let materialPlayer12 = new THREE.MeshPhongMaterial({ color: color });
    let player = new THREE.Mesh(geometryPlayer12, materialPlayer12);
    player.position.set(centerx, centery, centerz);

    let playerDiv = document.createElement('div');
    playerDiv.className = 'label';
    playerDiv.textContent = playerName + ' ' + email;
    playerDiv.style.marginLeft = '+3px';
    playerDiv.style.marginRight = '+3px';
    playerDiv.style.backgroundColor = color;
    playerDiv.style.borderRadius = '12.5px';
    playerDiv.style.fontSize = '12px';

    let playerLabel = new CSS2DObject(playerDiv);
    //playerLabel.position.setZ(-0.35);
    player.add(playerLabel);
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
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);

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
    this.cameraPrimeiraPessoa = new THREE.PerspectiveCamera(60, aspectRatio, 0.01, 1000);
    this.camera.add(this.cameraPrimeiraPessoa);

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
    this.scene.add(this.camera);
    this.scene.add(this.cameraAux);


    //Create invisble label for players info

    this.playerTip.className = 'playerTip';
    this.playerTip.style.backgroundColor = "invisble";
    this.playerTip.style.borderRadius = '12.5px';
    this.playerTip.style.fontSize = '12px';
    this.playerTip.style.marginTop = '20px';



    //Create panning and zoom controls
    //window.addEventListener('mousedown', event => this.mouseDown(event));
    //window.addEventListener('mouseup', event => this.mouseUp(event));

    //Create light
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(20, 20, 0);
    this.scene.add(light);

    this.container = document.getElementById("canvas");
    this.container.appendChild(this.renderer.domElement);
    this.container.appendChild(this.labelRenderer.domElement);

    this.container.addEventListener('mousemove', event => this.onMouseMove(event), false);

    window.addEventListener('resize', this.windowResize, false);
    this.windowResize();

    const radiusCircle = 0.15;

    //Active player´s position, center
    const posicaoCentral = new THREE.Vector3(0, 0, 0);
    this.createPlayer(this.nome, this.email, posicaoCentral.x, posicaoCentral.y, posicaoCentral.z, radiusCircle, 'white');

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

      this.createPlayer(this.perfilByJogador.nome, this.perfilByJogador.email, pos.x, pos.y, pos.z, radiusCircle, 'skyblue');

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

            this.createPlayer(this.perfilByJogador.nome, this.perfilByJogador.email, pos2.x, pos2.y, pos2.z, radiusCircle, color[f]);

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
        var list = aux.split(" ");

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
            this.playerTip.textContent = Perfil.estadoHumor + ". Facebook: " + Perfil.perfilFacebook + ". \nLinkedIn: " + Perfil.perfilLinkedin + ". Telefone: " + Perfil.telefone;
          } else {
            this.playerTip.textContent = Perfil.estadoHumor + ". Facebook: " + Perfil.perfilFacebook + ". \nLinkedIn: " + Perfil.perfilLinkedin + ". Telefone: " + Perfil.telefone + "\n. Não tem avatar.";
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