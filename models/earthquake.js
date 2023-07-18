const mongoose = require('mongoose');

// Define mongoose schema for earthquake data
const earthquakeSchema = new mongoose.Schema({
	magnitude: Number,
	depth: Number,
	location: String,
	coordinates: {
		type: [Number],
		index: "2dsphere", // Required for GeoJSON queries
	},
});

// Define mongoose model
const Earthquake = mongoose.model(
	"Earthquake",
	earthquakeSchema
);

module.exports = Earthquake;