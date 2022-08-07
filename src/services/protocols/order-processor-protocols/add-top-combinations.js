
export const addTopCombination = (obj, topCombinations, topCombinationsNumber = 3) => { //método para atualizar o vetor de melhores combinacoes
  const NUMBER_OF_TOP_COMBINATIONS = topCombinationsNumber
  console.log("tentaram add o obj = ",obj);
  let addIndex = -1;
  for (let j = 0; j < topCombinations.length; j++) {
      if (((+Object.values(Object.values(topCombinations[j])[0])[0] < +Object.keys(Object.values(obj)[0])[0]) && addIndex === -1)
          || ((j === (topCombinations.length - 1)) && (+Object.values(Object.values(topCombinations[j])[0])[0] === +Object.keys(Object.values(obj)[0])[0]) && addIndex === -1)) {
          addIndex = j;
      }
      if ((Object.keys(obj)[0] === Object.keys(topCombinations[j])[0]) && (Object.values(Object.values(obj)[0])[0] === Object.keys(Object.values(topCombinations[j])[0])[0])) {
          //const newAparritionsValue = +Object.keys(Object.values(obj)[0])[0] + +Object.values(Object.values(topCombinations[j])[0])[0];
          topCombinations.splice(j, 1);
          //return addTopCombination({[Object.keys(obj)[0]]:{[+newAparritionsValue] : Object.values(Object.values(obj)[0])[0]}});
          return topCombinations.splice(j, 0, {[Object.keys(obj)[0]]:{[+Object.values(Object.values(obj)[0])[0]] : +Object.keys(Object.values(obj)[0])[0]}});
      }
  }
  for(const combKey of topCombinations){
      if(+Object.keys(combKey)[0] === +Object.values(Object.values(obj)[0])[0]){
          if(+Object.keys(Object.values(combKey)[0])[0] === +Object.keys(obj)[0]){
              return null;
          }
      }
  }
  if (addIndex !== -1) {
      if (topCombinations.length === NUMBER_OF_TOP_COMBINATIONS) topCombinations.splice((NUMBER_OF_TOP_COMBINATIONS - 1), 1);
      return topCombinations.splice(addIndex, 0, { [Object.keys(obj)[0]]: { [Object.values(Object.values(obj)[0])[0]]: +Object.keys(Object.values(obj)[0])[0] } });
  } else if (topCombinations.length < NUMBER_OF_TOP_COMBINATIONS) {
      return topCombinations.push({ [Object.keys(obj)[0]]: { [Object.values(Object.values(obj)[0])[0]]: +Object.keys(Object.values(obj)[0])[0] } });
  }
};