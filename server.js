const express = require('express');
const app = express();

const { createClient } = require('redis');
const client = createClient(
    {
        host: 'redis-server',
        port: 6379,
    }
);

const getAllProducts = async () => {
    const time = Math.random() * 5000;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Produto 1", "Produto 2", "Produto 3"]);
        }, time);
    });
};

app.get('/', async (req, res) => {
    const productsFromCache = await client.get("getAllProducts");
    if (productsFromCache) {
        return res.send(JSON.parse(productsFromCache));
    }
    const products = await getAllProducts();
    await client.set("getAllProducts", JSON.stringify(products));
    res.send(products);
})

const startup = async () => {
    try {
        await client.connect();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Falha ao conectar no Redis:', error);
    }
};

startup();
