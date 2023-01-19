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
  const formData = req.body
  let mailOptions = {
    from: `${formData.emailaddress}`,
    to: [contactAddress],
    subject: "New form Submission frm Redcrackle" || "[No subject]",
    text: 'Hi, Admin',
    html: `<b>Firstname: ${formData.firstname}</b><br>
           <b>Lastname: ${formData.lastname}</b><br>
           <b>Message: ${formData.message}</b><br>
            <b>Phone: ${formData.phonenumber}</b><br>
            <b>Email: ${formData.emailaddress}</b>`
  }
  mailer.sendMail(
    mailOptions,
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
