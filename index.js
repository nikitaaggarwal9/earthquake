const express = require("express");
const port = process.env.PORT || 8000;
const dotenv = require("dotenv").config();
const db = require("./config/mongoose");
const { fetchData } = require("./config/fetchData");

// Create Express app
const app = express();

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes"));

// Start the server
app.listen(port, (err) => {
	if (err) {
		console.log("Error when server starts!");
	}

	fetchData();
	console.log(
		`Server is running on port: ${port}`
	);
});
