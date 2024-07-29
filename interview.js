/**
 * *polyfill for bind method
 */
let myName = {
	firstName: "John",
	lastName: "Doe",
};

let introduce = function (place, state, country) {
	console.log(
		`Hello, my name is ${this.firstName} ${this.lastName} from ${place}, ${state}, ${country}`
	);
};
// using bind method
let intro = introduce.bind(myName);
//intro();

// using alternate for bind
Function.prototype.myBind = function (...args) {
	let obj = this; // here points to introduce method
	let params = args.slice(1);
	return function (...args2) {
		obj.apply(args[0], [...params, ...args2]);
	};
};
let intro2 = introduce.myBind(myName, "Vazhottukonam");
//intro2("Kerala", "India");
