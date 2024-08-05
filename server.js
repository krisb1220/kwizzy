const express = require('express');
const app = express();
const port = 3000;
const bcrypt =require("bcrypt");
const dotenv = require('dotenv').config();
const { engine } = require('express-handlebars');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const UserModel = require("./models/User").User;
const PostModel = require("./models/Post").Post; 
const jsonParser = bodyParser.json() 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const uri = process.env.MONGOOSE_URI;
const cors = require('cors');
var session = require('express-session');
const { Post } = require('./models/Post');
let requestsMade = 0;
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const cookieParser = require("cookie-parser");
const passport = require("passport").passport;



class StatusMessage {
  constructor(errorCode=0, message="complete") {
    
    if(errorCode) {

      this.success = -1;
      this.errorCode = errorCode;
      
      if (errorCode==1) {
        this.message = "User does not exist"
      } 
      
      else if (errorCode==2) {
        this.message = "User already exists"
      } 
      

      else if (errorCode==3) {
        this.message = "You do not have permission to perform this action."
      }
      
      else {
        this.message = "An unknown error occured"
      }
    } 
    
    
    else {
      this.success = 1;
      this.message = message;
    }

  }
}

console.log("Starting server.........")

//setters
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(jsonParser); 
app.use(urlencodedParser); 


app.use(express.static(__dirname + "/src"));
app.use(cors());
app.use(connectLivereload());


//db
mongoose.set("strictQuery", false);
main().catch((err) => console.log(err));

async function main() {
  console.log("mongoose connected");
  await mongoose.connect(process.env.MONGOOSE_URI);
}



app.use((req, res, next)=>{
  console.log(`${req.method} ${req.url}`);
  // console.log(req.session)
  console.log("Request Body:");
  console.log("Request #" + requestsMade);
  console.log(req.body);
  requestsMade++
  next();
})

const liveReloadServer = livereload.createServer();

// Watch the 'public' and 'views' directories for changes
liveReloadServer.watch(path.join(__dirname, 'src'));
liveReloadServer.watch(path.join(__dirname, 'views'));

//session

app.use(cookieParser("helloworld"))
app.use(session({
  secret: "12",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60
  }
}));


app.get('/ses', async (req, res) => {
  // const um = new UserModel({email:"k120", "password": "ddd", entries:[]})
  console.log("----session-----")
  // console.log(req.headers.cookie)
  console.log(req.session.id)
  // console.log(session)
  console.log("----------------")
  req.session.visited = true;
  res.json(session)
});

//routes
app.get('/', async (req, res) => {
  // const um = new UserModel({email:"k120", "password": "ddd", entries:[]})
  console.log("----session-----")
  // console.log(req.headers.cookie)
  console.log(req.session.id)
  console.log("----------------")
  req.session.visited = true;
  res.render('index', {title:"Basic Authentication REST API"}); 
});

app.post("/signup", async (req, res)=>{
  UserModel.findOne({email: req.body.email}).then((data)=>{
    if(data){
      console.log("user exists");
      res.status(401).json(new StatusMessage(2))
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            user = new UserModel({email: req.body.email, password: hash, entries:[]});
            await user.save();

        });
      });
      res.json(new StatusMessage(0, "User created. You may now log in." ));

      // res.json({"success": 1, message:"User created. You may now log in."})
    }
  })
});

app.post("/login", async (req, res)=>{
  UserModel.findOne({email: req.body.email}).then((data)=>{
    if(data){
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password,10, async function(err, hash) {
            let user = await UserModel.findOne({email: req.body.email});
            bcrypt.compare(req.body.password, user.password, function(err, result) {
              console.log("password: " + req.body.password);
              console.log("password hash: " + user.password);
              console.log("password hashed: " + hash);
              console.log(result);
              if(result){
                //don't return password 
                req.session.user = user;
                res.json({...user, success:1, message:"Login Successful"});
              } else {
                return res.status(401).json({"success": -1, message:"Login failed"})
              }
          });
        });
      });

    } else {
      res.status(401).json({"success": -1, message:"User does not exist"})
    }
  })
});

app.post("/entries", async (req, res)=>{

  let reqBody = req.body;
  let user = await UserModel.findOne({email: reqBody.email});
  let payload = (user && !req.query.action != "new") ? user : new StatusMessage(1);

  if(req.query.action == "new") {
    if (user) {
      user.entries.push(new PostModel({
        title: reqBody.title,
        body: reqBody.postBody
      }));
      user.save();
    } 
  } 


  if(req.query.action == "lookup") {
    if (user) {
      user.entries.push(new PostModel({
        title: reqBody.title,
        body: reqBody.postBody
      }));
      user.save();
    } 
  } 

  if(req.query.action == "save") {
    if (user) {
      user.entries.push(new PostModel({
        title: reqBody.title,
        body: reqBody.postBody
      }));
      user.save();
    } 
  } 


  res.send(payload);

});


app.get("/status", (request, response)=>{
  console.log(request.sessionStore)
  response.send(request.session.user || "not authenticated")
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});