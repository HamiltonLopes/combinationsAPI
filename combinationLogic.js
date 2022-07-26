var products = ["item1", "item2", "item3", "item4", "item5", "item6"] 
var pedido1 = { products: ["item1", "item2"] } 
var pedido2 = { products: ["item1", "item4"] } 
var pedido3 = { products: ["item1", "item6", "item2", "item5"] } 
var pedido4 = { products: ["item6", "item2", "item5"] } 
var pedido5 = { products: ["item2", "item4", "item1", "item3"] } 
var pedido6 = { products: ["item2", "item4", "item1", "item3", "item5"] } 
var pedido7 = { products: ["item6", "item1", "item5"] } 
var pedido8 = { products: ["item3", "item4", "item1"] } 
var pedido9 = { products: ["item6", "item4", "item5", "item1"] } 
var orders = [pedido1, pedido2, pedido3, pedido4, pedido5, pedido6, pedido7, pedido8, pedido9] 
var combinations = {} 

for (const item of products) {
    for (const pedido of orders) {
        if (pedido.products.includes(item)) {
            for (const subItems of pedido.products) { 
                if (subItems !== item) { 
                    combinations = { 
                        ...combinations, 
                        [item]: { 
                            ...combinations[item],
                             [subItems]: (!!combinations[item] ? (!!combinations[item][subItems] ? combinations[item][subItems] + 1 : 1) : 1) 
                        } 
                    } 
                } 
            }
        }
    }
}

var topCombinations = []
var getApparitions = (index) => {
    return topCombinations[index][Object.getOwnPropertyNames(topCombinations[index])][Object.getOwnPropertyNames(topCombinations[index][Object.getOwnPropertyNames(topCombinations[index])])];
}

var changePosition = (from,to) => {
    return topCombinations.splice(to, 0, topCombinations.splice(from, 1)[0]);
}

for (const item of products) { 
    if (!!combinations[item]) { 
        for (const subItem of products) { 
            if (!!combinations[item][subItem] && (!topCombinations[2] || combinations[item][subItem] >= getApparitions(2))) { 
                if (!topCombinations[0] || combinations[item][subItem] >= getApparitions(0)) { 
                    topCombinations.push({
                        [item]: { 
                           [subItem]: combinations[item][subItem] 
                       } 
                    });
                    changePosition(topCombinations.length-1,0); 
                } else if (!topCombinations[1] || combinations[item][subItem] >= getApparitions(1)) { 
                    topCombinations.push({
                        [item]: { 
                           [subItem]: combinations[item][subItem] 
                       } 
                    });
                    changePosition(topCombinations.length-1,1);
                } else { 
                    topCombinations[2] = { 
                        [item]: { 
                            [subItem]: combinations[item][subItem] 
                        } 
                    } 
                }
            } 
        } 
    } 
}

console.log(topCombinations);

