import { Component, OnInit } from '@angular/core';
import { RedeService } from 'src/app/Services/Rede/rede.service';
import { Jogador } from 'src/app/Models/Jogador';
import { Perfil } from 'src/app/Models/Perfil';
import { mergeMap } from 'rxjs';
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
  listaAmigos: Jogador[] = [];
  scene!: any;
  renderer!: any;
  labelRenderer!: any;
  camera!: THREE.PerspectiveCamera;
  arrayAmigos: Jogador[] = [];
  nome: string | undefined = '';
  perfilByJogador!: Perfil;
  relacao!: Relacao;

  constructor(private redeService: RedeService) { }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.email = currentUser?.replace(/\"/g, "");
    console.log(currentUser);
    console.log(this.email);
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

    //console.log(this.activePlayerObject.id);

    
  }



  createPlayer(playerName: string | undefined, email: string | undefined, centerx: number, centery: number, centerz: number, radiusCircle: number, color: string) {
    let geometryPlayer12 = new THREE.SphereGeometry(radiusCircle, 15, 64);
    let materialPlayer12 = new THREE.MeshPhongMaterial({ color: color });
    let player = new THREE.Mesh(geometryPlayer12, materialPlayer12);
    player.position.set(centerx, centery, centerz);
    this.scene.add(player);

    let playerDiv = document.createElement('div');
    playerDiv.className = 'label';
    playerDiv.textContent = playerName + ' ' + email;
    playerDiv.style.marginLeft = '+3px';
    playerDiv.style.marginRight = '+3px';
    playerDiv.style.backgroundColor = color;
    playerDiv.style.borderRadius = '12.5px';
    playerDiv.style.fontSize = '12px';

    let playerLabel = new CSS2DObject(playerDiv);
    player.add(playerLabel);
  }

  createRelationship(peso12: number, peso21: number, anguloEntreCirculos: number, centerx: number, centery: number, centerz: number, distance: number) {//, radius, posicao1, posicao2) {

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

  getListaAmigos(id: string) {
    this.redeService.getAmigosJogador(id).subscribe(listaAmigosJogadorAtivo => {
      this.listaAmigos = listaAmigosJogadorAtivo;
    });
    //console.log(listaAux.length);
  }

  getPerfil(id: string) {
    this.redeService.getPerfil(id).subscribe(Perfil => {
      this.perfilByJogador = Perfil;
    });
  }

  animate() {
    //requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  windowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  initialize() {
    // Create a scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x999999);

    // Create an perspective camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(70, aspectRatio, 0.1, 5000);
    this.camera.position.z = 2.5;

    //Create light
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-1, 2, 4);
    this.scene.add(light);

    // Create a renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    //Create label render
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(this.labelRenderer.domElement);

    //window.addEventListener('resize', this.windowResize);

    const radiusCircle = 0.15;

    //Active player´s position, center
    const posicaoCentral = new THREE.Vector3(0.0, 0.0, -0.1);
    this.createPlayer(this.nome, this.email, posicaoCentral.x, posicaoCentral.y, posicaoCentral.z, radiusCircle, 'brown');

    //Vai buscar lista de relacoes
    this.getListaAmigos(this.activePlayerObject.id);

    var mapRelacao = []; //key id jogador

    var mapNodePosicao = new Map(); //key = jogador id

    mapNodePosicao.set(this.activePlayerObject.id, posicaoCentral);
    console.log(this.listaAmigos.length);
    const anguloFixo = 360 / this.listaAmigos.length, radius = 0.7;

    var angulo, anguloEntreCirculos;

    //1 Nível de amigos, adiciona a lista os jogadores já na rede e as suas posições à rede
    for (var i = 0; i < this.listaAmigos.length; i++) {
      angulo = THREE.MathUtils.degToRad(anguloFixo * i);
      if (angulo == Math.PI) {
        angulo = 14 * Math.PI / 11;
      }

      let pos = new THREE.Vector3(radius * Math.cos(angulo), radius * Math.sin(angulo), 0);

      this.getPerfil(this.listaAmigos[i].id);

      this.createPlayer(this.perfilByJogador.nome, this.perfilByJogador.email, pos.x, pos.y, pos.z, radiusCircle, 'green');

      mapNodePosicao.set(this.listaAmigos[i].id, pos);

      mapRelacao.push([this.activePlayerObject.id, this.listaAmigos[i].id]);
    }


    var cont = 0.2, f = -1;     //aumenta sucessivamente para aumentar o raio
    var color = ['green', 'yellow', 'red', 'skyblue', 'purple'];

    for (var key of mapNodePosicao.keys()) {
      f++;

      this.getListaAmigos(key);

      if (key != this.activePlayerObject.id) {
        let anguloAtual = 360 / this.listaAmigos.length;
        for (var l = 0; l < this.listaAmigos.length; l++) {
          let pos2;
          if (!mapNodePosicao.has(this.listaAmigos[l])) {
            angulo = THREE.MathUtils.degToRad(anguloAtual * l);

            pos2 = new THREE.Vector3((radius + cont) * Math.cos(angulo), (radius + cont) * Math.sin(angulo), 0);
            this.getPerfil(this.listaAmigos[l].id);
            console.log('OLAAAAA');
            console.log(this.perfilByJogador.nome);
            this.createPlayer(this.perfilByJogador.nome, this.perfilByJogador.email, pos2.x, pos2.y, pos2.z, radiusCircle, color[f]);

            mapNodePosicao.set(this.listaAmigos[l].id, pos2);

          }/* else {
            playerAux2 = this.arrayAmigos[l];
          }*/

          mapRelacao.push([key, this.listaAmigos[l].id]);
        }
      }
      cont = cont + 0.2;
    }

    for (var k = 0; k < mapRelacao.length; k++) {
      var aux = mapRelacao[k]; //ir buscar o valor dos pesos

      try {
        this.redeService.getRelacao(aux[0], aux[1]).subscribe({
          next: (relacao: any) => { (this.relacao = relacao) }
        });
      } catch (e) {
        this.redeService.getRelacao(aux[1], aux[0]).subscribe({
          next: (relacao: any) => { (this.relacao = relacao) }
        });
      }

      let posicao1 = mapNodePosicao.get(aux[0]);
      let posicao2 = mapNodePosicao.get(aux[1]);

      //getIdKey getIdValue, ir buscar a relacao a base de dados, colocar os pesos na relacao
      //var valores = getRelacao(aux[0],aux[1])
      //if valores vazio, getRelacao(aux[1],aux[0])

      anguloEntreCirculos = Math.atan2((posicao1.x - posicao2.x), (posicao1.y - posicao2.y));

      let hipotenusa = Math.pow(Math.pow(Math.abs(posicao2.x - posicao1.x), 2) + Math.pow(Math.abs(posicao2.y - posicao1.y), 2), 0.5);

      let pontoIntermedio = new THREE.Vector3(((posicao2.x + posicao1.x) / 2), ((posicao2.y + posicao1.y) / 2), 0);

      this.createRelationship(21, 12, anguloEntreCirculos, pontoIntermedio.x, pontoIntermedio.y, pontoIntermedio.z, hipotenusa - (2 * radiusCircle));//, radiusCircle, posicao1, posicao2);
    }

  }

}
