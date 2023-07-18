const Earthquake = require('../models/earthquake');
const axios = require("axios");

// Function to fetch and store data
module.exports.fetchData = async () => {
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

			console.log(
				"Data fetched and stored successfully."
			);
		}
	} catch (error) {
		console.error(
			"Error fetching and storing data:",
			error
		);
	}
}