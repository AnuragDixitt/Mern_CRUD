const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env'})
const PORT = process.env.PORT || 8080

// Log requests
app.use(morgan('tiny'));

// MongoDb connection
connectDB();

// Parse request to body-parser
app.use(bodyParser.urlencoded({extended: true}));

// Set view engine
app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname), 'views/ejs')

// Load static files
app.use('/css', express.static(path.resolve(__dirname, 'public/css')))
app.use('/js', express.static(path.resolve(__dirname, 'public/js')))
app.use('/image', express.static(path.resolve(__dirname, 'public/image')))

// Loading routers
app.use('/', require('./server/routes/router'));

app.listen(3000, () => {console.log(`Server is running on http://localhost:${PORT}`)});
