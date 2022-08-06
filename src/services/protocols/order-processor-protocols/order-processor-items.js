import { addTopCombination } from './add-top-combinations.js'
import mergeSort from "./merge-sort.js";


export const orderProcessorItems = async (items, combinations, topCombinations) => {
  if (items.length > 1) {
    for (const item of items) { //percorre os items do pedido recebido (a partir daqui itemPrincipal)
        if (!combinations[item.id]) { //verifica se já existe combinações com o itemPrincipal
            combinations = { //se não existir, criar o objeto para inserir as combinacoes.
                ...combinations,
                [item.id]: {
                    "combinations": []
                }
            }
        }
        for (const subItem of items) { //percorre novamente os items(a partir daqui subItem) do pedido para formar as combinações, para cada item ele deve combinar com todos os outros do pedido
            if (subItem.id !== item.id) { //verifica se o subItem a ser combinado não é o mesmo itemPrincipal
                let isInserted = false; //variavel para saber se a combinacao existe e foi acrescentada uma aparição
                for (let i = 0; i < combinations[item.id].combinations.length; i++) { //percorre a lista de combinações do itemPrincipal
                    if (Object.values(combinations[item.id].combinations[i])[0] === subItem.id) { //verifica se existe a combinação do ItemPrincipal com o subItem
                        const newApparitionsValue = +Object.keys(combinations[item.id].combinations[i])[0] + 1;
                        combinations[item.id].combinations.push({  //se existir adiciona + 1 no número de aparições da combinação e insere no vetor de combinações
                            [newApparitionsValue]: subItem.id
                        });
                        addTopCombination({ [item.id]: { [newApparitionsValue]: subItem.id } }, topCombinations); // adiciona a combinação nos tops, somando quando ela já existir ou verificando se a nova soma é superior
                        combinations[item.id].combinations.splice(i, 1); //remove o número de combinações antigas(do itemPrincipal com o subItem) do vetor de combinações
                        combinations[item.id].combinations = mergeSort(combinations[item.id].combinations); //Ordena novamente as combinações para a primeira combinação sempre ser a com maior número de aparições
                        isInserted = true; //informa que foi acrescentado uma aparição 
                        break;
                    }
                }
                if (!isInserted) {
                    combinations[item.id].combinations.push({  //se a combinacao não existir, insere ela no fim da lista com valor de uma aparição
                        ["1"]: subItem.id
                    });
                    addTopCombination({ [item.id]: { ["1"]: subItem.id } }, topCombinations); //tenta adicionar no array de melhoes combinacoes
                }
            }
        }
    }
  }
};