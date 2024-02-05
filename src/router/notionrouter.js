const express = require('express');
const { GetDatabase } = require('../utility/notionutility');

const router = express.Router();

router.get('/database', async(req, res) => {
    const db = await GetDatabase()
    res.send(db)
})

module.exports= {
    router, 
}