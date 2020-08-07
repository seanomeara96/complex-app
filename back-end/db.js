// Prevents application from starting 
// without a db connection
const dotenv = require('dotenv');
dotenv.config();
const mongodb = require('mongodb');
mongodb.connect(process.env.CONNECTIONSTRING, {useUnifiedTopology:true}, (err, client) => {
    if (err) {
        console.log(err);
    };
    module.exports = client;
    const app = require('./app');
    app.listen(process.env.PORT);
});
