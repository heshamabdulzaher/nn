let AllTodos = [];
let filteredTodos = [];
let users_IDs = [];
let statuses = ['All', 'Completed', 'Not Completed'];
let filters = {
	userId: null,
	completed: null,
};

// Get the todos list on page load
window.onload = () => {
	var xmlRequest = new XMLHttpRequest();
	xmlRequest.open(
		'GET',
		'https://jsonplaceholder.typicode.com/todos?_limit=100'
	);

	xmlRequest.send();
	xmlRequest.onload = function () {
		if (xmlRequest.status >= 200 && xmlRequest.status < 300) {
			const res = JSON.parse(xmlRequest.responseText);
			AllTodos = res;
			filteredTodos = AllTodos.slice();
			AllTodos.forEach(todo => {
				if (!users_IDs.includes(todo.userId)) {
					users_IDs.push(todo.userId);
				}
			});
			renderFilters();
			renderTodos();
		}
	};
};

function renderFilters() {
	// Inject Users & statuses filters into the DOM
	const usersDDL = document.querySelector('select.users-ddl');
	const statusesDDL = document.querySelector('select.statuses-ddl');
	// Fill users ddl
	users_IDs.unshift('All');
	usersDDL.innerHTML = ''
	users_IDs.forEach(id => {
		usersDDL.innerHTML += `<option value="${id}">${id}</option>`;
	});
	// Fill statuses ddl
	statusesDDL.innerHTML = ''
	statuses.forEach(status => {
		statusesDDL.innerHTML += `<option value="${status}">${status}</option>`;
	});
}

function renderTodos() {
	// Inject todos list into the DOM
	const todosListWrapper = document.querySelector('.todos-list ul');
	todosListWrapper.innerHTML = '';
	filteredTodos.forEach(todo => {
		todosListWrapper.innerHTML += `<li class=${todo.completed ? 'completed' : ''}>${
			todo.title
		}</li>`;
	});
	
	// show the quantity
	const quantity = document.querySelector('.todos-list h2 span');
	quantity.innerHTML = `(${filteredTodos.length})`
}

function setFilters(e, keyword) {
	let value = e.target.value;
	if(keyword === 'completed'){
		if(value === 'Completed'){
			value = true
		}
		if(value === 'Not Completed'){
			value = false
		}
	}else if(keyword === 'userId' && value !== 'All'){
		value = parseInt(value);
	}
	filters[keyword] = value === 'All' ? null : value;
	const updatedFilters = Object.entries(filters).filter(([key, value]) => value !== null);
	const isSubset = (superObj, subObj) => {
		return Object.keys(subObj).every(ele => {
			if (typeof subObj[ele] == 'object') {
				return isSubset(superObj[ele], subObj[ele]);
			}
			return subObj[ele] === superObj[ele]
		});
	};
	const updated = AllTodos.filter(todo => isSubset(todo, Object.fromEntries(updatedFilters)));
	filteredTodos = updated;
	renderTodos();
}
