const express = require('express');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const contactAddress = "shaanjyot13@gmail.com"

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'shantanu.goswami@redcrackle.com',
    pass: 'Madeuta1313#',
  },
})
app.post("/contact", function (req, res) {
  // console.log(req.body);
  const message = {
    from: req.body.emailaddress,
    to: [contactAddress],
    subject: "Enquiry Reply frm Redcrackle" || "[No subject]",
    firstname: req.body.firstname || "[No Firstname]",
    lastname: req.body.lastname || "[No Lastname]",
    phonenumber: req.body.phonenumber || "[No Phone Number]",
    message: req.body.message || "[No message]"
  }
  mailer.sendMail(
    message,
    function (err, info) {
      if (err) return res.status(500).send(err)
      // res.json({ success: true })
      res.send(info);
    }
  )
})
app.listen(process.env.PORT || 3000);
// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile('index.html', { root: path.join(__dirname, 'public') });
// })
module.exports = app
