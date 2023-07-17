const mongoose = require('mongoose');
const axios = require("axios");

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


// Function to fetch and store data
async function fetchData() {
	try {
		const data = await Earthquake.find({});

		if (data.length === 0) {
			const response = await axios.get(
				"https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json"
			);

			const earthquakes =
				response.data.Infogempa.gempa.map(
					(gempa) => {
						return {
							magnitude: parseFloat(
								gempa.Magnitude
							),
							depth: parseFloat(
								gempa.Kedalaman
							),
							location:
								gempa.Wilayah,
							coordinates: [
								parseFloat(
									gempa.Bujur
								),
								parseFloat(
									gempa.Lintang
								),
							],
						};
					}
				);

			await Earthquake.insertMany(
				earthquakes
			);
			// console.log(earthquakes);

			console.log(
				"Data fetched and stored successfully."
			);
			process.exit(0); // Exit the script after storing data
		}
	} catch (error) {
		console.error(
			"Error fetching and storing data:",
			error
		);
		process.exit(1); // Exit the script with an error
	}
}

fetchData();

module.exports = Earthquake;