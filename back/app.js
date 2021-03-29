const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();

const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db연결 성공');
  })
  .catch(console.error);

passportConfig();

app.use(morgan('dev'));
//prod
// app.use(cors({
//   origin: 'https://nodebird.com'
// }))
app.use(cors({
  origin: 'http://localhost:3060',
  credentials: true,
}));
// localhost:3065/__dirname : 현재 폴더/uploads
app.use('/', express.static(path.join(__dirname, 'uploads')));
// json post 방식
app.use(express.json());
// form submit -> url encoded 방식
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('nodebirdsecret'));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

// url, method
app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/', (req, res) => {
  res.send('hello api');
});

// prefix
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

app.listen(3065, () => {
  console.log('서버 실행 중');
});