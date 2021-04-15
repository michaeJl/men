const {Router} = require('express');
const Todo = require('../models/todo');
const router = Router();

router.get('/', async (req,res)=>{

    const todos = await Todo.find({});

    res.render('index', {
        title: 'mainpage',
        active: 'isIndex',
        todos
    });
});

router.get('/create', (req,res)=>{
    res.render('create', {
        title: 'createpage',  
        active: 'isCreate'
    });
});

router.post('/create', async (req,res)=>{
    const todo = new Todo({
        title: req.body.title
    });

    await todo.save();

    res.redirect('/');
});

router.post('/complete', async (req,res)=>{
    const todo = await Todo.findById(req.body.id);
    console.log(req.body);
    todo.completed = !!req.body.completed;
    await todo.save();

    res.redirect('/');
});

module.exports = router;