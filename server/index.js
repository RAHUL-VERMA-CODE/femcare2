const express = require('express');
const routes = require("./routes/routes")
const app = express();
const PORT = 3000;
const sequelize = require("./config/database");
const fileUpload = require("express-fileupload");
const cors = require('cors')
// Middleware to parse JSON
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
})) 
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   
}));
app.use(express.json());
app.use('/api/v1', routes)
// Basic route

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

sequelize.sync({alter:true})
   .then(()=>{
        console.log("sync successfull".bgBlue)
    }).catch((err)=>{
        throw err
    })



