let array = [];
// get data from the api
function getData() {
  var xmlRequest = new XMLHttpRequest();
  xmlRequest.open(
    "GET",
    "https://jsonplaceholder.typicode.com/todos?_limit=100"
  );

  xmlRequest.send();
  xmlRequest.onload = function () {
    if (xmlRequest.status >= 200 && xmlRequest.status < 300) {
      const response = JSON.parse(xmlRequest.responseText);
      array = JSON.parse(JSON.stringify(response));
      createOptionUser();
    }
  };
}
getData();

const dropDown = document.querySelector(".todo__completed");
const myDiv = document.querySelector(".todo");
dropDown.onchange = function () {
  reset();
  completed();
  progress();
};
//get all fun

function reset() {
  if (dropDown.value == "all") {
    myDiv.innerHTML = "";
    array.map((item) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("todo_item");
      myDiv.appendChild(newDiv);

      if (item.completed == true) {
        newDiv.innerHTML = `
   <div class='green' ">user id (${item.userId})${item.title} and id = ${item.id}</div>`;
      } else {
        newDiv.innerHTML = `
   <div class='yellow' for="todo${item.id}">user id (${item.userId}) ${item.title} and id =  ${item.id}</div>`;
      }
    });
  }
}
// completed fun
function completed() {
  if (dropDown.value == "completed") {
    const complet = array.filter((item) => {
      return item.completed == true;
    });
    myDiv.innerHTML = "";
    complet.map((item) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("todo_item");
      myDiv.appendChild(newDiv);
      newDiv.innerHTML = `
   <div class='green'${item.id}">user id(${item.userId}) ${item.title} and the id = ${item.id}</div>`;
    });
  }
}
// progress fun
function progress() {
  if (dropDown.value == "progress") {
    const progres = array.filter((item) => {
      return item.completed == false;
    });
    myDiv.innerHTML = "";
    progres.map((item) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("todo_item");
      myDiv.appendChild(newDiv);
      newDiv.innerHTML = `
   <div class='yellow' for="todo${item.id}"> user id(${item.userId}) ${item.title} and the id = ${item.title}</div>`;
    });
  }
}

/// create dropdown for users
const search = document.querySelector(".search");

function createOptionUser() {
  let userNumber = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].userId > userNumber) {
      userNumber = array[i].userId;
    }
  }
  for (let i = 1; i <= userNumber; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.innerText = i;
    search.appendChild(option);
  }
}

search.onchange = function () {
  const newArray = [...array];
  const value = search.value;
  array = array.filter((item) => {
    return item.userId == value;
  });
  reset();
  completed();
  progress();
  array = [...newArray];
};
