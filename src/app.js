const express = require('express');
require("./db/conn")

const User = require("./models/users");

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/registration', (req, res) => {
    //console.log(req.body);
    const password = req.body.password;

    const user = new User({
      name:req.body.name,
      role:req.body.role,
      email:req.body.email,
      password:password

    });

    user.save().then(() => {
      res.status(201).send(user);
    }).catch((e) => {
      res.status(400).send(e);
    })
  
  })

app.post('/user_list_API', async (req, res) => {
  //console.log(req.headers.email)
  
      try{
            //const em = req.headers.email; 
            const q = { email: req.headers.email };
            //console.log(q)   
            const userData = await User.findOne(q).exec();
            if(userData){
            
              if (userData.role == "admin"){
                
                try{
                  const allusersData = await User.find();
                  res.send(allusersData);
                }catch(e){
                  res.send(e);

                }
                res.send("inside admin");
              }
              else{
                res.send("not admin");
              }
          }
          else{
            res.send("user not found");
          }

      }catch(e){
        res.send(e);

      }

    
    //res.send(req.headers.email);
  });


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})