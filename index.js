const express = require('express');
const routes = require('./routes/report.route');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const uri = "mongodb://Localhost:27017/assignment"
mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
