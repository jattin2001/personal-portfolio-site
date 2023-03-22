const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
app.get("/landing.html", (req,res)=>{
    res.sendFile(__dirname + "/landing.html")
})
app.get("/login.html", (req,res)=>{
    res.sendFile(__dirname + "/login.html")
})
app.get("/jsProjects.html", (req,res)=>{
    res.sendFile(__dirname + "/jsProjects.html")
})
app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const address2 = req.body.address2;
  const city = req.body.city;
  const state = req.body.state;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          MOBILE: mobile,
          ADDRESS: address,
          ADDRESS2: address2,
          CITY: city,
          STATE: state
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  const options = {
    url: 'https://us21.api.mailchimp.com/3.0/lists/069a260cac',
    method: 'POST',
    headers: {
      Authorization: 'auth 3e9d1ee77b44d56a39ffd830d1fd1b3e-us21'
    },
    body: postData
  };

  request(options, (error, response, body) => {
    if (error) {
      res.send('There was an error, try again');
    } else {
      res.redirect("/");
    }
  });
});

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
