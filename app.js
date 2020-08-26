//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();

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
  //console.log(req.body);

  let name = req.body.name; //req
  let address = req.body.address; //req
  let emailAddress = req.body.email; //req
  let phone = req.body.phone; //req
  //let modePmt = req.body.modePmt; //req always has a value
  let pork = req.body.porkGimbap; // partial req
  let vegan = req.body.veganGimbap; // partial req
  let gimbox40 = req.body.gimbox40;
  let select40 = req.body.select40;
  let gimbox80 = req.body.gimbox80;
  let select80 = req.body.select80;

  if (name || address || emailAddress || phone) {
    //partial reqs
    if (pork || vegan || gimbox40 || gimbox80) {
      //email validation
      let re = /\S+@\S+\.\S+/;
      if (re.test(emailAddress)) {
        //phone number validation
        let phoneRe = /[0-9]{4}[0-9]{3}[0-9]{4}/;
        if (phoneRe.test(phone)) {
          let orders = "";
          if (req.body.porkGimbap) {
            orders += `
      <li>Order: PorkGimbap ${req.body.porkQty}x</li>`;
          }
          if (req.body.veganGimbap) {
            orders += `
      <li>Order: VeganGimbap ${req.body.veganQty}x</li>`;
          }
          if (req.body.gimbox40) {
            orders += `
      <li>Order: Gimbox(40) ${req.body.gimboxQty40}x (${select40})</li>`;
          }
          if (req.body.gimbox80) {
            orders += `
      <li>Order: Gimbox(80) ${req.body.gimboxQty80}x (${select80})</li>`;
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
        ${orders}
    </ul>
    <h3>Instructions</h3>
    <p>${req.body.instructions}</p>
    `;

    const outputClient = `
    <p>Here is your order summary. Thank you very much! We will be contacting you soon!</p>
    <h3>Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Address: ${req.body.address}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        <li>Mode of Payment: ${req.body.modePmt}</li>
        ${orders}
    </ul>
    <h3>Instructions</h3>
    <p>${req.body.instructions}</p>
    `;
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "sirangeldummy@gmail.com", // generated ethereal user
              pass: "dummydummy1!", // generated ethereal password
            },
            tls: {
              rejectUnauthorized: false,
            },
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
    });
  }
});

//Specifying port when started
//Local Port
app.listen(process.env.PORT || 3001, () => console.log("Server started..."));

//Heroku Port = process.env.PORT
