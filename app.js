const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        });
    }
    next();
});

const config = require('./config.js');
const {expressjwt:expressJWT} = require('express-jwt');
app.use(expressJWT({secret: config.jwtSecretKey, algorithms: ["HS256"]}).unless({path: [/^\/api\//]}));

app.use('/uploads', express.static('./uploads'));

//Register the router
const userRouter = require('./router/user');
app.use('/api', userRouter);
const userInfoRouter = require('./router/userInfo');
app.use('/my', userInfoRouter);
const subjectRouter = require('./router/subject');
app.use('/my', subjectRouter);
const articleRouter = require('./router/article');
app.use('/my/article', articleRouter);


const joi = require('joi');
app.use((err, req, res, next) => {
    //Data validation error
    if(err instanceof joi.ValidationError) return res.cc(err);
    //Unauthorized error
    if(err.name === 'UnauthorizedError') return res.cc('Authorization failed');
    //Unknown error
    return res.cc(err);
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});