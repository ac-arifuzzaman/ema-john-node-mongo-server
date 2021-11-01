const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 9900;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.qw3sn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();

        const database = client.db('online_shop');
        const productCollection = database.collection('products');

        // Get product api 
        app.get('/products', async (req, res) => {
            console.log(req.query)
            const cursor = productCollection.find({});
            const page = req.query.page;
            const size = parseInt(req.query.size);
            let product;
            const count = await cursor.count();
            if (page) {
                products = await cursor.skip(page * size).limit(size).toArray()
            }
            else {
                products = await cursor.toArray();
            }
            res.send({
                count,
                products
            });
        });
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Ema jon er shathe prem abar shuru kora hoilo')
});

app.listen(port, () => {
    console.log('colse amader port er gari ', port);
})