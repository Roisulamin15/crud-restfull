const express = require('express')
const path = require('path');
const app = express()
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { throws } = require('assert');
const port = 3000

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'PRODUK'
});
 
connection.connect(function(eroor){
    if(eroor) console.log(eroor);
    else console.log('connectDB');
});

app.use(bodyParser.urlencoded({extended: false}));
// app.use('views', path.join(__dirname, 'views'));
// app.use(path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.get('/',(req, res) => {
    let sql = "SELECT * FROM USER";
    let query = connection.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else {
            res.render('USER_index', {
                title: 'CRUD Operation using NodeJS / ExpressJS / MySQL',
                user: rows
            });
        }
    });

});

app.get('/add', (req, res) => {
        res.render('USER_add',{
            title: 'Operating using NodeJS / ExpressJS / MySQL'
        });
});

app.post('/save',(req, res) => {
    let data = {username, email, password} = req.body;
    let sql = "INSERT INTO USER SET ?";
    console.log(data);
    let query = connection.query(sql, data,(err,result) =>{
        if(err) throw err;
        // res.render('userkeranjang_add',{
        //     user :result[0]
        // })
        res.redirect('/')
    })

})



app.get('/edit/:USER',(req,res) => {
    const USER= req.params.USER;
    let sql = `select * from USER where id= '${USER}'`
    let query = connection.query(sql,(err, result) =>{
        if(err) throw err;
        res.render('USER_edit',{
            user : result[0]
        })
    })
})

app.post('/update',(req,res)=>{
    const USER= req.body.id;
    let sql = `UPDATE USER SET NAMA_USER='${req.body.username}',password='${req.body.password}', email='${req.body.email}' WHERE id='${userId}'`;
    let query = connection.query(sql, (err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/delete/:USER',(req,res) => {
    const USER = req.params.userkeranjangId;
    let sql = `DELETE from USER where id = '${USER}'`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.redirect('/');
    });
});



