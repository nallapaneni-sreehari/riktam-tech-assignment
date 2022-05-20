const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminApis = require('./routes/admin');
const userApis = require('./routes/user');
const groupApis = require('./routes/group');

const {connect} = require('./db-connection/mongodb');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminApis);
app.use('/user', userApis);
app.use('/group', groupApis);

let server = app.listen(PORT, async (err)=>{
    if (err) throw err;
    await connect();
    console.log('Server is running on ' + PORT);  
});

module.exports = server;