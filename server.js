const express = require('express');
const app = express();

const { createClient } = require('redis');
const client = createClient();

const getAllProducts = async () => {
    const time = Math.random() * 5000;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Produto 1", "Produto 2", "Produto 3"]);
        }, time);
    });
};

app.get('/', async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
})

const startup = async () => {  
    await client.connect(); 
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

startup();
