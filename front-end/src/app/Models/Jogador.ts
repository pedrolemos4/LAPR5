export interface Jogador{
    pontuacao : number;
    nome : string;
    email : string;
    telefone : number;
    pais : string;
    cidade : string;
    dataNascimento : string;
    estadoHumor : string;
    password : string;
    tags : string | any;
    perfilFacebook : string;
    perfilLinkedin : string;
    listaMissoes : any;
    listaRelacoes : string [];
    listaPosts : any
}