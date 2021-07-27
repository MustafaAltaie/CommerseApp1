const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://MustafaAltaie:4435966@mustafacluster.tzl1h.mongodb.net/myCommercePage?retryWrites=true&w=majority', function(err){
    if(!err) console.log('Connected to MongoDB');
});

require('./schema');