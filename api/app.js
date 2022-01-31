//Crea servidor

const Joi = require('joi');
const express = require('express');
const { exist, invalid } = require('joi/lib/types/lazy');

const app = express ();
app.use(express.json());

const courses = [
    { id: 1, name:'course 1'},
    { id: 2, name:'course 2'},
    { id: 3, name:'course 3'},
    { id: 4, name:'course 4'}
];

app.get('/', (req, res) => { //Dos argumentos path o url, callback
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//Metódo básico para hacer una petición por un parámetro especifico y devolver ese valor.
// app.get('/api/courses/:id', (req,res) => { 
//     res.send(req.params.id);
// })

//Forma de hacer post (create) con validación manual
// app.post('/api/courses', (req, res) => {
//    if(!req.body.name || req.body.name.length < 3) {
//    //400 Bad Request
//    res.status(400).send('Name is required and should be minimun characters')
//    return;
//    }
//    const course = {
//         id: courses.length + 1,
//         name: req.body.name
//     }
//     courses.push(course);
//     res.send(course);
// })

//Metodo de hacer post con validació utilizando Joi
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);

    if(result.error) return res.status(400).send(result.error.details[0].message)
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => { //Metódo completo con devolución de errores
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the cours with the given ID was not found')// 404
        res.send(course)

})

//Método PUT básico
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    // if not exist, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('the cours with the given ID was not found')// 404
    
    // Validate 
    // If invalid, return 400
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if(result.error){
        return res.status(400).send(result.error.details[0].message)
    }

    // Update courser
    // return updated course
    course.name = req.body.name;
    res.send(course); 
})

//Metodo delete, 
app.delete('/api/courses/:id', (req, res) => {
    //Look up
    // if not exists, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given Id was not found');

    //Delete
    const index = courses.indexOf(course)
    courses.splice(index, 1);

    //Return the same course
    res.send(course);
})


//Port 
const port = process.env.PORT || 3000; //Variable de entorno que captura el puerto que esta desginado en el ordenador
app.listen(port, () => console.log(`Listening on port ${port}...`))