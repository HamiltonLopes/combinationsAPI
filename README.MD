### **<h1 align="center">CombinationsAPI</h1>**


## 💻 Sobre a API

API desenvolvida para uso no desafio final no HiringCoders#3 Gama Academy VTEX.

Essa API utiliza de duas estruturas de dados complexas para armazenamento de combinações de produtos
de vendas, onde em uma delas se encontra as melhores combinações de venda de produtos de toda a loja e
a outra as melhores combinações de venda por produto, feitas para alimentar alguns componentes em VtexIO.

Básicamente a API espera um request do [OrderHook](https://developers.vtex.com/vtex-rest-api/reference/gethookconfiguration) da vtex e a partir
do Id do pedido que é enviado, ela mapeia todas as combinações de itens geradas naquele pedido (se o pedido tiver mais de um item comprado), e 
utiliza de sua lógica para armazenar nas estruturas de dados as combinações. Somando uma naquelas que já aconteceram anteriormente ou criando um
novo registro das que ocorreram pela primeira vez. Neste mesmo momento é recalculado todas as combinações para saber se alguma das combinações
inseridas nesta requisição entraram para as melhores combinações da loja. Após todo o funcionamento é armazenado as estruturas de dados no banco
de dados NoSQL da Vtex, o MasterData.

**explicar funcionamento das outras lógicas/endpoints da api**
## Estrutura de dados

*colocar fotos dos diagramas das estuturas de dados que o jean fez*

## Architecture Project 
<img src="https://github.com/JeanFragaJS/combinationsAPI-1/blob/master/assets/architecture-vtex-final-challenge.png?raw=true"  width="540" height="506"  />

## Documentação
Foi feita uma documentação completa no swagger:

![swagger](https://user-images.githubusercontent.com/9729963/183329121-24ea7927-cd0e-4ace-9092-09adc00ad4fa.jpg)

*colocar mais fotos sobre a documentação no swagger*
*atualizar aws com o endpoint de /docs e informar aqui o endpoint gerado para consumo da doc*



## Team 
  * [Jean Fraga](https://www.linkedin.com/in/jean-fraga/)
  * [Hamilton Lopes](https://www.linkedin.com/in/hamilton-lopes/)
  * [Gustavo Sobreiro](https://www.linkedin.com/in/gustavo-sobreiro-de-assis/)
  * [Hamiceis Pereira](https://www.linkedin.com/in/hamiceis-pereira/)
  * [Beatriz Cunha Guimarães](https://www.linkedin.com/in/mbeatrizcg/)
  * [Derek Santos](https://www.linkedin.com/in/derekcsantos/)
  * [Marco Antonio](https://www.linkedin.com/in/marco-antonio-pereira-esteves-005185113/)
  * [Renato Tadeu](https://www.linkedin.com/in/renato-tadeu)
  * [Henrique Scherer](https://www.linkedin.com/in/henrique-scherer/)
  * [Gustavo Rogerio](https://www.linkedin.com/in/fabio-rogerio-234b65223/)
