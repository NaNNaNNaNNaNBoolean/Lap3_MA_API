const express = require('express');
const cors = require('cors');

const app = express();

const music = require('./DataSet/index.json')

app.use(cors())
app.use(express.json())

app.get('/',(req,res) => {
    res.send("The music api")
})

app.get('/Albums',(req,res) => {
    res.send(music)
})

//////////////////////////////////////////////////////////////////////////

app.get('/Albums/:id', (req,res) => {
    const id = req.params.id;
    const info = music.find(music => music.id == id);
    if(info === undefined){
        res.status(404).send({ error: `Album with identifaction ${id} is not found`})
    }
    res.send(info)
})

app.get('/Albums/:id/songs', (req,res) => {
    const id = req.params.id;
    const info = music.find(music => music.id == id);
    const songs = info.songs
    if(songs === undefined){
        res.status(404).send({ error: `Album with identifaction ${id} is not found`})
    }
    res.send(songs)
})

module.exports = app
