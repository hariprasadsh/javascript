//! builder pattern
class DatabaseConnection {
	constructor(host, port, username, password, database) {
		this.host = host;
		this.port = port;
		this.username = username;
		this.password = password;
		this.database = database;
	}
}

class DatabaseConnectionBuilder {
	constructor() {
		this.host = "localhost";
		this.port = 5432;
		this.username = "admin";
		this.password = "password";
		this.database = "mydb";
	}

	setHost(host) {
		this.host = host;
		return this;
	}

	setPort(port) {
		this.port = port;
		return this;
	}

	setUsername(username) {
		this.username = username;
		return this;
	}

	setPassword(password) {
		this.password = password;
		return this;
	}

	setDatabase(database) {
		this.database = database;
		return this;
	}

	build() {
		return new DatabaseConnection(
			this.host,
			this.port,
			this.username,
			this.password,
			this.database
		);
	}
}

// Usage
const connection = new DatabaseConnectionBuilder()
	.setHost("mydb.example.com")
	.setUsername("myuser")
	.setPassword("mypassword")
	.build();

//! prototype pattern
// Define the prototype object for database connection configuration
const dbConfigPrototype = {
	host: "localhost",
	port: 5432,
	database: "mydb",
	user: "myuser",
	password: "mypassword",

	// Method to create a new database connection
	createConnection() {
		// Implementation of creating a database connection
		// ...
	},
};

// Create new instances of the database connection configuration by cloning the prototype
const dbConfig1 = Object.create(dbConfigPrototype);
dbConfig1.database = "mydb1";

const dbConfig2 = Object.create(dbConfigPrototype);
dbConfig2.database = "mydb2";

// Now, dbConfig1 and dbConfig2 are instances of the database connection configuration
// with different database names, but they share the same properties and methods defined in the prototype

//! Chain of responsibility
// Define the middleware functions
const middleware1 = (req, res, next) => {
	console.log("Middleware 1");
	next();
};

const middleware2 = (req, res, next) => {
	console.log("Middleware 2");
	next();
};

const middleware3 = (req, res, next) => {
	console.log("Middleware 3");
	res.send("Request processed by middleware 3");
};

// Create the middleware chain
const middlewareChain = [middleware1, middleware2, middleware3];

// Define the request processing function
const processRequest = (req, res) => {
	let index = 0;

	const next = () => {
		const middleware = middlewareChain[index];
		if (middleware) {
			index++;
			middleware(req, res, next);
		}
	};

	next();
};

// Use the middleware chain
app.use((req, res) => {
	processRequest(req, res);
});

//! IIFE
(() => {
	const a = 10;
	const b = 20;
	console.log(a + b);
})();

//! Singleton pattern
class DatabaseConnectionSingleton {
	constructor() {
		if (!DatabaseConnectionSingleton.instance) {
			this.host = "localhost";
			this.port = 5432;
			this.username = "admin";
			this.password = "password";
			this.database = "mydb";

			DatabaseConnectionSingleton.instance = this;
		}

		return DatabaseConnectionSingleton.instance;
	}
}

//! Factory pattern
// Define a prototype object for the configuration
const configPrototype = {
	setProperty: function (key, value) {
		this[key] = value;
	},
	// Other common methods...
};

// Factory function to create new instances of the configuration
function createConfig() {
	const config = Object.create(configPrototype);
	return config;
}

// Usage
const config1 = createConfig();
config1.setProperty("database", "mongodb");

const config2 = createConfig();
config2.setProperty("database", "postgresql");

// config1 and config2 are instances of the configuration with different properties

//! Dependency injection
class UserService {
	constructor(userRepository) {
		this.userRepository = userRepository;
	}

	async getUsers() {
		const users = await this.userRepository.getUsers();
		return users;
	}
	async addUser(user) {
		await this.userRepository.addUser(user);
	}
}
class UserRepository {
	async getUsers() {
		// get users from database
	}
	async addUser(user) {
		// add user to database
	}
}
// Creating instances of the classes
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
// Using the userService object to get and add users
userService.getUsers();
userService.addUser({ name: "John", age: 25 });

//! Module pattern
// myModule.js

// Define a private variable
const privateVariable = "This is a private variable";

// Define a private function
function privateFunction() {
	console.log("This is a private function");
}

// Define a public function
function publicFunction() {
	console.log("This is a public function");
	privateFunction();
	console.log(privateVariable);
}

// Expose the public function
module.exports = {
	publicFunction,
};

//! Adapter pattern sample

// Define the Adaptee class

class LegacyAPI {
	getUsers() {
		// Implementation of the legacy API method
	}
}

// Define the Target class

class Target {
	getUserDetails(userId) {
		// Implementation of the target method
	}
}

// Define the Adapter class

class LegacyAPIAdapter {
	constructor(legacyAPI) {
		this.legacyAPI = legacyAPI;
	}

	getUserDetails(userId) {
		const user = this.legacyAPI.getUsers().find((user) => user.id === userId);
		if (user) {
			return {
				name: user.name,
				age: user.age,
			};
		} else {
			throw new Error("User not found");
		}
	}
}

// Usage

const legacyAPI = new LegacyAPI();
const legacyAPIAdapter = new LegacyAPIAdapter(legacyAPI);
const target = new Target();

const userDetails = legacyAPIAdapter.getUserDetails(1);

target.getUserDetails(userDetails.id); // This will call the Target's getUserDetails method with the adapted user details.

//! Decorator pattern
// Define the original function
function greet(name) {
	console.log(`Hello, ${name}!`);
}

// Define the decorator function
function withLogging(func) {
	return function (...args) {
		console.log("Calling function:", func.name);
		const result = func.apply(this, args);
		console.log("Function returned:", result);
		return result;
	};
}

// Use the decorator to add logging to the greet function
const greetWithLogging = withLogging(greet);

// Call the decorated function
greetWithLogging("John");
