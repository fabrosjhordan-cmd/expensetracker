const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expensetracker'
})

app.get('/expense', (req, res)=>{
    const sql = "SELECT * FROM expense";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/expense', (req, res)=>{
    const sql = "INSERT INTO expense (`description`, `amount`, `category`, `date`, `type`) VALUES (?)";
    const values = [
        req.body.description,
        req.body.amount,
        req.body.category,
        req.body.date,
        req.body.type
    ];

    db.query(sql, [values], (err, data)=>{
        if (err) return res.json(err);
        return res.json({id: data.insertId})
    })
});

app.put('/expense/:id', (req, res)=>{
    const sql = "UPDATE expense SET description = ?, amount = ?, category = ?, date = ?, type = ? WHERE id=?"
    const values=[
        req.body.description,
        req.body.amount,
        req.body.category,
        req.body.date,
        req.body.type
    ];
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data)=>{
        if(err) return res.json(err);
        return res.json({message: "Updated Successfully"})
    });
});

app.listen(8081, ()=>{
    console.log('The Server is Listening');
})