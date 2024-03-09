[nodejs__BADGE]: https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge
[redis__BAGDE]:  https://img.shields.io/badge/Redis-DC3E2C?logo=redis&logoColor=white&style=for-the-badge
[express_BADGE]: https://img.shields.io/badge/express-005CFE?style=for-the-badge&logo=express



<h1 align="center" style="font-weight: bold;">Redis com Node.js 🚀</h1>

<div align="center">
  
![image](https://github.com/htamagnus/redis-cache-nodejs/assets/85269068/c82aff18-5e8d-4074-8fb0-9612efc53d1b)

</div>

<div align="center">

![nodejs][nodejs__BADGE]
![redis][redis__BADGE]
![express][express_BADGE]

</div>

<p align="center">
 <a href="#descricao">Descrição 🚀</a> • 
  <a href="#descricao">Funcionalidades 🚀</a> • 
 <a href="#pre-requisitos">Tecnologias Utilizadas 🛠️ </a> •
  <a href="#pre-requisitos">Implementação 🛠️ </a> •
</p>

<h2 id="descricao"> Descrição 🚀 </h2>
Este repositório contém um projeto de demonstração simples que utiliza o Redis como sistema de cache em uma aplicação Node.js com Express. O objetivo é ilustrar como o Redis pode ser usado para melhorar a performance de aplicações web armazenando dados frequentemente acessados no cache.

---

<h2 id="descricao"> Funcionalidades 🚀 </h2>

- Listagem de Produtos: Retorna uma lista de produtos simulados, demonstrando como os dados podem ser cacheados para otimizar o tempo de resposta.

  
- Limpeza de Cache: Permite a limpeza manual do cache, oferecendo flexibilidade para atualização de dados em tempo real.

---

<h2 id="pre-requisitos">Tecnologias Utilizadas 🛠️ </h2>

- Node.js: Ambiente de execução JavaScript do lado do servidor.

- Express: Framework para aplicações web para Node.js.

- Redis: Armazenamento de estrutura de dados em memória, utilizado como sistema de cache.

---

<h2 id="pre-requisitos">Implementação 🛠️ </h2>

1. **Configuração inicial:**
- O módulo redis é importado, e um cliente Redis é criado utilizando as configurações fornecidas (host e port), que apontam para o servidor Redis. 

~~~javascript
const { createClient } = require('redis');
const client = createClient(
    {
        host: 'redis-server',
        port: 6379,
    }
);
~~~

---

2. **Função Simulada de Busca de Produtos:**
- `getAllProducts` é uma função assíncrona que simula a busca de produtos, de um banco de dados ou serviço externo, com um delay aleatório para representar a latência da operação. Ela retorna uma promessa que resolve uma lista de produtos após um tempo aleatório.
  
~~~javascript
const getAllProducts = async () => {
    const time = Math.random() * 5000;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["Produto 1", "Produto 2", "Produto 3"]);
        }, time);
    });
};
~~~

---

3. **Endpoint para Limpar o Cache:**
- O endpoint `/saved` permite ao usuário limpar manualmente o cache armazenado sob a chave `"getAllProducts"` no Redis. Isso é feito através do método `await client.del("getAllProducts")`, que deleta a chave especificada. Após a deleção, a resposta 'Cache deletado' é enviada ao cliente.
~~~javascript
app.get('/saved', async (req, res) => {
    await client.del("getAllProducts");
    res.send('Cache deletado');
})
~~~

---

4. **Endpoint Principal para Listagem de Produtos:**
- O endpoint `'/'` é responsável por fornecer a lista de produtos. Primeiro, tenta recuperar a lista do cache do Redis usando `client.get("getAllProducts")`. Se os produtos estiverem disponíveis no cache `(productsFromCache)`, eles são retornados imediatamente ao usuário após serem parseados de volta para o formato JSON.
Se não houver produtos no cache, a função `getAllProducts` é chamada para obter a lista de produtos "frescos".
~~~javascript
app.get('/', async (req, res) => {
    const productsFromCache = await client.get("getAllProducts");
    if (productsFromCache) {
        return res.send(JSON.parse(productsFromCache));
    }
    const products = await getAllProducts();
    // await client.set("getAllProducts", JSON.stringify(products), { EX: 10 });
    res.send(products);
})
~~~

---
