const express = require('express');
const app = express();
const path = require('path');

const users = [];
console.log(users);

app.use(express.json()); // Middleware for parsing JSON data
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded form data

app.use('/site', express.static(path.join(__dirname, 'public')));//makes static design as dynamic

app.set('view-engine', 'ejs');

// app.post('/register', (req, res) => {
//     const newUser = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//     };
//     users.push(newUser);
//     console.log('Successfully registered:', newUser);
//     res.redirect('/login');
// });
app.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
        console.log('Password and Confirm Password do not match');
        res.redirect('/register');
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,
    };
    users.push(newUser);
    console.log('Successfully registered:', newUser);
    res.redirect('/login');
});


app.post('/login', (req, res) => {
    const user = users.find((user) => user.email === req.body.email);
    if (user && user.password === req.body.password) {
        console.log('Successfully logged in');
        res.render('dashboard.ejs');
    } else {
        console.log('Incorrect email or password');
        res.redirect('/login');
    }
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});


// app.get('/dashboard', (req, res) => {
//     res.render('dashboard.ejs');
// });
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});