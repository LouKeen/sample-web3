const express = require('express')
const {
    Connection,
    clusterApiUrl,
    PublicKey,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const app = express()
const port = 3000

app.get('/balance', async (req, res) => {
    if (req.query.address == null) {
        res.send("Must provide address as query parameter")
    }
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const publicKey = new PublicKey(req.query.address)
        const walletBalance = await connection.getBalance(publicKey)
        res.send((walletBalance / LAMPORTS_PER_SOL).toString())
    } catch(err) {
        res.send(err.message)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})