//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

//View Engine setup using Express-handlebars
//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
  }));
app.set('view engine', 'hbs');

//Static folder
app.use('/public', express.static(path.join(__dirname,'public')));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    //res.send('Hello');
    res.render('home');
});

app.post('/send', (req, res) => {
    console.log(req.body);
    const output = `
    <p>You have a new order!</p>
    <h3>Conatct Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Address: ${req.body.address}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Mode of Payment: ${req.body.modePmt}</li>
        <li>Pickup Point: ${req.body.pickupPoint}</li>
    </ul>
    <h3>Message</h3>
    <p>Orders: ${req.body.orders}</p>
    `
});

//Specifying port when started
app.listen(3001, () => console.log('Server started...'));