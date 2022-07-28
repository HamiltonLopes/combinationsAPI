const products = ["item1", "item2", "item3", "item4", "item5", "item6"];
const pedido1 = { products: ["item1", "item2"] };
const pedido2 = { products: ["item1", "item4", "item6"] };
const pedido3 = { products: ["item1", "item6", "item2", "item5"] };
const pedido4 = { products: ["item6", "item2", "item5"] }; 
const pedido5 = { products: ["item2", "item4", "item1", "item3"] };
const pedido6 = { products: ["item2", "item4", "item1", "item3", "item5"] };
const pedido7 = { products: ["item6", "item1", "item4"] }; 
const pedido8 = { products: ["item3", "item4", "item1"] }; 
const pedido9 = { products: ["item6", "item4", "item5", "item1"] };
const pedido10 = { products: ["item4", "item6"] };
const pedido11 = { products: ["item4", "item6"] };
const pedido12 = { products: ["item4", "item6"] };
const orders = [pedido1, pedido2, pedido3, pedido4, pedido5, pedido6, pedido7, pedido8, pedido9, pedido10, pedido11, pedido12];
var combinations = {}; 
const NUMBER_OF_COMBINATIONS = 3;


for (const item of products) {
    for (const pedido of orders) {
        if (pedido.products.includes(item)) {
            for (const subItems of pedido.products) { 
                if (subItems !== item) { 
                    combinations = { 
                        ...combinations, 
                        [item]: { 
                            ...combinations[item],
                             [subItems]: 
                                (!!combinations[item] ? 
                                    (!!combinations[item][subItems] ? combinations[item][subItems] + 1 : 1) 
                                    : 1) 
                        } 
                    }; 
                } 
            }
        }
    }
}

// combinations = { 
//     ...combinations, 
//     [item]: { 
//         ...combinations[item],
//         "combinations": [
//             {[qtd]:[subItem]},
//             {[qtd]:[subItem]},
//             {[qtd]:[subItem]},
//             {[qtd]:[subItem]}
//          ]
         
//     } 
// };


console.log(combinations);
var topCombinations = [];
const getApparitions = (index) => {
    return topCombinations[index][Object.getOwnPropertyNames(topCombinations[index])][Object.getOwnPropertyNames(topCombinations[index][Object.getOwnPropertyNames(topCombinations[index])])];
}

const changePosition = (from,to) => {
    return topCombinations.splice(to, 0, topCombinations.splice(from, 1)[0]);
}

for (const item of products) { 
    if (!!combinations[item]) { 
        for (const subItem of products) { 
            if (!!combinations[item][subItem] && (!topCombinations[NUMBER_OF_COMBINATIONS - 1] 
                    || combinations[item][subItem] >= getApparitions(NUMBER_OF_COMBINATIONS - 1))) { 
                for(let i = 0; i < NUMBER_OF_COMBINATIONS; i++){
                    if (!topCombinations[i] || combinations[item][subItem] >= getApparitions(i)) {
                        if(topCombinations[i] && Object.getOwnPropertyNames(topCombinations[i])[0] === subItem) break;

                        if( i !== NUMBER_OF_COMBINATIONS-1){
                            topCombinations.push({
                                [item]: { 
                                    [subItem]: combinations[item][subItem] 
                                } 
                            });
                            changePosition(topCombinations.length-1,i);
                            if(topCombinations.length > NUMBER_OF_COMBINATIONS) topCombinations.splice(-1);
                            break;     
                        } else {
                            topCombinations[i] = {
                                [item]: { 
                                   [subItem]: combinations[item][subItem] 
                               } 
                            };
                        }
                    }     
                }
            } 
        } 
    } 
}

console.log(topCombinations);
