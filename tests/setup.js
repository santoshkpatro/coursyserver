const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost:27017/coursy-test-db', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('mongoDB CONNECTED'))
    .catch((e) => console.log('SOMETHING WENT WRONG WHILE CONNECTING TO DB'))
