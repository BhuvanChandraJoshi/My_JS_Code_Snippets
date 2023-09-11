const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();

app.use(express.json());

const users = [];

const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
];

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token  = authHeader && authHeader.split(" ")[1];
    if(token == null){
        return res.send("Please LogIn/SignUp");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            console.log(err.message);
            return res.send("Invalid token/Please login again");
        }
        req.user = user;
        next();
    })
}

app.get('/users', (req, res) => {
    return res.send(users);
})

app.get('/posts', authenticateToken, (req, res) => {
    const user = req.user;
    const responseData = posts.filter(post => post.username === req.user.username);
    return res.send(responseData);
})

app.post('/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    for(i = 0; i < users.length; i++){
        if(users[i].username === username){
            return res.send("Usename already exists");
        }
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({username, password: hashedPassword});
        const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        return res.json({message:"SignUp Successful", token});
    }
    catch(error){
        return res.send("SignUp Failed");
    }
})

app.post('/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        let user = users.find(u => u.username === username);
        if(user == null){
            return res.send("User not found");
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched){
            return res.send("LogIn Failed, Incorrect password")
        }
        const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
        return res.json({message: "LogIn Successful", token});
    }
    catch(error){
        console.log(error.message);
        return res.send("LogIn Failed");
    }
})

app.listen(3000);
