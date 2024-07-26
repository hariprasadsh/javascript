// *closures
function x() {
	var a = 10;

	const z = () => {
		console.log(a);
	};
	a = 20;
	return z;
}

// const y = x();
// y(); // will output the second value of a

// *settimeout
function a() {
	var b = 100;

	setTimeout(() => {
		console.log(b);
	}, 3000); // the closure will contain the value of b

	console.log("Hello World!"); // this doesn't wait for the timer to complete
}

// a();

// *interview question with settimeout
// write a function to print numbers 1-5 (after 1 sec, print 1. after 2 sec, print 2 and so on)
function c() {
	// do not put var because it will be only reference and the valie of i will not be new every time the loop executes
	// sepa
	for (let i = 1; i <= 5; i++) {
		setTimeout(() => {
			console.log(i);
		}, i * 1000);
	}
}

// c();

// *the same question by using var insted of let
function d() {
	for (var i = 1; i <= 5; i++) {
		// every time the function e runs it will create a new space for the variable
		// this is a closure
		function e(j) {
			setTimeout(() => {
				console.log(j);
			}, j * 1000);
		}
		e(i);
	}
}

// d();

// *advantages of closures (data hiding and encapsulation)
function counter() {
	var count = 0;
	return () => {
		count++;
		console.log(count);
	};
}
// if we try to access the count variable it will throw a reference error
//console.log(count);

/**
 * we can access the count only through the inner function because of closure
 */
var result1 = counter();
result1();
result1();
// or we can call
// var result = counter()();

// if we create a new variable and call the same function, it will create a new closure
var result2 = counter();
result2();

// *constructor functions
function consrtuctorFunction() {
	var count = 0; // ! here count cannot be garbage collected because it is used by increment and decrement forming a closure

	// the below given are constructor functions
	this.increment = () => {
		count++;
		console.log(count);
	};

	this.decrement = () => {
		count--;
		console.log(count);
	};
}

// ! whenever a constructor function is initialised, it is called with a new keyword
var constr1 = new consrtuctorFunction();
constr1.increment();
constr1.decrement();

/**
 * *disadvantages of closures
 * over consumption of memory
 * closure variables are not garbage collected
 * if not handled properly, it may lead to memory leaks
 * garbage collector frees up the unused memory
 * js will do the garbage collection unlike c and c++
 */

/**
 * *smart garbage collection (v8 engine does this)
 */
function smartG() {
	var a = 100; // ! here a is garbage collected because a is not used by the inner function
	var g = "hello";

	return () => {
		console.log(g);
	};
}

// ! main difference between a fn statement and fn expression is hoisting
// *function statement aka function declaration eg.
// something(); // ! this will work fine
function something() {
	console.log("hello");
}

// *function expression
// expression(); // ! this will throw a type error
var expression = function () {
	console.log("hey");
};

/**
 * *anonymus functions
 * they are used when functions are used as values
 * they can only be assigned to a variable
 * ! if we use anonymus function as statement, it will thrw a syntax error
 */
// function () {
//     console.log("hi");
// }

// *named function expression
var namedExp = function abc() {
	console.log(abc);
};
namedExp();
// abc(); // ! if we try to call the function with its name, we will get a reference error because the abc is not a function in outer scope

// *difference between parameters and arguments
function sum(num1, num2) {
	// ! here num1 and num2 are called parameters or the labels/identifiers which get the value
	console.log(num1 + num2);
}

// sum(1, 2); // ! the values which we pass to the functions are called arguments

// *first class functions
// the ability to use the function as a value, pass as an argument to another function is known as first class functions

/**
 * *callback function
 * functions that are passed as arguments to another function
 */
function myFunc(num1, num2, callback) {
	// the callback function will be executed in the context of the myFunc function
	callback();
	console.log(num1 + num2);
}

// myFunc(1, 2, () => {
//   console.log("end of execution");
// });

// *another example
// setTimeout(() => {
// 	console.log("timer"), 5000;
// });

