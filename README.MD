### **<h1 align="center">CombinationsAPI</h1>**

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


## 💻 Sobre a API

API desenvolvida para uso no desafio final no HiringCoders#3 Gama Academy VTEX.

Essa API utiliza duas estruturas de dados complexas para armazenamento de combinações de produtos
de vendas, onde em uma delas se encontram as melhores combinações de venda de produtos de toda a loja e
a outra as melhores combinações de venda por produto, feitas para alimentar alguns componentes em VtexIO.

Básicamente a API espera um request do [OrderHook](https://developers.vtex.com/vtex-rest-api/reference/gethookconfiguration) da vtex e a partir
do Id do pedido que é enviado, ela mapeia todas as combinações de itens geradas naquele pedido (se o pedido tiver mais de um item comprado), e 
utiliza a sua lógica para armazenar nas estruturas de dados as combinações. Somando uma naquelas que já aconteceram anteriormente ou criando um
novo registro das que ocorreram pela primeira vez. Neste mesmo momento é recalculado todas as combinações para saber se alguma das combinações
inseridas nesta requisição entraram para as melhores combinações da loja. Após todo o funcionamento são armazenadas as estruturas de dados no banco
de dados NoSQL da Vtex, o MasterData.

Para retornar as melhores combinações da loja por meio da rota `/store-top-combinations` 
a API implementa algoritmos de padrões de contagem para eliminar valores duplicados e 
elencar chaves numéricamente ordenadas com um array de objetos das combinações na propriedade `topStore`. 
A API tbm retorna a propriedade `qty: {}` que contém o número de vezes que as combinações foram feitas em cada top.

### **Example**

As combinações no top 1 aconteceram 39 vezes, no top2 as combinações aconteceram 12 vezes. Esses números servem para ajudar o lojista 
na tomada de decisões ao classificar os produtos com  alta performance que geram lucro com pouco investimento; produtos de alta performance que geram lucro com 
muito investimento; produtos que  tem grande investimento e geram pouca receita - geralmente são os lançamentos; e os produtos de baixa performance que devem ser analisados para serem promovidos ou  realocados.
<img src="https://raw.githubusercontent.com/HamiltonLopes/combinationsAPI/master/assets/store-top-explain.png"  width="1000" height="600"  />

##  Rotas 

### Base-URL: https://hccombinationsapi.tk/combinations-api/v1

### Route | order-processor
![order-processor](http://g.recordit.co/wFzktrh9Bq.gif)


### Route | combinations-by-id/:productId
![combinations-by-id/:productId](http://g.recordit.co/p3iJnHwXuc.gif)


### Route | store-top-combinations
![store-top-combinations](http://g.recordit.co/IDzEuRDv6R.gif)

### Route | raw-top-combinations
![raw-top-combinations](http://g.recordit.co/jPlSlA1e3p.gif)


## Arquitetura
<img src="https://github.com/JeanFragaJS/combinationsAPI-1/blob/master/assets/architecture-vtex-final-challenge.png?raw=true"  width="540" height="506"  />

## Estrutura de dados
![db-schema](https://github.com/HamiltonLopes/combinationsAPI/blob/master/assets/db-schema.png?raw=true)

## Documentação
**Documentação completa no swagger:** [Link](https://hccombinationsapi.tk/combinations-api/v1/docs)

![swagger](http://g.recordit.co/TtFeNeuGVy.gif)




