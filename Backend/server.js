// require('dotenv').config()
// const app = require('./src/app')



// app.listen(3000, () => {
//     console.log('sever is running on : http://localhost:3000/')
// })

require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port: ${PORT}`)
})