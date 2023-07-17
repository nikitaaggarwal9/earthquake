const Earthquake = require('../models/earthquake');

// API endpoint to fetch data in GeoJSON format
module.exports.get =  async (req, res) => {
	try {
		const earthquakes =
			await Earthquake.find().exec();

		const features = earthquakes.map(
			(earthquake) => {
				return {
					type: "Feature",
					geometry: {
						type: "Point",
						coordinates:
							earthquake.coordinates,
					},
					properties: {
						magnitude:
							earthquake.magnitude,
						depth: earthquake.depth,
						location:
							earthquake.location,
					},
				};
			}
		);

		const geoJsonData = {
			type: "FeatureCollection",
			features,
		};

		return res.render("main", {
			earthquakes: geoJsonData,
		});
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
		});
	}
};