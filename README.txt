
Criei um pequeno projeto em ASP.NET Core 2.2 API para demonstrar como usar/aplicar (alguns conceitos de) DDD nesta tecnologia e usando também Entity Framework.

Este exemplo compreende:
- um dominio com 2 aggregate roots (Category e Product);
- um relacionamento de N <— 1 entre Category e Product;
- clara separação entre (i) API REST, (ii) Domínio e (iii) Infraestrutura (Persistência);
- aplicação de algumas regras de negócio/validação.

O dominio contempla as Entidade do negócio, os Serviços (ou casos de uso) envolvendo essas entidades e DTOs (in/out para os serviços de dominio).
Por simplicidade, empacotei fisicamente (packages) estas coisas por agregado.
Como é óbvio, outras alternativas de empacotamento são aceitáveis e (se calhar) desejáveis.

Também reconheço que podem ser introduzidas algumas melhorias interessantes com relativamente pouco esforço (mas de momento não tenho tempo).

O projeto está disponível e partilhado convosco em https://bitbucket.org/pafomaio/dddsample1 (todos devem ter permissão de escrita no mesmo).

Está/estejam à vontade para incluir as vossas contribuições.
