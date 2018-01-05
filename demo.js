// Model Definition
// - models are classes, so they are capitalized
// - Backbone Models provide many features, but first and foremost a Model is a data container.
var ToDo = Backbone.Model.extend({
	// default values for a to-do item
	// if a value is not provided at instantiation, these values will be used
	defaults: {
		title: '',
		completed: false
	}
});

// Model Instantiation
// this is an instance of the ToDo class, so it's camelCased
var myToDo = new ToDo({
	title: 'Check attributes property of the logged models in the console.',
	cheese: 'cheddar' // random properties can be added at time of instantiation - not sure if this is bad practice
});

console.log('myToDo instance', myToDo);
console.log('myToDo attributes', myToDo.attributes);

var anotherToDo = new ToDo({});

console.log('anotherToDo instance', anotherToDo);
console.log('anotherToDo attributes', anotherToDo.attributes);