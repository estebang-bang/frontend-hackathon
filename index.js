// const URL_SERV = require("http://localhost:3000/trips");

const btnSearch = document.querySelector("#btnSearch");

btnSearch.addEventListener("click", function () {
  const recherche = {
    departure: document.querySelector("#rechercheDepart").value,
    arrival: document.querySelector("#rechercheArrivee").value,
  };
//   console.log(document.querySelector('#pickDate').value)

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recherche),
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#results").innerHTML ='';
      for (let i = 0; i < data.length; i++) {
    document.querySelector('#results').innerHTML += `
          <div class="results">
            <div class="trajets">
              <p>${data[i].departure} > ${data[i].arrival}</p>
              <p>${data[i].price}€</p>
              <button class="btnBook">Book</button>
            </div>
          </div>`;}
        })
    });
