const express = require('express');
const router = express.Router();
const db = require("../models/index");
const Size = db.size;

router.get('/sizes', async (req,res,next) => {
    const sizes = await Size.findAll();
    res.send(sizes);
})









module.exports = router;