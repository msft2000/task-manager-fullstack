const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./dataBase/conect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();
const port = process.env.PORT || 3000;
 //middleware
app.use(express.static('./public'));
app.use(express.json());
//routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// const start = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI);
//         app.listen(port, console.log(`server is listening on port ${port}...`));
//     } catch (error) {
//         console.log(error);
//     }
// }
// start()
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
module.exports = app;
module.exports.handler = serverless(app);

