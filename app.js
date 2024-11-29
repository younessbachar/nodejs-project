const express = require('express')
const app = express();
const mongoose = require('mongoose');
const port = process.env.port || 3000
app.use(express.urlencoded({extended : true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
const methodOverride = require("method-override")
app.use(methodOverride('_method'))

///authUser model
const authUser =  require('./models/authUser');

/// routers
const welcomerouter = require('./routes/welcomeRoute');
const addrouter = require('./routes/addCustomerRoute') 
const editrouter = require('./routes/editRoute')
const viewrouter = require('./routes/viewRoute')
const searchrouter = require('./routes/searchRoute')
const deleterouter = require('./routes/deleteRoute') 
const homerouter = require('./routes/homeroute')
const loginrouter = require('./routes/loginRout')
const signuprouter = require('./routes/signupRoute')

//auto refresh

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


// connect to MongoDB
mongoose.connect('mongodb+srv://younessbachar02:youyou2003@express.ugnrc.mongodb.net/all-data?retryWrites=true&w=majority&appName=express')
.then(()=>{
    app.listen(port,()=>{
        console.log("server work")
    })
    console.log("connect")
})
.catch((err)=>{
    console.log(err)
})




///router signup page

app.use(signuprouter)

///router login page
app.use(loginrouter)

///router welcome page

app.use(welcomerouter)

///router Home Page

app.use(homerouter)

////router add customer

app.use(addrouter)


///router view
app.use(viewrouter)

///router search 
app.use(searchrouter)

///router update customer

app.use(editrouter)

/////delete request

app.use(deleterouter)

///Create User
app.post("/signup", async (req, res) => {
  try{
    authUser.create(req.body)
    .then((result)=>{
      console.log(result)
      res.redirect("signup")
    }
    )
  }
 catch(error){
  console.log(error)
 }
});