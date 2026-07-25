const express = require('express');
const router = express.Router();

router.get("/greeting",(req,res)=>{
    res.send("Hello Developer")
})

module.exports = router