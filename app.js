const config = require('config')     // keep constants in files not code
const cors = require('cors')         // cross origin resourse sharing
const express = require('express')   // web framework for Node.js
const mongoose = require('mongoose') // MongoDB object modeling  
const morgan = require('morgan')     // HTTP request logger middleware 
const { MongoMemoryServer } = require('mongodb-memory-server');
const connect =  require('./database/conn.js');


const port = process.env.PORT || config.get("port");



const app = express();

app.use(express.json());

app.use(cors())

app.use(morgan('combined'))

// Use middleware to set up routes
app.use('/todo', require('./routes/todo'))
app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))
app.use('/', (req,res)=> {res.send('Try /todo')})


// start server only when we have valid connection
connect().then(() => {
  try {
      app.listen(port,() =>{
          console.log(`Server connected to http://localhost:${port}`);
      
      })
  }
  catch (error) {
      console.log('Cannot connect to the server');
  }
}).catch(error => {
  console.log("Invalid database connection");

})