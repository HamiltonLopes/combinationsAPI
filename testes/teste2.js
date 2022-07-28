import mergeSort from "../src/app/services/MergeSort.js";

var obj = {
    "camisaBrancaId": {
        combinations: [
            { "6": "boneVerde" },
            { "5": "calcaJeans" },
            { "10": "caneta" },
            { "15": "lapis" }
        ]
    }
}
var subItem = "colarAzul";
const NUMBER_OF_COMBINATIONS = 3;

var item = 'camisaBrancaId';
let topCombinations = [ ];

const addTopCombination = (obj) =>{
    let addIndex = -1;
    for(let j= 0; j < topCombinations.length; j++){
        if(((+Object.values(Object.values(topCombinations[j])[0])[0] < +Object.keys(Object.values(obj)[0])[0]) && addIndex === -1)
            || ( (j === (topCombinations.length - 1)) && (+Object.values(Object.values(topCombinations[j])[0])[0] === +Object.keys(Object.values(obj)[0])[0]) && addIndex === -1)){
            addIndex = j;
        }
        if((Object.keys(obj)[0] === Object.keys(topCombinations[j])[0]) && (Object.values(Object.values(obj)[0])[0] === Object.keys(Object.values(topCombinations[j])[0])[0])){
            const newAparritionsValue = +Object.keys(Object.values(obj)[0])[0] + +Object.values(Object.values(topCombinations[j])[0])[0];
            topCombinations.splice(j,1);

            //return addTopCombination({[Object.keys(obj)[0]]:{[newAparritionsValue] : Object.values(Object.values(obj)[0])[0]}});
            return topCombinations.splice(j, 0, {[Object.keys(obj)[0]]:{[Object.values(Object.values(obj)[0])[0]] : newAparritionsValue}});
        }
    }
    for(const combKey of topCombinations){
        if(Object.keys(combKey)[0] === Object.values(Object.values(obj)[0])[0]){
            if(Object.keys(Object.values(combKey)[0])[0] === Object.keys(obj)[0]){
                return null;
            }
        }
    }
    if(addIndex !== -1){ 
        if(topCombinations.length === NUMBER_OF_COMBINATIONS) topCombinations.splice((NUMBER_OF_COMBINATIONS-1),1);
        return topCombinations.splice(addIndex, 0, {[Object.keys(obj)[0]]:{[Object.values(Object.values(obj)[0])[0]] : +Object.keys(Object.values(obj)[0])[0]}});
    }else if(topCombinations.length < NUMBER_OF_COMBINATIONS){
        return topCombinations.push({[Object.keys(obj)[0]]:{[Object.values(Object.values(obj)[0])[0]] : +Object.keys(Object.values(obj)[0])[0]}});
    }
};

let isInserted = false;
for (let i = 0; i < obj[item].combinations.length; i++) {
    if (Object.values(obj[item].combinations[i])[0] === subItem) {
        const newAparritionsValue = +Object.keys(obj[item].combinations[i])[0] + 1;
        console.log({[item]: {[subItem]: newAparritionsValue}});
        addTopCombination({[item]: {[subItem]: newAparritionsValue}});
        obj[item].combinations.push({
            [newAparritionsValue]: subItem
        });
        obj[item].combinations.splice(i, 1);
        obj[item].combinations = mergeSort(obj[item].combinations);
        isInserted = true;

        break;
    }
}
if(!isInserted){
    obj[item].combinations.push({
        [1]: subItem
    });
    addTopCombination({[item]: {'1': [subItem]}});
}

obj[item].combinations = mergeSort(obj[item].combinations);

console.log(obj[item]);
console.log(topCombinations);
var obej = {"camisa":{"1":"bone"}};
var obej2 = {"camisa":{"1":"tenis"}};
var obej3 = {"camisa":{"1":"sacola"}};
addTopCombination(obej);
addTopCombination(obej);
addTopCombination(obej);
addTopCombination(obej2);
addTopCombination(obej2);
addTopCombination(obej2);
addTopCombination(obej3);
addTopCombination(obej3);
addTopCombination(obej3);
console.log(topCombinations);
addTopCombination(obej3);
console.log(topCombinations);
addTopCombination({"camisa":{"3":"paco"}});
addTopCombination({"camisa":{"1":"paco"}});
addTopCombination({"camisa":{"1":"paco"}});
addTopCombination({"camisa":{"1":"paco"}});
addTopCombination({"camisa":{"1":"paco"}});
console.log(topCombinations);
addTopCombination({"paco":{"7":"camisa"}});
console.log(topCombinations);






