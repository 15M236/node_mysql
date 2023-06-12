import express from 'express'
import { getNotes , getNote , createNote } from './database.js'

const app = express()

app.use(express.json())
app.get('/notes', async(req,res) => {
    let result = await getNotes()
    res.send(result)
})

app.get('/get-note/:id', async(req,res) => {
    let id = req.params.id
    let result = await getNote(id)
    res.send(result)
})

app.post('/post-note', async(req,res,next) => {
    const {title , contents} = req.body
    let result = await createNote(title, contents)
    res.send(result)
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen( 4000 , () => {
    console.log('listening on port 4000')
})

