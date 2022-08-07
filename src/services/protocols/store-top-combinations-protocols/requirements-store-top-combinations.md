# Store Top Combinations Logic 
 ### Input [ Array de Objetos ]
```javascript
 const topCombinationsStub = [
  {"4": {"7":39} }, 
  {"3": {"2":39} },
  {"89": {"9":39} },
  {"10": {"6":12} },
  {"2": {"8":12} },
  {"104": {"30":8} },
  {"80": {"15":8} },
  {"55": {"59":8} },
  {"3": {"104":4} }
]
```

### Output [ Objeto com propriedades enumeradas ]
```javascript
const topN = {
  "1":[{"4":"7"},{"3":"2"},{"89":"9"}],
  "2":[{"10":"6"},{"2":"8"}],
  "3":[{"104":"30"},{"80":"15"},{"55":"59"}],
  "4":[{"3":"104"}]
  }
``` 

- ✅ verificar se o input é um array e se não está vazio
##### Verificações 
- **Caso 1 - apenas um elemento no array**
      - push nas chaves interna e externa para o array do obj que armazena os valores
- **Caso 2 - mais de um elemento no array**
  - ✅ Acessar os values das keys dos objetos
  ❓ **Como fazer isso ?**
  - ✅ percorrer com `for()` os elementos do array inputado
  - ✅ usar Object.keys() para capturar chaves e valores
    - `let outKey = Object.keys(topCombinationsStub[0])[0] // 4`
    - `let inKey = Object.keys(topCombinationsStub[0][outKey][0] //7`
    - `let qtyValue = Object.values(topCombinationsStub[0][outKey])[0] //39`
  - **Caso 2.1 - chaves iguais**
    - Final do array ? 
      - Sim: push nas chaves interna e externa correspondentes aos elementos esquerda e direita do array. 
      - Não: push nas chaves interna e externa do obj correspondente ao elemento esquerda do array e incrementar índice
  - **Caso 2.2 - chaves diferentes** 
    - Final do array ?
      - Não: 
      - push nas chaves interna e externa do obj correspondente ao elemento esquerda do array
      - incrementa índice do array percorrido
      - incrementar chave do obj que armazena os valores 
      - Sim: 
        - push nas chaves internas correspondentes ao elemento esquerda do array.
        - incrementar chave do obj que armazena os valores 
  




