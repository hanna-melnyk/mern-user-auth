//backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
/*^^ tells dotenv to load the variables from .env into process.env,
making them accessible throughout application.*/

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());


//Middleware for cookies------------------------------------------------------------------------------
const cookieParser = require('cookie-parser');
app.use(cookieParser());



// CORS configuration ---------------------------------------------------------------------------------------
const corsOptions = {
    origin: "http://localhost:3000", // matches the URL of the frontend application
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));
/* ^^ tells Express app to use CORS with the defined options,
enabling cross-origin requests from the specified origins.
`origin` key specifies which domains are allowed to access backend*/




// DB connection --------------------------------------------------------------------------------------------
// Construct the MongoDB URI
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbUriTemplate = process.env.DB_URI;
const dbUri = dbUriTemplate.replace('<username>', username).replace('<password>', password);

mongoose.connect(dbUri)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

