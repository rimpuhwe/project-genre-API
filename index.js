
require('dotenv').config();

const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());
const genres = [
    {id:1 , name:'action'},
    {id:2 , name:'horror'},
    {id:3 , name:'drama'},
    {id:4 , name:'sci-fi'},

]
//reading the genres from the database
app.get('/api/genres', (req, res) => {
    res.send(genres);
});
//creating a new genre
app.post('/api/genres', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
   const genre = {
    id: genres.length + 1,
    name:req.body.name 
   }
genres.push(genre);
res.send(genre);
}
)
//updating the genre list
app.put('/api/genres/:id' ,(req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre)
})
//deleting the element from genres list
app.delete('/api/genres/:id',(req, res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('Genre not found');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);

})

const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
