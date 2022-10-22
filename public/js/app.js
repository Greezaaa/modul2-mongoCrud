let store = document.querySelector(".store");
let tablesList = document.createElement("tablesList");
tablesList.classList.add("tablesList");
store.appendChild(tablesList);
fetch("/api")
  .then((res) => res.json())
  .then((db) => {
    console.log(db);

    db.forEach((mesa) => {
      tablesList.innerHTML += `
                  <li>
                     <input type="text" name="size" value="${mesa.size}"/>
                     <input type="text" name="material" value="${mesa.material}"/>
                     <input type="text" name="color" value=" ${mesa.color}"/>
                     <input type="text" name="legs" value=" ${mesa.legs}"/>
                  </li>
              `;
    });
  });

let btnAdd = document.querySelector(".btnAdd");

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();

  // recogemos datos de los campos
  let size = document.querySelector('input[name="size"]').value;
  let color = document.querySelector('input[name="color"]').value;
  let material = document.querySelector('input[name="material"]').value;
  let legs = document.querySelector('input[name="legs"]').value;

  // Añadir objeto a DataBase
  let newTable = { size, color, material, legs };

  fetch("/add", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newTable),
  })
    .then((res) => res.json())
    .then((db) => {
      console.log(db);

      tablesList.innerHTML = "";
      db.forEach((mesa) => {
        tablesList.innerHTML += `
                  <li>
                  <h2>Mesa:</h2>
                     <input type="text" name="size" value="${mesa.size}"/>
                     <input type="text" name="material" value="${mesa.material}"/>
                     <input type="text" name="color" value=" ${mesa.color}"/>
                     <input type="text" name="legs" value=" ${mesa.legs}"/>
                  </li>
              `;
      });
    });
});
let btnChange = document
  .querySelector(".btnChange")
  .addEventListener("click", (e) => {
    e.preventDefault();

    let color = document.querySelector(
      'form.makeChanges input[name="color"]'
    ).value;
    console.log(color);

    let objToChange = { color };
    fetch("/update", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(objToChange),
    })
      .then((res) => res.json())
      .then((db) => {
        console.log("Se mando color a DB", db);

        tablesList.innerHTML = "";
        db.forEach((mesa) => {
          tablesList.innerHTML += `
                  <li>
                  <h2>Mesa:</h2>
                     <input type="text" name="size" value="${mesa.size}"/>
                     <input type="text" name="material" value="${mesa.material}"/>
                     <input type="text" name="color" value=" ${mesa.color}"/>
                     <input type="text" name="legs" value=" ${mesa.legs}"/>
                  </li>
              `;
        });
      });
  });
