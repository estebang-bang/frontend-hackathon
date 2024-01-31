fetch("http://localhost:3000/cart/")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.Panier.length; i++) {
      document.querySelector("#tripContainer").innerHTML += `
                <div class="tripContainer">
                <p>${data.Panier[i].departure} > ${data.Panier[i].arrival}</p>
                <p>HORAIRE</p>
                <p>${data.Panier[i].price}€</p>
                <button class='btnDelete' id=${data.Panier[i]._id}>X</button>
                </div>`;
      updateDeletetrips();
    }
  });

function updateDeletetrips() {
  const deleteTrip = document.querySelectorAll(".btnDelete");
  for (let i = 0; i < deleteTrip.length; i++) {
    deleteTrip[i].addEventListener("click", function () {
      fetch(`http://localhost:3000/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: this._id }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.parentNode.remove();
        });
    });
  }
}
