var TodoList = {
	todo: [],

	addTodo: function (todoText) {
		this.todo.push({
			todoText: todoText,
			completed: false,
		});
	},
	changeTodo: function (position, newVal) {
		this.todo[position].todoText = newVal;
	},
	deleteTodo: function (position) {
		this.todo.splice(position, 1);
	},
	toggleCompleted: function (position) {
		let todoItem = this.todo[position];
		todoItem.completed = !todoItem.completed;
	},
	toggleAll: function () {
		let totalTodos = this.todo.length;
		let totalCompleted = 0;

		this.todo.forEach(function (item) {
			if (item.completed === true) {
				totalCompleted++;
			}
		});

		this.todo.forEach(function (todo) {
			if (totalCompleted === totalTodos) {
				todo.completed = false;
			} else {
				todo.completed = true;
			}
		});
	},
};

let handler = {
	toggleTodo: function () {
		TodoList.toggleAll();
		view.displayItems();
	},
	addItem: function () {
		let getInput = document.getElementById("userInput");
		if (getInput.value === "") {
			alert("Enter something to add in the list");
		} else {
			TodoList.addTodo(getInput.value);
			getInput.value = "";
			view.displayItems();
		}
	},
	changeTodo: function () {
		//debugger;
		let itemPosition = document.getElementById("item-position");
		let numberedPos = Number(itemPosition.value);
		let itemText = document.getElementById("item-text");
		TodoList.changeTodo(numberedPos, itemText.value);
		itemPosition.value = "";
		itemText.value = "";
		view.displayItems();
	},
	deleteTodo: function (pos) {
		TodoList.deleteTodo(pos);

		view.displayItems();
	},
	toggleCompleted: function () {
		let itemToToggle = document.getElementById("toggle-position");
		TodoList.toggleCompleted(itemToToggle.valueAsNumber);
		itemToToggle.value = "";
		view.displayItems();
	},
};

let view = {
	displayItems: function () {
		let getOl = document.getElementById("todoList");
		getOl.innerHTML = "";

		TodoList.todo.forEach(function (eachItem, position) {
			let liEl = document.createElement("li");
			liEl.style.fontWeight = "bold";
			liEl.style.fontSize = "1.2em";

			liEl.style.paddingTop = "0.8em";
			let liContent = eachItem.todoText;
			let todoState = eachItem.completed;
			if (todoState === true) {
				liEl.textContent = "✅ " + liContent + "     ";
			} else {
				liEl.textContent = "❎ " + liContent + "     ";
			}

			liEl.id = position;

			liEl.appendChild(this.deleteItems());
			getOl.appendChild(liEl);
		}, this);
	},
	deleteItems: function () {
		let btnEl = document.createElement("button");
		btnEl.textContent = "delete";
		btnEl.className = "deleteBtn";
		return btnEl;
	},
	setUpEventListeners: function () {
		let getTodolist = document.getElementById("todoList");
		getTodolist.addEventListener("click", function (event) {
			let clickTarget = event.target;
			if (clickTarget.className === "deleteBtn") {
				handler.deleteTodo(parseInt(clickTarget.parentNode.id));
			}
		});
	},
};

view.setUpEventListeners();
