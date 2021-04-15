const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const path = require('path');

const PORT = process.env.PORT || 3000;


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));


app.use(todoRoutes);
async function start(){
    try {
        await mongoose.connect('mongodb+srv://michael:12qwaszx@cluster0.b3a8t.mongodb.net/todos',{ 
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        app.listen(PORT, ()=>{
            console.log(`Server has been started on ${PORT} port...`);
        });
    } catch (error) {
        throw error;
    }
}

start();