const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB

//NEED TO SETUP PROCESS? CONNECTION STRING
mongoose.connect('mongodb://localhost:27017/', {
    //You can delete these after mongoose v6.0
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
