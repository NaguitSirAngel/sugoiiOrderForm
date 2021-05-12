//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();
const { google } = require('googleapis');
require("dotenv").config();

//console.log(process.env.EMAIL);
//console.log(process.env.EMAIL_PASS);

//View Engine setup using Express-handlebars
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

//Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Render Home
app.get("/", (req, res) => {
  res.render("home");
});

//Once submit button is clicked POST
app.post("/send", (req, res) => {
  let name = req.body.name; //req
  let address = req.body.address; //req
  let emailAddress = req.body.email; //req
  let phone = req.body.phone; //req
  let pork = req.body.porkGimbap; // partial req
  let bulgogi = req.body.bulgogiGimbap;
  let spam = req.body.spamGimbap;
  //console.log(pork);
  //console.log(name);

  let vegan = req.body.veganGimbap; // partial req

  let gimbox40 = req.body.gimbox40;
  let select40 = req.body.select40;

  let gimbox80 = req.body.gimbox80;
  let select80 = req.body.select80;

  let instructions = req.body.instructions;

  //price var
  let price = 0;

  if (name || address || emailAddress || phone) {
    //partial reqs
    if (pork || vegan || bulgogi || spam || gimbox40 || gimbox80) {
      //email validation
      let re = /\S+@\S+\.\S+/;
      if (re.test(emailAddress)) {
        //phone number validation
        let phoneRe = /[0-9]{4}[0-9]{3}[0-9]{4}/;
        //price calculations will be here
        if (phoneRe.test(phone)) {
          let orders = "";
          if (pork) {
            orders += `
      <li>Order: Pork Gimbap ${req.body.porkQty}x</li>`;
            if (req.body.porkQty > 1) {
              price += 150 * req.body.porkQty;
            } else {
              price += 150;
            }
          }
          if (vegan) {
            orders += `
      <li>Order: Vegan Gimbap ${req.body.veganQty}x</li>`;
            if (req.body.veganQty > 1) {
              price += 150 * req.body.veganQty;
            } else {
              price += 150;
            }
          }
          if (bulgogi) {
            orders += `
      <li>Order: Bulgogi Gimbap ${req.body.bulgogiQty}x</li>`;
            if (req.body.bulgogiQty > 1) {
              price += 160 * req.body.bulgogiQty;
            } else {
              price += 160;
            }
          }
          if (spam) {
            orders += `
      <li>Order: Spam and Egg Gimbap ${req.body.spamQty}x</li>`;
            if (req.body.spamQty > 1) {
              price += 150 * req.body.spamQty;
            } else {
              price += 150;
            }
          }
          if (gimbox40) {
            orders += `
      <li>Order: Gimbox(40) ${req.body.gimboxQty40}x (${select40})</li>`;
          
      if (req.body.gimboxQty40 > 1) {
        if (select40 == "Pork Gimbox") {
          price += 500 * req.body.gimboxQty40;
        }
        else if(select40 == "Vegan Gimbox") {
          price += 500 * req.body.gimboxQty40;
        }
        else if (select40 == "Bulgogi Gimbox") {
          price += 550 * req.body.gimboxQty40;
        }
        else if(select40 == "Spam and Egg Gimbox"){
          price += 550 * req.body.gimboxQty40;
        } 
        else if(select40 == "Assorted"){
          price += 600 * req.body.gimboxQty40;
        } 
      }else{
        if (select40 == "Pork Gimbox") {
          price += 500;
        }
        else if(select40 == "Vegan Gimbox") {
          price += 500;
        }
        else if (select40 == "Bulgogi Gimbox") {
          price += 550;
        }
        else if(select40 == "Spam and Egg Gimbox"){
          price += 550;
        } 
        else if(select40 == "Assorted"){
          price += 600;
        } 
      } 
      

          }
          if (gimbox80) {
            orders += `
      <li>Order: Gimbox(80) ${req.body.gimboxQty80}x (${select80})</li>`;
      if (req.body.gimboxQty80 > 1) {
        if (select80 == "Pork Gimbox") {
          price += 900 * req.body.gimboxQty80;
        }
        else if(select80 == "Vegan Gimbox") {
          price += 900 * req.body.gimboxQty80;
        }
        else if (select80 == "Bulgogi Gimbox") {
          price += 950 * req.body.gimboxQty80;
        }
        else if(select80 == "Spam and Egg Gimbox"){
          price += 950 * req.body.gimboxQty80;
        } 
        else if(select80 == "Assorted"){
          price += 1000 * req.body.gimboxQty80;
        } 
      }else{
        if (select80 == "Pork Gimbox") {
          price += 900;
        }
        else if(select80 == "Vegan Gimbox") {
          price += 900;
        }
        else if (select80 == "Bulgogi Gimbox") {
          price += 950;
        }
        else if(select80 == "Spam and Egg Gimbox"){
          price += 950;
        } 
        else if(select80 == "Assorted"){
          price += 1000;
        } 
      } 
          }

          const output = `
    <p>New order from ${req.body.name}!</p>
    <h3>Order Details:</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Address: ${req.body.address}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Mode of Payment: ${req.body.modePmt}</li>
        ${orders}
    </ul>
    <h3>Estimated Total: &#8369;${price.toFixed(2)}</h3>
    <h3>Instructions:</h3>
    <p>${req.body.instructions}</p>
    `;

          const outputClient = `
    <p>Here is your order summary. Thank you very much! We will be contacting you soon!</p>
    <h3>Summary:</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Address: ${req.body.address}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Mode of Payment: ${req.body.modePmt}</li>
        ${orders}
    </ul>
    <h3>Estimated Total: &#8369;${price.toFixed(2)}</h3>
    <h3>Instructions:</h3>
    <p>${req.body.instructions}</p>
    `;

          const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);
          oAuth2Client.setCredentials({refresh_token: process.env.REF_TOKEN});

          const accessToken = oAuth2Client.getAccessToken(); 
          let transporter = nodemailer.createTransport({
            service: 'gmail', 
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              type: 'OAuth2',
              user: process.env.EMAIL, // generated ethereal user
              // pass: process.env.EMAIL_PASS, // generated ethereal password
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              refreshToken: process.env.REF_TOKEN,
              accessToken: accessToken
            }
            // tls: {
            //   rejectUnauthorized: false,
            // },
          });

          // Admin email
          let info = transporter.sendMail({
            //from: '"Sugoii" <donotreply@sugoii.com>', // sender address
            from: `'"Sugoii Orders" <donotreply@sugoii.com>'`, // sender address
            to: "sugoiifoods@gmail.com", // list of receivers
            subject: `${req.body.name} orders`, // Subject line
            html: output, // html body
          });

          // Client email confirmation
          let infoClient = transporter.sendMail({
            from: `'"Sugoii" <donotreply@sugoii.com>'`, // sender address
            to: emailAddress, // list of receivers
            subject: `Order Success!`, // Subject line
            html: outputClient, // html body
          });

          console.log("Message sent: %s", infoClient.messageId);
          console.log("Message sent: %s", info.messageId);
          console.log(
            "Preview URL: %s",
            nodemailer.getTestMessageUrl(infoClient)
          );
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
          res.render("success");
        } else {
          //Invalid number
          res.render("home", {
            vldMsg: "Phone number not valid.",
            name: name,
            address: address,
            emailAddress: emailAddress,
            phone: phone,
            instructions: instructions,
            //pork: pork
          });
        }
      } else {
        //Invalid email
        res.render("home", {
          vldMsg: "Email not valid.",
          name: name,
          address: address,
          emailAddress: emailAddress,
          phone: phone,
          instructions: instructions,
          //pork: pork
        });
      }
    } else {
      //No order
      res.render("home", {
        vldMsg: "No order selected.",
        name: name,
        address: address,
        emailAddress: emailAddress,
        phone: phone,
        instructions: instructions,
        //pork: pork
      });
    }
  } else {
    //Required fields
    res.render("home", {
      vldMsg: "Required fields (*) must be completed.",
      name: name,
      address: address,
      emailAddress: emailAddress,
      phone: phone,
      instructions: instructions,
      //pork: pork
    });
  }
});

//Specifying port when started
//Local Port
app.listen(process.env.PORT || 3001, () => console.log("Server started..."));

//Heroku Port = process.env.PORT
