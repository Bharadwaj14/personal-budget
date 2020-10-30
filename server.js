// Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const budgetModel=require("./models/budget_schema")


let url = 'mongodb://localhost:27017/budget';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("Connected to the database");
        })
        .catch((connectionError)=>{
            console.log(connectionError)
        })
mongoose.set('useCreateIndex', true);
app.use(cors());
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/budget', async (req, res) => {
    try{
        const budgetData = await budgetModel.find();
        res.send(budgetData);
    }
    catch(exception){
        console.log(exception);
    }
});

app.post('/addDocument', async (req, res) => {
    const budgetData = new budgetModel({title: req.body.title, budget: req.body.budget, color: req.body.color}); 
    try{
        const budgetDataSaved = await budgetData.save();
        res.send(budgetDataSaved);
    }
    catch(exception){
        console.log(exception);
    }
});

app.listen(port, ()=>{
    console.log(`API served at http://localhost:${port}`);
});