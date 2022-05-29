const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const fs = require('fs');
const tour = require('./models/tourModel');


const app = require('./app');



const DB = process.env.DATABASE.replace(
  '<PASSWORD',
  process.env.DATABASE_PASSWORD
);

console.log(process.env.DATABASE)
mongoose.connect('mongodb+srv://arvi:'
  + encodeURIComponent('958129@Aa') + '@cluster0.trl2v.mongodb.net/natours?retryWrites=true&w=majority');
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.get('/import', async (req, res) => {
    fs.readFile(`${__dirname}/tours-simple.json`, 'utf-8', async (err, result) => {
      const _tour = await tour.create(JSON.parse(result));
      res.status('201').json({
        status: 'Success',
        data: {
          tour: _tour
        }

      })
    })
  

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})
