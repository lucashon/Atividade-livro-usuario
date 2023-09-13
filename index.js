const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000
const app = express()

const conn = require('./db/conn')
const User = require('./models/User')
const Livro = require('./models/Livro')


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// app.get('/',(req,res)=>{

//     return res.render('home')

// })
// Mostrar usuario
app.get('/users/create',(req,res)=>{

    return res.render('useradd')

})

// Cadastrar informações formulario
app.post('/users/create', async(req,res)=>{
    const {name,occupation} = req.body
    let newsletter = req.body.newsletter

    if(newsletter === 'on'){
        newsletter = true
    }else{
        newsletter = false
    }

    console.log(req.body)

    await User.create({name,occupation,newsletter})

    return res.redirect('/')
 

})


// Unico Dado 
app.get('/users/:id', async (req,res)=>{
    const id = req.params.id



    const user = await User.findOne({raw: true, where: { id:id } })
    console.log(user)
    return res.render('viewuser', {user})
    

})

app.get('/users/:id', async (req,res)=>{
    const id = req.params.id



    const livro = await Livros.findOne({raw: true, where: { id:id } })
    console.log(user)
    return res.render('viewuser', {livro})
    

})

//Deletando Dados
app.post('/users/detele/:id', async (req,res)=>{
    const id = req.params.id
    await User.destroy({where: { id:id } })


    return res.redirect('/')
    

})  



// Editar 1 etapa
app.get('/users/edit/:id', async (req,res)=>{
    const id = req.params.id
    
    const user = await User.findOne({raw:true, where: {id:id}});
    return res.render('edituser', {user:user})
    

})

 app.post('/users/update/:id', async(req,res)=>{
    const {id, name, occupation} = req.body
    let newsletter = req.body.newsletter
    console.log('ddddd')
    if(newsletter === 'on'){
        newsletter = true;
    }else{
        newsletter = false
    }

    const UserData = {
        id,
        name, 
        occupation,
        newsletter
    }
    await User.update(UserData, {where: {id : id} })

    return res.redirect('/')

 })


//////////////////////////////
// Livro
/////////////////////////////


app.get('/livro/add', (req,res)=>{

 return res.render('addlivro')

})


// add
app.post('/livro/add', async(req,res)=>{
    const {autor, titulo, preco} = req.body
    let capa = req.body.capa

    if(capa === 'on'){
        capa = true
    }else{
        capa = false
    }

    console.log(req.body)

    await Livro.create({autor,titulo,preco,capa})

    return res.redirect('/')
 

})

// mostrar
app.get('/', async (req,res)=>{
    const users = await User.findAll({raw: true})
    console.log(users)
    

    return res.render('home', { users})

})


// EDITAR
// Editar 1 etapa
app.get('/livro/edit/:id', async (req,res)=>{
    const id = req.params.id
    
    const livro = await Livro.findOne({raw:true, where: {id:id}});
    return res.render('editlivro', {livro})
    

})

 app.post('/livro/update/:id', async(req,res)=>{
    const {id, autor, titulo, preco} = req.body
    let capa = req.body.capa
    console.log('ddddd')
    if(capa === 'on'){
        capa = true;
    }else{
        capa = false
    }

    const UserData = {
        id,
        autor, 
        titulo,
        capa,
        preco
    }
    await Livro.update(UserData, {where: {id : id} })

    return res.redirect('/')

 })




 app.post('/livro/detele/:id', async (req,res)=>{
    const id = req.params.id
    await Livro.destroy({where: { id:id } })


    return res.redirect('/')
    

})

app.get('/home/livros', async(req,res)=>{
    const livros = await Livro.findAll({raw: true})
   
    return res.render('livroshome', {livros})
    

})


conn.sync().then(()=>{
    app.listen(port,()=>{
        console.log('servidor Rodando')
    })
}).catch((err)=>{
    console.log(err)
})

