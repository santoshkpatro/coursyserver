require('dotenv').config()

if (process.env.NODE_ENV == 'local') {
    console.log('SERVER STARTED IN LOCAL MACHINE')
}

require('./config/db')

const app = require('./app')

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('SERVER STARTED AT PORT ' + port)
})
