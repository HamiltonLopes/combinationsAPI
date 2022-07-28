const { produto, pedidos } = require('./test-fixture-data')

function combinações (produto, pedidos) {
  /*
    obj: abrigar o item e o numero de vezes que ele aparece com um dado produto
  */
  let obj = {}

  /*
    pedidoDireita | pedidoEsquerda: Abrigar items de pedidos que vem da esquerda e da direita do array
  */
  let pedidoDireita, pedidoEsquerda

  /*
    PONTEIROS 
    left : Percorre do início até a metade do array  de pedidos 
    right: Percorre da metade até o final do array de pedidos  
  */
  let left = 0
  let right = Math.floor(pedidos.length / 2 + 1)

  /*
    Abrigar quantidade de pedidos sem o produto 
  */
  let pedidosSemProduto = 0

  /*
    While 1
  */

  while (left < right ) { 
    pedidoEsquerda = pedidos[left].items

    if ( !pedidoEsquerda.includes(produto) ) { // Verifica se o Array de item tem o produto a ser combinado
      pedidosSemProduto += 1                   // Caso sim, incrementa a variável de pedidos sem o produto
      left += 1                                // E avança com o ponteiro 

    } else {
      pedidoEsquerda.map(item => {             // Percorre o array de items  
        //console.log(item)                    // Caso o item não seja o produto a ser combinado    
        if(item !== produto)                   // Adiciona o item como propriedade com um valor numério ao obj 
          obj[item] = (obj[item] || 0) +1      // Verifica se a propriedade existe no obj, se sim incremeta, se não permanece com o valor

      });
      
      left += 1;                               // Depois das intruções de map() o o ponteiro avança
    }

  }

  /*
    While 2 as instruções do while 1 se repetem no while 2
  */

  while (right < pedidos.length ) {
    pedidoDireita = pedidos[right].items

    if ( !pedidoDireita.includes(produto) ) {
      pedidosSemProduto += 1
      right += 1;

    } else {
      pedidoDireita.map(item => { 
        if(item !== produto)
          obj[item] = (obj[item] || 0) +1
        });

      right += 1;
    }

  }
   
//console.log("Objeto: " + JSON.stringify({itemDeCombinação: produto, ...obj, totalPedidos: pedidos.length , pedidosSemProduto: pedidosSemProduto})) 

  const compositeData = { 
    itemDeCombinação: produto, 
    totalPedidos: pedidos.length , 
    pedidosSemProduto: pedidosSemProduto,
    ...obj, 
  }

  return  compositeData;
}


combinações(produto, pedidos)

/*

  RETORNO {
    itemDeCombinação: "camisa",
    calça: 7,
    bone: 2,
    regata: 1,
    chinelo: 1,
    sandália: 1,
    cordão: 7,
    totalPedidos: 9,
    pedidosSemProduto: 2
  }

*/