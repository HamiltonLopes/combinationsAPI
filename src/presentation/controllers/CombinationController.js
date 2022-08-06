import axios from 'axios';
import mergeSort from '../../services/protocols/MergeSort.js';
export default new class CombinationController {

    async store(req, res) {  //Método para receber hook config + Criar combinação de acordo com o pedido recebido
        const { OrderId, State, hookConfig } = req.body;
        if (hookConfig) //se possuir a variavel configuração, significa que o request foi somente de configuração
            return res.status(200).json({ "Config": "Successful" }); //retorna um status 200 para informar que a configuração foi bem sucedida

        if (!State) //verifica se a váriavel estado foi passada no body da requisição
            return res.status(400).json({ "error": "Bad Request" }); //envia um erro informando requisição inválida

        const { data :{items}} = await axios.get(`https://${process.env.ACCOUNT_NAME}.${process.env.ENVIROMENT}.com/api/oms/pvt/orders/${OrderId}`,
            { headers: { "X-VTEX-API-AppKey": process.env.X_VTEX_API_APP_KEY, "X-VTEX-API-AppToken": process.env.X_VTEX_API_APP_TOKEN } }); //getOrderById captura informação do pedido pelo número do pedido
        const NUMBER_OF_TOP_COMBINATIONS = 3; //pegar do masterdata também?
        let { data :{combinations, topCombinations} } = await axios.get(`https://${process.env.ACCOUNT_NAME}.${process.env.ENVIROMENT}.com/api/dataentities/${process.env.DATA_ENTITY_NAME}/documents/${process.env.MASTERDATA_DOCUMENT_ID}?_fields=combinations,topCombinations`,
            { headers: { "X-VTEX-API-AppKey": process.env.X_VTEX_API_APP_KEY, "X-VTEX-API-AppToken": process.env.X_VTEX_API_APP_TOKEN } });; //MasterDataget

        const addTopCombination = (obj) => { //método para atualizar o vetor de melhores combinacoes
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
                                addTopCombination({ [item.productId]: { [newApparitionsValue]: subItem.productId } }); // adiciona a combinação nos tops, somando quando ela já existir ou verificando se a nova soma é superior
                                combinations[item.productId].combinations.splice(i, 1); //remove o número de combinações antigas(do itemPrincipal com o subItem) do vetor de combinações
                                combinations[item.productId].combinations = mergeSort(combinations[item.productId].combinations); //Ordena novamente as combinações para a primeira combinação sempre ser a com maior número de aparições
                                isInserted = true; //informa que foi acrescentado uma aparição 
                                break;
                            }
                        }
                        if (!isInserted) {
                            combinations[item.productId].combinations.push({  //se a combinacao não existir, insere ela no fim da lista com valor de uma aparição
                                ["1"]: subItem.productId
                            });
                            addTopCombination({ [item.productId]: { ["1"]: subItem.productId } }); //tenta adicionar no array de melhoes combinacoes
                        }
                    }
                }
            }
        }

        //Fazendo update no masterdata
        let responseUpdate = await axios.patch(`https://${process.env.ACCOUNT_NAME}.${process.env.ENVIROMENT}.com/api/dataentities/${process.env.DATA_ENTITY_NAME}/documents/${process.env.MASTERDATA_DOCUMENT_ID}`,
            {
                combinations,
                topCombinations
            },
            {
                headers: { "X-VTEX-API-AppKey": process.env.X_VTEX_API_APP_KEY, "X-VTEX-API-AppToken": process.env.X_VTEX_API_APP_TOKEN }
            });
        res.status(responseUpdate.status).json({ "Response": "Ok - User's Orders Updated" });
    }
}