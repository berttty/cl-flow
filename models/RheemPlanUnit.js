const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for RheemPlan
let RheemplanUnit = new Schema({  },{ strict: false});


module.exports = mongoose.model('RheemPlanUnit', RheemplanUnit);
