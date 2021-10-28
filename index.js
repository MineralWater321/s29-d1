//import express module and save it in a constant
const express = require("express");

//Create an application using express
const app = express();

//App server will listen to port 3000
const port = 3000;

//Setup for allowing the server to handle data from requests
//Allows the app to read json data
app.use(express.json());

//Allows the app to read data from forms
app.use(express.urlencoded({extended: true}));

//GET route
app.get("/", (req, res) => {
	res.send("Hello World");
})

app.get("/hello", (req, res) => {
	res.send("Hello from the /hello endpoint!");
})

//POST route

app.post("/hello", (req, res) => {
	res.send(`Hello there ${req.body.firstName} ${req.body.lastName}!`);
})

//Mock database
let users = [{"username": "johndoe", "password": "johndoe1234"}, {"username": "petesmith", "password": "smith456"}];

//Will create a signup post
app.post("/signup", (req, res) => {
	console.log(req.body);

	if(req.body.username !== '' && req.body.password !== ''){
		users.push(req.body);
		res.send(`User ${req.body.username} successfully registered`);
	}
	else{
		res.send("Please input BOTH username and password");
	}
})

//PUT request for changing the password
app.put("/change-password", (req,res) => {
	//Creates a variable to store the message to be sent back to the client(Postman)
	let message;

	//Creates a for loop that will loop through the elements of the "users" array
	for(let i=0; i < users.length; i++){
		if(req.body.username === users[i].username){

			users[i].password = req.body.password;

			message = `User ${req.body.username}'s password has been updated.`;
			break;
		}
		else{
			message = "User does not exist"
		}
	}
	res.send(message);
})

//Activity

// 1. Create a GET route that will access the "/home" route that will print out a simple message.
// 2. Process a GET request at the "/home" route using postman.
app.get("/home", (req, res) => {
	res.send("Welcome to the home page");
})


// 3. Create a GET route that will access the "/users" route that will retrieve all the users in the mock database.
// 4. Process a GET request at the "/users" route using postman.
app.get("/users", (req, res) => {
	res.send(users);
})


// 5. Create a DELETE route that will access the "/delete-user" route to remove a user from the mock database.
// 6. Process a DELETE request at the "/delete-user" route using postman.

app.delete("/delete-user", (req, res) => {
	for(let i=0; i < users.length; i++){
		if(req.body.username === users[i].username){

			users.splice(i, 1);

			message = `User ${req.body.username} has been deleted.`;
			break;
		}
		else{
			message = "User does not exist"
		}
	}
	res.send(message);
})

//Tells the server to listen to the port
app.listen(port, () => console.log(`Server is running at port ${port}`))