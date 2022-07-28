import mergeSort from "./app/services/MergeSort.js";

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
var subItem = "boneVerde";

var item = 'camisaBrancaId';

for (const i = 0; i < obj[item].combinations.length; i++) {
    if (Object.values(obj[item].combinations[i])[0] === subItem) {
        obj[item].combinations.push({
            [+Object.keys(obj[item].combinations[i])[0] + 1]: subItem
        });
        obj[item].combinations.splice(i, 1);
        obj[item].combinations = mergeSort(obj[item].combinations);
        break;
    }
}

console.log(obj[item].combinations[0],obj[item].combinations[1],obj[item].combinations[2]);
