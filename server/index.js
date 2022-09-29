const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const routes = require('./routes/routes');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth-routes')(app);

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});

mongoose.connect(keys.mongoURI);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
})
app.use('/api', routes);