const express = require('express')
const app = express() 
const MongoClient = require('mongodb').MongoClient 
const PORT = 5050
require('dotenv').config() 

let db
let dbConnectionStr = process.env.DB_STRING
let dbName = 'socialposts'

MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} database.`)
        db = client.db(dbName)
    })
    .catch(err =>{
        console.log(err)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())


app.get('/', async (request, response) => {
    const posts = await db.collection('socialposts').find().toArray()
    response.render('index.ejs', {postsList: posts})
})


app.post('/createPost', async (request, response) => {
    db.collection('socialposts').insertOne({name: request.body.name, message: request.body.message, likes: 0})
    .then(result => {
        console.log('Post added.')
        response.redirect('/')
    })
    .catch(err => console.error(error))
})

app.put('/like', (request, response) => {
    db.collection('socialposts').updateOne({name: request.body.name, message: request.body.message},{
        $set: {
            likes: Number(request.body.likes +1)
        }
    },)
    .then(result => {
        console.log('Liked')
        response.json('Like added')
    })
    .catch(error => console.error(error))
})

app.delete('/delete', (request, response) => {
    db.collection('socialposts').deleteOne({name: request.body.name, message: request.body.message})
    .then(result => {
        console.log('Post deleted')
        response.json('Post Deleted')
    })
    .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running on port: '+PORT)
})