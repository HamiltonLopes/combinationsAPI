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

var item = 'camisaBrancaId';
let topCombinations = [ {"camisa":{"calca":2}}, {"camisa":{"shorts":1}},{"camisa":{"bone":1}}];

const addTopCombination = (obj) =>{
    let addIndex = -1;
    for(let j= 0; j < topCombinations.length; j++){
        if(((+Object.values(Object.values(topCombinations[j])[0])[0] < +Object.keys(Object.values(obj)[0])[0]) && addIndex === -1)
            || ( (j === (topCombinations.length - 1)) && (+Object.values(Object.values(topCombinations[j])[0])[0] === +Object.keys(Object.values(obj)[0])[0]) && addIndex === -1)){
            addIndex = j;
        }
        if((Object.keys(obj)[0] === Object.keys(topCombinations[j])[0]) && (Object.values(Object.values(obj)[0])[0] === Object.keys(Object.values(topCombinations[j])[0])[0])){
            topCombinations.splice(j,1);
        }
    }
    console.log(addIndex)
    if(addIndex !== -1) topCombinations.splice(addIndex, 0, {[Object.keys(obj)[0]]:{
        [Object.values(Object.values(obj)[0])[0]] : +Object.keys(Object.values(obj)[0])[0]
    }});
};

let isInserted = false;
for (let i = 0; i < obj[item].combinations.length; i++) {
    if (Object.values(obj[item].combinations[i])[0] === subItem) {
        obj[item].combinations.push({
            [+Object.keys(obj[item].combinations[i])[0] + 1]: subItem
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
}

obj[item].combinations = mergeSort(obj[item].combinations);

console.log(obj[item].combinations);
console.log(topCombinations);
var obej = {"camisa":{"2":"bone"}};
addTopCombination(obej);
console.log(topCombinations);





