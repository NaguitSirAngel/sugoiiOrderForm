//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// exphbs.create({
//   //Helpers
//   helpers: {
//     toggleOne: function () {
//       console.log("clicked");
//     }
//   }
// });

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
    res.render('home');
});

app.post('/send', (req, res) => {
    console.log(req.body);
    let orders = "";
    if(req.body.porkGimbap){
      orders += `
      <li>Order: PorkGimbap ${req.body.porkQty}x</li>
      `
    }
    
    if(req.body.veganGimbap){
      orders += `
      <li>Order: VeganGimbap ${req.body.veganQty}x</li>
      `
    }
    const output = `
    <p>You have a new order!</p>
    <h3>Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Address: ${req.body.address}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Mode of Payment: ${req.body.modePmt}</li>
        <li>Pickup Point: ${req.body.pickupPoint}</li>
        ${orders}
    </ul>
    <h3>Instructions</h3>
    <p>${req.body.instructions}</p>
    `
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sirangeldummy@gmail.com', // generated ethereal user
      pass: 'dummydummy1!', // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    //from: '"Sugoii" <donotreply@sugoii.com>', // sender address
    from: `'"Sugoii Orders" <donotreply@sugoii.com>'`, // sender address
    to: "sirangelnaguit@gmail.com", // list of receivers
    subject: `${req.body.name} orders`, // Subject line
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.render('home', {msg:'Order success!'});

});

//Specifying port when started
app.listen(3001, () => console.log('Server started...'));