function x(y) {
	y();
	console.log("x");
}

x(function y() {
	console.log("y");
});

/**
 * *eventlisteners
 * ! eventlisteners like closures take up memory
 * ! good practice is to romove event listeners
 */
function attachEventListeners() {
	count = 0;
	// add event listener to button
	document.getElementById("buttonClick").addEventListener("click", () => {
		console.log("clicked", ++count);
	});
}
attachEventListeners();

// *eventloops, callback queue and microtask queue
//console.log("start");

// setTimeout(() => {
// 	console.log("timer");
// }, 5000);

// fetch("https://api.netflix.com").then(() => console.log("netflix"));

// console.log("end");

/**
 * ! microtask queue has higher priority than the callback queue
 * ! the callbacks coming from promises and mutation observers go to microtask queue
 * ! all other callbacks go to callback queue
 */

/**
 * *STARVATION of callback queue
 * ! when the callback fn in microtask queue creates another microtask and it creates another and so on
 * ! the callback queue never gets a chance to execute. This is called the starvation of the callback queue
 */

/**
 * *Javascript runtime environment
 * JIT - It uses both interpreter and compiler to run the JS code
 * Interpreter converts the AST into bytecode
 * Compiler works on the optimization
 * Garbage collector - Mark and sweep algorithm
 */

/**
 * *higher order functions eg.
 */
// common function that accepts an array of radius and do some math operations
function calculate(numArray, logic) {
	const result = [];
	for (var i = 0; i < numArray.length; i++) {
		result.push(logic(numArray[i]));
	}
	console.log(result);
} // !this is a higher order function

// function to find the area of circle
function area(radius) {
	return Math.PI * Math.pow(radius, 2);
}

// function to find the circumference of circle
function circumference(radius) {
	return 2 * Math.PI * radius;
}

calculate([1, 2, 3], area);
calculate([1, 2, 3], circumference);

/**
 * *pure function eg.
 */
function add(a, b) {
	return a + b;
}

console.log(add(1, 2));

/**
 * *map, filter and reduce eg.
 */
const arr = [1, 2, 3, 4];

// get double the values in the array using map
const double = arr.map((i) => {
	return i * 2;
});
console.log(double);

// get binary values of the numbers in the array using map
function binary(x) {
	return x.toString(2);
}

console.log(arr.map(binary));

// find the odd numbers inside the array using filter
const arr1 = [2, 5, 8, 11, 13];
const odd = arr1.filter((x) => x % 2 !== 0);
console.log(odd);

// find the sum of all numbers in the array using reduce
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(arr2.reduce((acc, current) => acc + current));

// find the maximum number in the array using reduce
console.log(arr1.reduce((acc, current) => (acc > current ? acc : current)));

// *realworld examples of map,filter and reduce
// return the full name from the given array
const users = [
	{ firstName: "john", lastName: "Smith", age: 32 },
	{ firstName: "jane", lastName: "Doe", age: 29 },
	{ firstName: "tim", lastName: "Johnson", age: 32 },
	{ firstName: "joe", lastName: "Brown", age: 32 },
	{ firstName: "bill", lastName: "Gates", age: 55 },
];
const fullNames = users.map((user) => user.firstName + " " + user.lastName);
console.log(fullNames);

// find the age and number of people having that age. eg. {32: 3, 29: 1, 55: 1}
const ageGroups = users.reduce((acc, user) => {
	if (acc[user.age]) {
		acc[user.age] = ++acc[user.age];
	} else {
		acc[user.age] = 1;
	}
	return acc;
}, {});
console.log(ageGroups);

// find the first name of the persons whose age is less than 30 (chaining)
// const finalUsers = users
// 	.filter((user) => {
// 		return user.age < 30;
// 	})
// 	.map((user) => user.firstName);
const finalUsers = users.reduce((acc, user) => {
	if (user.age < 50) {
		acc.push(user.firstName);
	}
	return acc;
}, []);
console.log(finalUsers);
