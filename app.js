require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const axios = require('axios')

app.get('/token/:tokenAddr/user/:userAddr/amount/:tokenAmount', (req,res) => {
    const response = {
        error: false,
        result: false
    }
    const {tokenAddr, userAddr, tokenAmount} = req.params
    axios.get(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${tokenAddr}&address=${userAddr}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`)
    .then((d) => {
        if (d.data.result/1000000000000000000 >= tokenAmount){
            response.result =  true
            return res.json(response)
        }
        return res.json(response)
    }).catch((e) => {
        response.error = true
        return res.json(response)
    })
})

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
})