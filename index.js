const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use('/static', express.static('static')); 
// app.use('/', (req, res, next)=>{
//     const {authtoken} = req.query;
//     if(!authtoken) {
//         res.status(403).json({error: "Missing auth token"});
//     }else{          //without this else above response will be passed whether any authtoken is passed or not
//         next();     //This will send the req to the next one in the call queue for which the call is made
//     }
// })

// app.use('/', (req, res, next) => {
//     console.log(new Date().getTime(), req.ip);
//     next();     //writting it is very important 
// })

const users = [{"userId":"uid1","name":"sid"},{"userId":"uid2","name":"deep"}];

app.get('/', (req, res) => {
    // res.status(500).send('Hello');      //check console / n/w tab 
    // res.json({text: 'hello world'});
    res.json(users);

});

app.get('/login', (req, res) => {
    res.render('login');
})

// /:foo this will take anything if return after '/' as parameter in the name of 'userId' we could have named it anything e.g.: :foo
app.get('/:userId', (req, res) => {
    console.log(req.params, req.query); //see the output and try changing the name to 'foo' and then try
    const { userId } = req.params;
    res.json(users.filter((value) => {  //filters the array on the basis of the true/false nature of returned o/p for each callBack and finally return an array 
        return value.userId === userId ;
    }));
})

app.post('/', (req, res) => {
    // console.log(req);
    const {userId, name} = req.body;
    users.push({
        userId,
        name
    })
    res.send('Hello from POST');
})

app.listen(3100, () => {
    console.log('Server Started');
})