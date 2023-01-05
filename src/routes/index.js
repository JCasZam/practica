const { Router } = require('express');
const { route } = require('../app');
const router = Router();
const fs = require('fs');


const json_books = fs.readFileSync('src/books.json', 'utf-8');
let books = JSON.parse(json_books);

router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    })
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry.ejs');
});

router.post('/new-entry', (req, res) => {
    const {id, nombre, direccion, edad,telefono,sexo,cuentabanco,numerotarjeta,fechavencimiento,lineacredito,saldodisponible,saldoporpagar,tipotarjeta, tipoproducto  } = req.body;
    if (!id || !nombre || !direccion || !edad || !telefono || !numerotarjeta || !fechavencimiento || !saldodisponible || !saldoporpagar || !tipoproducto) {
        res.status(400).send("Entradas deben tener datos");
        return;
    }

    let newBook = {
        id,
        nombre,
        direccion,
        edad,
        telefono,
        sexo,
        cuentabanco:{
            numerotarjeta,
            fechavencimiento,
            lineacredito:{
                saldodisponible,
                saldoporpagar
            },
            tipotarjeta,
            tipoproducto
        },
    };

    books.push(newBook);

    const json_books = JSON.stringify(books)
    fs.writeFileSync('src/books.json', json_books, 'utf-8');

    res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
    books = books.filter(book => book.id != req.params.id);
  
    
    const json_books = JSON.stringify(books);
    fs.writeFileSync('src/books.json', json_books, 'utf-8');
  
    res.redirect('/')
  });

module.exports = router;