import axios from 'axios';
export default new class RewardsController {

    async store(req, res) {  //Método para receber hook config + Criar combinação de acordo com o pedido recebido
        const { OrderId, State, hookConfig } = req.body;
        if (hookConfig) //se possuir a variavel configuração, significa que o request foi somente de configuração
            return res.status(200).json({ "Config": "Successful" }); //retorna um status 200 para informar que a configuração foi bem sucedida

        if (!State) //verifica se a váriavel estado foi passada no body da requisição
            return res.status(400).json({ "error": "Bad Request" }); //envia um erro informando requisição inválida

        const orderResponse = await axios.get(`https://${process.env.ACCOUNT_NAME}.${process.env.ENVIROMENT}.com/api/oms/pvt/orders/${OrderId}`,
            {headers:{"X-VTEX-API-AppKey": process.env.X_VTEX_API_AppKey, "X-VTEX-API-AppToken": process.env.X_VTEX_API_AppToken}}); //getOrderById captura informação do pedido pelo número do pedido
        
        
    }
}