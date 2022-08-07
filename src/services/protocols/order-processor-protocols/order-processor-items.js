import { addTopCombination } from './add-top-combinations.js'
import mergeSort from "./merge-sort.js";


export const orderProcessorItems = async (items, combinations, topCombinations) => {
  if (items.length > 1) {
    for (const item of items) { //percorre os items do pedido recebido (a partir daqui itemPrincipal)
        if (!combinations[item.productId]) { //verifica se já existe combinações com o itemPrincipal
            combinations = { //se não existir, criar o objeto para inserir as combinacoes.
                ...combinations,
                [item.productId]: {
                    "combinations": []
                }
            }
        }
        for (const subItem of items) { //percorre novamente os items(a partir daqui subItem) do pedido para formar as combinações, para cada item ele deve combinar com todos os outros do pedido
            if (subItem.productId !== item.productId) { //verifica se o subItem a ser combinado não é o mesmo itemPrincipal
                let isInserted = false; //variavel para saber se a combinacao existe e foi acrescentada uma aparição
                for (let i = 0; i < combinations[item.productId].combinations.length; i++) { //percorre a lista de combinações do itemPrincipal
                    if (Object.values(combinations[item.productId].combinations[i])[0] === subItem.productId) { //verifica se existe a combinação do ItemPrincipal com o subItem
                        const newApparitionsValue = +Object.keys(combinations[item.productId].combinations[i])[0] + 1;
                        combinations[item.productId].combinations.push({  //se existir adiciona + 1 no número de aparições da combinação e insere no vetor de combinações
                            [newApparitionsValue]: subItem.productId
                        });
                        addTopCombination({ [item.productId]: { [newApparitionsValue]: subItem.productId } }, topCombinations); // adiciona a combinação nos tops, somando quando ela já existir ou verificando se a nova soma é superior
                        combinations[item.productId].combinations.splice(i, 1); //remove o número de combinações antigas(do itemPrincipal com o subItem) do vetor de combinações
                        combinations[item.productId].combinations = mergeSort(combinations[item.productId].combinations); //Ordena novamente as combinações para a primeira combinação sempre ser a com maior número de aparições
                        isInserted = true; //informa que foi acrescentado uma aparição 
                        break;
                    }
                }
                if (!isInserted) {
                    combinations[item.productId].combinations.push({  //se a combinacao não existir, insere ela no fim da lista com valor de uma aparição
                        ["1"]: subItem.id
                    });
                    addTopCombination({ [item.productId]: { ["1"]: subItem.productId } }, topCombinations); //tenta adicionar no array de melhoes combinacoes
                }
            }
        }
    }
  }
};