require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { router } = require('./router/notionrouter');

const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('success')
})

app.use(router)

app.listen(port, () => {
    console.log(`app listening at localhost ${port}`)
})