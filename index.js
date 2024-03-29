const chercher = document.querySelector("#btnSearch");

chercher.addEventListener("click", function () {
  const infosRecherche = {
    departure: document.querySelector("#pickDeparture").value,
    arrival: document.querySelector("#pickArrival").value,
    date: document.querySelector("#pickDate").value,
  };

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infosRecherche),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.trips.length) {
        document.querySelector("#results").innerHTML = "";
        for (let i = 0; i < data.trips.length; i++) {
          document.querySelector("#results").innerHTML += `
            <div class="tripContainer">
                <p>${data.trips[i].departure} > ${data.trips[i].arrival}</p>
                <p>${new Date(data.trips[i].date).getHours()}:${new Date(data.trips[i].date).getMinutes()}</p>
                <p>${data.trips[i].price}€</p>
                <button class='btnaddToCart' id=${data.trips[i]._id}>Book</button>
            </div>`;

          addToCart();
        }
      } else {
        document.querySelector("#iconeRecherche").src = "/images/notfound.png";
      }
    });
});

function addToCart() {
  //sélectionne le bouton qui envoie le trajet selectionné à cart
  let btnAdd = document.querySelectorAll(".btnaddToCart");
  // Supprime le trajet selectionné auparavant lorsqu'on appuie sur le bouton
  for (let i = 0; i < btnAdd.length; i++) {
    btnAdd[i].addEventListener("click", function () {
      // this.disable = true
      const tripBooked = {
        departure: this.departure,
        arrival: this.arrival,
        date: this.date,
        id: this.id,
      }
      //Ajoute l'élément sélectionné dans la collection cart
      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripBooked),
      });
    });
  }
}
