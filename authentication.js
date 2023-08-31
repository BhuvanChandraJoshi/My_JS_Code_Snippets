const express = require('express');

const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    res.json(users);
})

app.post('/users/signup', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        let user = null; 
        user = users.find(u => u.username === username);
        if(user != null){
            console.log(user);
            return res.send("Username alread exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({username, password: hashedPassword});
        return res.send('SignUp successful');
    }
    catch(error){
        return res.send('SignUp failed');
    }
})

app.post('/users/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try{
        const user = users.find(u => u.username === username);
        if(!user){
            return res.send("User not found");
        }
        console.log(password)
        console.log(user.password)
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched){
            return res.send("Login failed, incorrect password");
        }
        return res.send("Login successful");
    }
    catch(error){
        return res.send("Login failed");
    }
})

app.listen(3000);
