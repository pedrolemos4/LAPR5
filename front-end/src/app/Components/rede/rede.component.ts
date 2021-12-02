import { Component, OnInit } from '@angular/core';
import { RedeService } from 'src/app/Services/Rede/rede.service';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import * as THREE from 'three/build/three.module.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { Relacao } from 'src/app/Models/Relacao';

@Component({
  selector: 'app-rede',
  templateUrl: './rede.component.html',
  styleUrls: ['./rede.component.css']
})
export class RedeComponent implements OnInit {

  email: string | undefined = '';
  idPerfilAtual: string | undefined = '';
  activePlayerObject!: Jogador;
  scene!: any;
  renderer!: any;
  labelRenderer!: any;
  camera!: THREE.PerspectiveCamera;
  arrayAmigos: Jogador[] = new Array<Jogador>();;
  nome: string | undefined = '';
  perfilByJogador!: Perfil;
  relacao!: Relacao;
  relacaoAux!: Relacao;
  listaRelacao: Relacao[] = [];
  container:any;

  constructor(private redeService: RedeService) { }

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
    //playerLabel.position.setY(-0.35);
    player.add(playerLabel);
    this.scene.add(player);
  }

  createRelationship(peso12, peso21, anguloEntreCirculos, centerx, centery, centerz, distance) {

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
        wireframe: true
      });
    } else {
      materialPlayer122 = new THREE.MeshPhongMaterial({ color: 'blue', flatShading: true })
    }

    let cylinder = new THREE.Mesh(geometryPlayer122, materialPlayer122);
    cylinder.position.x += centerx;
    cylinder.position.y += centery;
    cylinder.position.z += centerz;
    cylinder.rotateZ(-anguloEntreCirculos);
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
      console.log("Promise resolved with: " + this.perfilByJogador.nome);
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
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  windowResize() {
    let WIDTH = 700;
    let HEIGHT = 700;
    this.camera.aspect = WIDTH / HEIGHT;
    this.renderer.setSize(WIDTH, HEIGHT);
  }

  async initialize() {
    let WIDTH = 700;
    let HEIGHT = 700;

    // Create a scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x999999);

    // Create an perspective camera
    const aspectRatio = WIDTH / HEIGHT;
    this.camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 5000);
    this.camera.position.z = 2.5;

    //Create light
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    // Create a renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(WIDTH, HEIGHT);
    document.body.appendChild(this.renderer.domElement);

    //Create label render
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(WIDTH, HEIGHT);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(this.labelRenderer.domElement);

    this.container = document.getElementById("canvas");
    this.container.appendChild(this.renderer.domElement);
    this.container.appendChild(this.labelRenderer.domElement);

    window.addEventListener('resize', this.windowResize.bind(this));

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

    var angulo, anguloEntreCirculos;


    //1 Nível de amigos, adiciona a lista os jogadores já na rede e as suas posições à rede
    for (var i = 0; i < this.listaRelacao.length; i++) {

      angulo = THREE.MathUtils.degToRad(anguloFixo * i);

      if (angulo == Math.PI) {
        angulo = 14 * Math.PI / 11;
      }

      let pos = new THREE.Vector3(radius * Math.cos(angulo), radius * Math.sin(angulo), 0);

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

            let pos2 = new THREE.Vector3((radius + cont) * Math.cos(angulo), (radius + cont) * Math.sin(angulo), 0);

            await this.getPerfil(this.relacao.jogador2);

            this.createPlayer(this.perfilByJogador.nome, this.perfilByJogador.email, pos2.x, pos2.y, pos2.z, radiusCircle, color[f]);

            var auxiliar12 = [pos2.x, pos2.y, pos2.z];

            mapNodePosicao.set(this.relacao.jogador2, auxiliar12);
          }
          mapRelacao.push(this.relacao);

        }
      }
      cont = cont + 0.2;
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

      anguloEntreCirculos = Math.atan2((posicao1[0] - posicao2[0]), (posicao1[1] - posicao2[1]));

      let hipotenusa = Math.pow(Math.pow(Math.abs(posicao2[0] - posicao1[0]), 2) + Math.pow(Math.abs(posicao2[1] - posicao1[1]), 2), 0.5);

      let pontoIntermedio = new THREE.Vector3(((posicao2[0] + posicao1[0]) / 2), ((posicao2[1] + posicao1[1]) / 2), 0);

      this.createRelationship(forca12, forca21, anguloEntreCirculos, pontoIntermedio.x, pontoIntermedio.y, pontoIntermedio.z, hipotenusa - (2 * radiusCircle));
    }

  }

}