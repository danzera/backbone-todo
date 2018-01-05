// Model Definition
// - Models are classes, so they are capitalized
// - Our Todo Model extends Backbone.Model and simply defines default values for two data attributes
// - Backbone Models provide many features, but first and foremost a Model is a data container
// - Backbone.Model implements the Model aspect of MVC
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
// since we don't provide a value for 'completed', the default value is used
var myToDo = new ToDo({
	title: 'Check attributes property of the logged models in the console.',
	cheese: 'cheddar' // random properties can be added at time of instantiation - not sure if this is bad practice
});

console.log('myToDo instance', myToDo);
console.log('myToDo attributes', myToDo.attributes);

var anotherToDo = new ToDo({});

console.log('anotherToDo instance', anotherToDo);
console.log('anotherToDo attributes', anotherToDo.attributes);

// ToDoView is defined by extending Backbone.View
// Backbone.View implements the View aspect of MVC
// ^ however, Backbone departs from MVC when it comes to Controllers
// the Controller responsibility is also addressed within the View
var ToDoView = Backbone.View.extend({
	tagName: 'li',
	// cache the template fuction for a single item
	// http://underscorejs.org/#template
	toDoTpl: _.template( $('#item-template').html() ),

	// rather than having requests in the traditional sense, we have events with Backbone
	// the 'events' ATTRIBUTE fulfills the role of the Controller configuration
	// it defines how events that occur within the View's DOM element are to be routed to event-handling methods defined in the View
	// events can be traditional browser DOM events (e.g., click events)
	// or internal application events such as Model changes
	events: {
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	// called when the View is first created
	initialize: function() {
		this.$el = $('#to-do');
		// Later we'll look -> this.listenTo(someCollection, 'all', this.render);
    // but this example can be run as-is by calling toDoView.render();
	},

	render: function() {
		// $el here is a reference to the jQuery element associated with the View
		// toDoTpl is a reference to an Underscore template
		// model.attributes constains the attributes of the model (as shown further above)
		// altogether, the statement is replacing the HTML of a DOM element with the result of instantiating a template with the model's attributes
		this.$el.html( this.toDoTpl(this.model.attributes) );
		this.input = this.$('.edit');
		return this;
	},

	edit: function() {
		// executed when toDo label is double-clicked
		console.log('toDo label double clicked!');
	},

	close: function() {
		// executed when toDo loses focus
		console.log('toDo lost focus!');
	},

	updateOnEnter: function(e) {
		// executed on each keypress when in to-do edit mode
		// but we'll wait for enter to get in action
		console.log('updateOnEnter event', e);
	}
});

// a ToDoView is instantiated with an associated Model
// the render() method uses a template to construct the HTML for the to-do item which is placed inside an <li> element
// each call to render() will replace the content of a DOM element using the attributes of an associated Model
// later we'll see how a View can bind its render() method to Model change events, causing the View to re-render whenever the Model changes
var toDoView = new ToDoView({model: myToDo});

toDoView.render();