let store = document.querySelector(".store");
let tablesList = document.createElement("ul");
tablesList.classList.add("tablesList");
store.appendChild(tablesList);

fetch("/api")
  .then((res) => res.json())
  .then((db) => {
    showDBRecords(db);
    let forms = document.querySelectorAll("form.datosProducto");

    forms.forEach((form) => {
      form.querySelector(".btnChange").addEventListener("click", (e) => {
        e.preventDefault();
        let _id = form.querySelector('input[name="id"]').value;
        let size = form.querySelector('input[name="size"]').value;
        let material = form.querySelector('input[name="material"]').value;
        let color = form.querySelector('input[name="color"]').value;
        let legs = form.querySelector('input[name="legs"]').value;

        let dataToSend = { _id, size, color, material, legs };
        fetch("/update", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        })
          .then((res) => res.json())
          .then((db) => {
            showDBRecords(db);
          });
        console.log(_id, " Change request sended");
      });

      form.querySelector(".btnDelete").addEventListener("click", (e) => {
        e.preventDefault();

        let _id = form.querySelector('input[name="id"]').value;
        let dataToDelete = { _id };
        fetch("/delete", {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(dataToDelete),
        })
          .then((res) => res.json())
          .then((db) => {
            showDBRecords(db);
          });
        console.log(_id, " Delete request sended");
      });
    });
  });
// Añadir datos a la base de datos >>tienda>>mesas>>
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
      showDBRecords(db);
    });
});

function showDBRecords(db) {
  while (tablesList.firstChild) {
    tablesList.removeChild(tablesList.firstChild);
  }
  tablesList.innerHTML = "";
  db.forEach((mesa, i) => {
    tablesList.innerHTML += `
                      
                    <li class="mesa${i + 1}">
                      <form class="datosProducto">
                        <input type="text" name="id" value="${
                          mesa._id
                        }" hidden/>
                        <input type="text" name="size" value="${mesa.size}"/>
                        <input type="text" name="material" value="${
                          mesa.material
                        }"/>
                        <input type="text" name="color" value="${mesa.color}"/>
                        <input type="text" name="legs" value="${mesa.legs}"/>
                        <input type="submit" class="btn btnChange" value="Edit"/>
                        <input type="submit" class="btn btnDelete" value="Delete"/>      
                      </form>
                    </li>
                `;
  });
}
