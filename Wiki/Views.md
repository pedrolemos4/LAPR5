## Contents
- [Views](#Views)
	- [Introduction](#introduction)
	- [Nível 1](Views.md##Nível 1)
		- [Vista Lógica](#vista-lógica)
		- [Vista de Processos](#vista-de-processos)
			- [SSD UC3](#ssd-us03)
			- [SSD UC4](#ssd-us04)
			- [SSD UC5](#ssd-us05)
			- [SSD UC6](#ssd-us06)
			- [SSD UC7](#ssd-us07)
			- [SSD UC8](#ssd8-us08)
			- [SSD UC9](#ssd9-us09)
			- [SSD UC10](#ssd-us10)
			- [SSD UC11](#ssd-us11)
			- [SSD UC12](#ssd-us12)
			- [SSD UC13](#ssd-uc13)
			- [SSD UC14](#ssd-us14)
			- [SSD UC15](#ssd-us15)
			- [SSD UC16](#ssd-us16)
			- [SSD UC17](#ssd-us17)
			- [SSD UC18](#ssd-us18)
			- [SSD UC19](#ssd-us19)
			- [SSD UC20](#ssd-us20)
			- [SSD UC21](#ssd-us21)
			- [SSD UC22a](#ssd-us22a)
			- [SSD UC22b](#ssd-us22b)
			- [SSD UC23](#ssd-us23)
			- [SSD UC24](#ssd-us24)
			- [SSD UC25](#ssd-us25)
			- [SSD UC26](#ssd-us26)
			- [SSD UC27](#ssd-us27)
			- [SSD UC28](#ssd-us28)
			- [SSD UC33](#ssd35-us33)
			- [SSD UC35](#ssd35-us35)
	- [Nível 2](#nível-2)
		- [Vista Lógica](#vista-lógica-1)
		- [Vista de Processos](#vista-de-processos-1)
			- [SD UC3](#sd3-us03)
			- [SD UC4](#sd4-us04)
			- [SD UC5](#sd5-us05)
			- [SD UC6](#sd6-us06)
			- [SD UC7](#sd7-us07)
			- [SD UC8](#sd8-us08)
			- [SD UC9](#sd9-us09)
			- [SD UC10](#sd10-us10)
			- [SD UC11](#sd11-us11)
			- [SD UC12](#sd12-us12)
			- [SD UC13](#sd13-uc13)
			- [SD UC14](#sd14-us14)
			- [SD UC15](#sd15-us15)
			- [SD UC16](#sd16-us16)
			- [SD UC17](#sd17-us17)
			- [SD UC18](#sd18-us18)
			- [SD UC19](#sd19-us19)
			- [SD UC20](#sd20-us20)
			- [SD UC21](#sd21-us21)
			- [SD UC22a](#sd22a-us22a)
			- [SD UC22b](#sd22b-us22b)
			- [SD UC23](#sd23-us23)
			- [SD UC24](#sd24-us24)
			- [SD UC25](#sd25-us25)
			- [SD UC26](#sd26-us26)
			- [SD UC27](#sd27-us27)
			- [SD UC28](#sd28-us28)
			- [SD UC33](#sd33-us33)
			- [SD UC35](#sd35-us35)
		- [Vista de Implementação](#vista-de-implementação)
		- [Vista Física](#vista-física)
	- [Nível 3](#nível-3)
		- [Vista de Processos](#vista-de-processos-1)
			- [SD UC3](#sd3-us03)
			- [SD UC4](#sd4-us04)
			- [SD UC5](#sd5-us05)
			- [SD UC6](#sd6-us06)
			- [SD UC7](#sd7-us07)
			- [SD UC8](#sd8-us08)
			- [SD UC9](#sd9-us09)
			- [SD UC10](#sd10-us10)
			- [SD UC11](#sd11-us11)
			- [SD UC12](#sd12-us12)
			- [SD UC13](#sd13-uc13)
			- [SD UC14](#sd14-us14)
			- [SD UC15](#sd15-us15)
			- [SD UC16](#sd16-us16)
			- [SD UC17](#sd17-us17)
			- [SD UC18](#sd18-us18)
			- [SD UC19](#sd19-us19)
			- [SD UC20](#sd20-us20)
			- [SD UC21](#sd21-us21)
			- [SD UC22a](#sd22a-us22a)
			- [SD UC22b](#sd22b-us22b)
			- [SD UC23](#sd23-us23)
			- [SD UC24](#sd24-us24)
			- [SD UC25](#sd25-us25)
			- [SD UC26](#sd26-us26)
			- [SD UC27](#sd27-us27)
			- [SD UC28](#sd28-us28)
			- [SD UC33](#sd33-us33)
			- [SD UC35](#sd35-us35)
	- [Nível 3 (Site RS)](#nível-3-rs)
		- [Vista Lógica](#vista-lógica-3)
		- [Vista de Implementação](#vista-de-implementação-3)
		- [Vista Física](#vista-física-1)
	- [Nível 3 (UI)](#nível-3-ui)
		- [Vista Lógica](#vista-lógica-3)
		- [Vista de Implementação](#vista-de-implementação-2)
		- [Vista Física](#vista-física-2)
	- [Nível 3 (IA)](#nível-3-ia)
		- [Vista Lógica](#vista-lógica-4)
		- [Vista de Implementação](#vista-de-implementação-3)
		- [Vista Física](#vista-física-3)
	- [Nível 3 (Master Data Posts)](#nível-3-posts)
		- [Vista Lógica](#vista-lógica-5)
		- [Vista de Implementação](#vista-de-implementação-4)
		- [Vista Física](#vista-física-4)

# Views

## Introduction
Será adotada a combinação de dois modelos de representação arquitetural: C4 e 4+1.

O Modelo de Vistas 4+1 [[Krutchen-1995]](References.md#Kruchten-1995) propõe a descrição do sistema através de vistas complementares permitindo assim analisar separadamente os requisitos dos vários stakeholders do software, tais como utilizadores, administradores de sistemas, project managers, arquitetos e programadores. As vistas são deste modo definidas da seguinte forma:

- Vista lógica: relativa aos aspetos do software visando responder aos desafios do negócio;
- Vista de processos: relativa ao fluxo de processos ou interações no sistema;
- Vista de desenvolvimento: relativa à organização do software no seu ambiente de desenvolvimento;
- Vista física: relativa ao mapeamento dos vários componentes do software em hardware, i.e. onde é executado o software;
- Vista de cenários: relativa à associação de processos de negócio com atores capazes de os espoletar.

O Modelo C4 [[Brown-2020]](References.md#Brown-2020)[[C4-2020]](References.md#C4-2020) defende a descrição do software através de quatro níveis de abstração: sistema, contentor, componente e código. Cada nível adota uma granularidade mais fina que o nível que o antecede, dando assim acesso a mais detalhe de uma parte mais pequena do sistema. Estes níveis podem ser equiparáveis a mapas, e.g. a vista de sistema corresponde ao globo, a vista de contentor corresponde ao mapa de cada continente, a vista de componentes ao mapa de cada país e a vista de código ao mapa de estradas e bairros de cada cidade.
Diferentes níveis permitem contar histórias diferentes a audiências distintas.

Os níveis encontram-se definidos da seguinte forma:
- Nível 1: Descrição (enquadramento) do sistema como um todo;
- Nível 2: Descrição de contentores do sistema;
- Nível 3: Descrição de componentes dos contentores;
- Nível 4: Descrição do código ou partes mais pequenas dos componentes (e como tal, não será abordado neste DAS/SAD).

Pode-se dizer que estes dois modelos se expandem ao longo de eixos distintos, sendo que o Modelo C4 apresenta o sistema com diferentes níveis de detalhe e o Modelo de Vista 4+1 apresenta o sistema de diferentes perspetivas. Ao combinar os dois modelos torna-se possível representar o sistema de diversas perspetivas, cada uma com vários níveis de detalhe.

Para modelar/representar visualmente, tanto o que foi implementado como as ideias e alternativas consideradas, recorre-se à Unified Modeling Language (UML) [[UML-2020]](References.md#UML-2020) [[UMLDiagrams-2020]](References.md#UMLDiagrams-2020).

## Modelo de Domínio
![Modelo](diagramas/nivel3/Modelo.png)


## Nível 1
### Vista Lógica

![N1-VL](diagramas/nivel1/N1-VL.png)

### Vista de Processos

#### SSD UC3
![N1-VP-UC3](diagramas/nivel1/N1-VP-UC3.png)

#### SSD UC4
![UC4 - LVL 1](diagramas/nivel1/UC4 - LVL1.jpg)

#### SSD UC5
![N1-VP-UC5](diagramas/nivel1/N1-VP-UC5.png)

#### SSD UC6
![N1-VP-UC6](diagramas/nivel1/N1-VP-UC6.jpg)

#### SSD UC7
![N1-VP-UC7](diagramas/nivel1/N1-VP-UC7.jpg)

#### SSD UC8
![UC8 - LVL 1](diagramas/nivel1/UC8 - LVL 1.jpg)

#### SSD UC9
![UC9 - LVL 1](diagramas/nivel1/UC9 - LVL 1.jpg)

#### SSD UC10
![N1-VP-UC10](diagramas/nivel1/N1-VP-UC10.png)

#### SSD UC11
![N1-VP-UC11](diagramas/nivel1/N1-VP-UC11.png)

#### SSD UC12
![N1-VP-UC12](diagramas/nivel1/N1-VP-UC12.png)

#### SSD UC13
![N1-VP-UC13](diagramas/nivel1/N1-VP-UC13.png)

#### SSD UC14
![N1-VP-UC14](diagramas/nivel1/N1-VP-UC14.jpg)

#### SSD UC16
![N1-VP-UC16](diagramas/nivel1/N1-VP-UC16.jpg)

#### SSD UC17
![UC17 - LVL 1](diagramas/nivel1/UC17 - LVL 1.jpg)

#### SSD UC18
![N1-VP-UC18](diagramas/nivel1/N1-VP-UC18.png)

#### SSD UC19
![N1-VP-UC19](diagramas/nivel1/N1-VP-UC19.jpg)

#### SSD UC20
![N1-VP-UC20](diagramas/nivel1/N1-VP-UC20.jpg)

#### SSD UC21
![UC21 - LVL 1](diagramas/nivel1/UC21 - LVL 1.jpg)

#### SSD UC22a
![N1-VP-UC22a](diagramas/nivel1/N1-VP-UC22a.png)

#### SSD UC22b
![N1-VP-UC22b](diagramas/nivel1/N1-VP-UC22b.png)

#### SSD UC23
![N1-VP-UC23](diagramas/nivel1/N1-VP-UC23.jpg)

#### SSD UC24
![N1-VP-UC24](diagramas/nivel1/N1-VP-UC24.jpg)

#### SSD UC25
![UC25 - LVL 1](diagramas/nivel1/UC25 - LVL 1.jpg)

#### SSD UC26
![UC26 - LVL 1](diagramas/nivel1/UC26 - LVL 1.jpg)

#### SSD UC27
![N1-VP-UC27](diagramas/nivel1/N1-VP-UC27.png)

#### SSD UC28
![N1-VP-UC28](diagramas/nivel1/N1-VP-UC28.jpg)

#### SSD UC33
![N1-VP-UC33](diagramas/nivel1/N1-VP-UC33.jpg)

#### SSD UC35
![UC35 - LVL 1](diagramas/nivel1/UC35 - LVL 1.jpg)

#### (outros SSD arquiteturalmente relevantes)
[...]

## Nível 2
### Vista Lógica

![N2-VL](diagramas/nivel2/N2-VL.png)

### Vista de Processos

#### SD UC3
![N2-VP-UC3](diagramas/nivel2/N2-VP-UC3.jpg)

#### SD UC4
![UC4 - LVL 2](diagramas/nivel2/UC4 - LVL 2.jpg)

#### SD UC5
![N2-VP-UC5](diagramas/nivel2/N2-VP-UC5.png)

#### SD UC6
![N2-VP-UC6](diagramas/nivel2/N2-VP-UC6.jpg)

#### SD UC7
![N2-VP-UC7](diagramas/nivel2/N2-VP-UC7.jpg)

#### SD UC8
![UC8 - LVL 2](diagramas/nivel2/UC8 - LVL 2.jpg)

#### SD UC9
![UC9 - LVL 2](diagramas/nivel2/UC9 - LVL 2.jpg)

#### SD UC10
![N2-VP-UC10](diagramas/nivel2/N2-VP-UC10.jpg)

#### SD UC11
![N2-VP-UC11](diagramas/nivel2/N2-VP-UC11.png)

#### SD UC12
![N2-VP-UC12](diagramas/nivel2/N2-VP-UC12.png)

#### SD UC13
![N2-VP-UC13](diagramas/nivel2/N2-VP-UC13.png)

#### SD UC14
![N2-VP-UC14](diagramas/nivel2/N2-VP-UC14.jpg)

#### SD UC16
![N2-VP-UC16](diagramas/nivel2/N2-VP-UC16.jpg)

#### SD UC17
![UC17 - LVL 2](diagramas/nivel2/UC17 - LVL 2.jpg)

#### SD UC18
![N2-VP-UC18](diagramas/nivel2/N2-VP-UC18.png)

#### SD UC19
![N2-VP-UC19](diagramas/nivel2/N2-VP-UC19.jpg)

#### SD UC20
![N2-VP-UC20](diagramas/nivel2/N2-VP-UC20.jpg)

#### SD UC21
![UC21 - LVL 2](diagramas/nivel2/UC21 - LVL 2.jpg)

#### SD UC22a
![N2-VP-UC22a](diagramas/nivel2/N2-VP-UC22a.png)

#### SD UC22b
![N2-VP-UC22b](diagramas/nivel2/N2-VP-UC22b.png)

#### SD UC23
![N2-VP-UC23](diagramas/nivel2/N2-VP-UC23.jpg)

#### SD UC24
![N2-VP-UC24](diagramas/nivel2/N2-VP-UC24.jpg)

#### SD UC25
![UC25 - LVL 2](diagramas/nivel2/UC25 - LVL 2.jpg)

#### SD UC26
![UC26 - LVL 2](diagramas/nivel2/UC26 - LVL 2.jpg)

#### SD UC27
![N2-VP-UC27](diagramas/nivel2/N2-VP-UC27.png)

#### SD UC28
![N2-VP-UC28](diagramas/nivel2/N2-VP-UC28.jpg)

#### SD UC33
![N2-VP-UC33](diagramas/nivel2/N2-VP-UC33.jpg)

#### SD UC35
![UC35 - LVL 2](diagramas/nivel2/UC35 - LVL 2.jpg)

#### SSD US13 (Porquê esta US?)
TBD

#### (outros SSD arquiteturalmente relevantes)
[...]

### Vista de Implementação
![N2-VL](diagramas/nivel2/N2-VI.png)

### Vista Física

Uma proposta muito simplificada. 
![N2-VL](diagramas/nivel2/N2-VF.png)

De facto, deve-se ter em consideração os requisitos não funcionais ["Physical Contraints"](Background.md#Physical_Constraints).

## Nível 3
### Vista de Processos

#### SD UC3
![N3-VP-UC3](diagramas/nivel3/N3-VP-UC3.jpg)

#### SD UC4
![UC4 - LVL 3](diagramas/nivel3/UC4 - LVL 3.jpg)

#### SD UC5
![N3-VP-UC5](diagramas/nivel3/N3-VP-UC5.png)

#### SD UC6
![N3-VP-UC6](diagramas/nivel3/N3-VP-UC6.jpg)

#### SD UC7
![N3-VP-UC7](diagramas/nivel3/N3-VP-UC7.jpg)

#### SD UC8
![UC8 - LVL 3](diagramas/nivel3/UC8 - LVL 3.jpg)

#### SD UC9
![UC9 - LVL 3](diagramas/nivel3/UC9 - LVL 3.jpg)

#### SD UC10
![N3-VP-UC10](diagramas/nivel3/N3-VP-UC10.jpg)

#### SD UC11
![N3-VP-UC11](diagramas/nivel3/N3-VP-UC11.png)

#### SD UC12
![N3-VP-UC12](diagramas/nivel3/N3-VP-UC12.png)

#### SD UC13
![N3-VP-UC13](diagramas/nivel3/N3-VP-UC13.png)

#### SD UC14
![N3-VP-UC14](diagramas/nivel3/N3-VP-UC14.jpg)

#### SD UC16
![N3-VP-UC16](diagramas/nivel3/N3-VP-UC16.jpg)

#### SD UC17
![UC17 - LVL 3](diagramas/nivel3/UC17 - LVL 3.jpg)

#### SD UC18
![N3-VP-UC18](diagramas/nivel3/N3-VP-UC18.png)

#### SD UC19
![N3-VP-UC19](diagramas/nivel3/N3-VP-UC19.jpg)

#### SD UC20
![N3-VP-UC20](diagramas/nivel3/N3-VP-UC20.jpg)

#### SD UC21
![UC21 - LVL 3](diagramas/nivel3/UC21 - LVL 3.jpg)

#### SD UC22a
![N3-VP-UC22a](diagramas/nivel3/N3-VP-UC22a.png)

#### SD UC22b
![N3-VP-UC22b](diagramas/nivel3/N3-VP-UC22b.png)

#### SD UC23
![N3-VP-UC23](diagramas/nivel3/N3-VP-UC23.jpg)

#### SD UC24
![N3-VP-UC24](diagramas/nivel3/N3-VP-UC24.jpg)

#### SD UC25
![UC25 - LVL 3](diagramas/nivel3/UC25 - LVL 3.jpg)

#### SD UC26
![UC26 - LVL 3](diagramas/nivel3/UC26 - LVL 3.jpg)

#### SD UC27
![N3-VP-UC27](diagramas/nivel3/N3-VP-UC27.png)

#### SD UC28
![N3-VP-UC28](diagramas/nivel3/N3-VP-UC28.jpg)

#### SD UC33
![N3-VP-UC33](diagramas/nivel3/N3-VP-UC33.jpg)

#### SD UC35
![UC35 - LVL 3](diagramas/nivel3/UC35 - LVL 3.jpg)


## Nível 3 (Site RS)
### Vista Lógica

Vista Lógica baseada numa arquitetura por camadas concêntricas (Onion):
![N3-VL-MDR-alt2](diagramas/nivel3/Site_RS/N3-VL-MDR-alt2.jpg)


### Vista de Implementação
![N3-VI-SiteRS](diagramas/nivel3/Site_RS/N3-VI-SiteRS.png)

### Vista Física
![N3-VF-SiteRS](diagramas/nivel3/Site_RS/N3-VF-SiteRS.png)


## Nível 3 (Visualização (UI))
### Vista Lógica
![N3-VL-UI](diagramas/nivel3/UI/N3-VL-UI.png)


### Vista de Implementação
![N3-VI-UI](diagramas/nivel3/UI/N3-VI-UI.png)


### Vista Física
![N3-VF-UI](diagramas/nivel3/UI/N3-VF-UI.png)


## Nível 3 (IA)
### Vista Lógica
![N3-VL-IA](diagramas/nivel3/IA/N3-VL-IA.png)


### Vista de Implementação
![N3-VI-IA](diagramas/nivel3/IA/N3-VI-IA.png)


### Vista Física
![N3-VF-IA](diagramas/nivel3/IA/N3-VF-IA.png)


## Nível 3 (Master Data Posts)
### Vista Lógica
![N3-VL-Posts](diagramas/nivel3/Posts/N3-VL-Posts.png)


### Vista de Implementação
![N3-VI-Posts](diagramas/nivel3/Posts/N3-VI-Posts.png)

### Vista Física
![N3-VF-Posts](diagramas/nivel3/Posts/N3-VF-Posts.png)
