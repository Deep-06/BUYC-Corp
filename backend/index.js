const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const {connection} = require('./db');
const { dealerRouter } = require('./routes/auth.routes');
const { inventoryRouter } = require('./routes/inventory.routes');
const { oemRouter } = require('./routes/oem.routes');

dotenv.config({path:"./.env"});

const app = express();

const port = process.env.PORT || 8080 ;

app.use(cors());
app.use(express.json());

app.use("/auth", dealerRouter);
app.use("/oem", oemRouter);
app.use("/inventory", inventoryRouter);

connection();

app.listen(port, ()=>{
 console.log(`Server is running at port ${port}`)
})