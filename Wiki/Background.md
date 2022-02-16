## Contents
- [Architecture Background](#architecture-background)
	- [Problem Background](#problem-background)
		- [System Overview](#system-overview)
		- [Context](#context)
		- [Driving Requirements](#driving-requirements)
			- [Functional requirements](#functional-requirements)
			- [Quality attributes](#quality-attributes)
				- [Funcionalidade](#funcionalidade)
				- [Usabilidade](#usabilidade)
				- [Confiabilidade (Reliability)](#confiabilidade-reliability)
				- [Desempenho (Performance)](#desempenho-performance)
				- [Suportabilidade](#suportabilidade)
				- [Design constraints](#design-constraints)
				- [Implementation constraints](#implementation-constraints)
				- [Interface constraints](#interface-constraints)
				- [Physical constraints](#physical-constraints)
	- [Solution Background](#solution-background)
		- [Architectural Approaches](#architectural-approaches)
		- [Analysis Results](#analysis-results)
		- [Mapping Requirements to Architecture](#mapping-requirements-to-architecture)

# Architecture Background
>Architecture Background provides information about the software architecture, by:
>- describing the background and rationale for the software architecture;
>- explaining the constraints and influences that led to the current architecture;
>- describing the major architectural approaches that have been utilized in the architecture.

Foi utilizada uma arquitetura Onion, devido à fácil adaptação do código no futuro, à medida que o sistema evolua ou haja a necessidade para tal.

  
## Problem Background
>The sub-parts of this section explain the constraints that provided the significant influence over the architecture.

### System Overview
> This section describes the general function and purpose for the system or subsystem whose architecture is described in this SAD.

A Graph4Social,SA pretende o desenvolvimento de um protótipo para um jogo baseado na visualização e manipulação de grafos sociais.

### Context
> This section describes the goals and major contextual factors for the software architecture. The section includes a description of the role software architecture plays in the life cycle, the relationship to system engineering results and artifacts, and any other relevant factors.

O Jogo simula uma rede social e o jogador tem por objetivo expandir a sua rede social, com o objetivo último de ter a maior e mais forte rede social possível. O jogo desenrola-se numa série de missões em que o jogador terá que avançar e aumentar a sua rede para subir no leader board. Um utilizador pode iniciar um jogo/missão em qualquer momento escolhendo o nível de dificuldade pretendido.

*NB: Contudo, o sistema aqui pedido é uma simplificação daquilo que é um sistema de gestão de transportes, pelo que são assumidas simplificações para tornar o projeto exequível neste âmbito (i.e. 5º semestre da LEI).*

Este SAD serve de base para debate sobre o sistema a construir (a implementar, testar e implantar), e pretende-se que esteja alinhado com o sistema construído. Para além do óbvio na descrição duma arquitetura de software, deve identificar alternativas de design e ponto de variação.

### Driving Requirements
> This section lists the functional requirements, quality attributes and design constraints. It may point to a separate requirements document.

#### Functional requirements
UC 3: Como jogador pretendo editar relacionamento com tags e força de ligação.
UC 4: Como jogador pretendo consultar (o cálculo d) a força de ligação entre dois utilizadores/jogadores.
UC 5: Como jogador pretendo editar perfil próprio.
UC 6: Como jogador pretendo editar estado de humor.
UC 7: Como jogador pretendo consultar a rede a partir da sua perspetiva.
UC 8: Como utilizador não registado, quero registar-me no sistema.
UC 9: Como jogador recém registado, quero escolher quais "utilizadores objetivo" (sugeridos pelo sistema) gostaria de ter na minha rede.
UC 10: Como jogador, quero pesquisar utilizadores que conheça na rede, e pedir ligação de utilizador.
UC 11: Como jogador, quero pedir introdução a utilizador objetivo.
UC 12: Como jogador, quero aprovar/desaprovar pedido de introdução.
UC 13: Como jogador, quero fazer um post.
UC 14: Como jogador, quero comentar um post.
UC 16: Como jogador pretendo consultar a Fortaleza da rede – somatório da força de ligação da sua rede até ao primeiro nível.
UC 17: Como jogador, quero consultar o caminho mais forte para determinado utilizador.
UC 18: Como jogador, quero consultar o caminho mais curto para determinado utilizador.
UC 19: Como jogador, quero consultar o caminho mais seguro para determinado utilizador.
UC 20: Como jogador, quero consultar o tamanho da rede de um utilizador (até 3º nível – dois graus de separação).
UC 21: Como jogador, quero consultar o grafo de amigos comuns entre dois utilizadores.
UC 22a: Como jogador, quero consultar leader board - dimensão de rede.
UC 22b: Como jogador, quero consultar leader board - fortaleza de rede.
UC 23: Como jogador, quero consultar dimensão da rede (número de utilizadores).
UC 24: Como jogador, quero consultar Tag cloud das tags de todos os utilizadores.
UC 25: Como jogador, quero consultar Tag cloud das tags de todos os utilizadores.
UC 26: Como jogador, quero consultar sugestões de amigos.
UC 27: Como jogador, quero consultar Tag cloud das tags do próprio utilizador.
UC 28: Como jogador, quero consultar Tag cloud das tags de relações do próprio.
UC 33: Como jogador, quero aceitar ou rejeitar a introdução.
UC 35: Como jogador, quero obter lista de pedidos de ligação pendentes.


#### Quality attributes
Os atributos de qualidade são categorizados e sistematizados segundo o modelo [FURPS+](https://pt.wikipedia.org/wiki/FURPS).

##### Funcionalidade
1. Cada sistema só poderá aceder aos dados que lhe dizem respeito.
2. Deve ser auditada e verificada a integridade da informação a que os sistemas acedem.
3. Com vista à necessidade de saber e necessidade de conhecer, toda a informação deve estar protegida de acessos indevidos. Ou seja, o princípio de minimização de acesso ao que é essencial para cada utilizador/aplicação, criação de túneis para transferência de informação, avaliação da integridade de dados e aplicações, e encriptação/minimização dos dados.
4. Uma vez que o módulo de gestão de rede social se encontra virado para o exterior, é necessário ter especial atenção com a privacidade e proteção de dados à luz do RGPD. Assim é necessário que o sistema cumpra a legislação em vigor e, em especial, disponibilize as informações legais e informe o utilizador aquando do seu registo, bem como permita aceder e cancelar a sua conta nos casos e nas condições legalmente permitidas.

##### Usabilidade
5. A SPA deve permitir acesso a todos os módulos do sistema: site rs, planeamento, visualização e master data posts, bem como RGPD.

##### Confiabilidade (Reliability)
n/a

##### Desempenho (Performance)
n/a

##### Suportabilidade
6. Embora não esteja no âmbito atual do projeto, deve ser levado em conta na arquitetura da solução, a extensão futura para aplicações móveis.

##### Design constraints
TBD