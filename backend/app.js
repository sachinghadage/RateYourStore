const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


app.use('/api/users', require('./routes/users'));
app.use('/api/stores', require('./routes/stores'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
