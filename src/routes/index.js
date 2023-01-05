const { Router } = require('express');
const { route } = require('../app');
const router = Router();
const fs = require('fs');


const json_books = fs.readFileSync('src/books.json', 'utf-8');
let books = JSON.parse(json_books);
var x = false;
router.get('/', (req, res) => {
    res.render('index.ejs', {
        books
    })
});

router.get('/search-id', (req, res) => {
    res.render('index.ejs');
    x = true;
    res.redirect('/');
});

function checarVariable(){
    return x;
}
module.exports = {
    "checarVariable": checarVariable
}

router.get('/new-entry', (req, res) => {
    res.render('new-entry.ejs');
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

module.exports = router;