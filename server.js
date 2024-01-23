const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');

// Only one app declaration is needed
const app = express();
const PORT = process.env.PORT || 3001;

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const sequelize = require('./config/connection');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

// Use `app`, not `router`, to define routes in server.js
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/login', (req, res) => {
  res.render('login');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
});
