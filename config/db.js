const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('MONGO DB CONNECTED'))
    .catch((e) => console.log('SOMETHING WENT WRONG WHILE CONNECTING TO DB'))
