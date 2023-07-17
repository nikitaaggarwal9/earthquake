const express = require("express");
const db = require('./config/mongoose');

// Create Express app
const app = express();

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use('/', require('./routes'));

// Start the server
app.listen(3000, (err) => {
	if (err) {
		console.log("Error when server starts!");
	}
	console.log("Server listening on port 3000");
});
