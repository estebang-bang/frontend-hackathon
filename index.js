const chercher = document.querySelector("#btnSearch");

chercher.addEventListener('click', function () {
  const infosRecherche = {
    departure: document.querySelector("#pickDeparture").value,
    arrival: document.querySelector("#pickArrival").value,
    date : document.querySelector('#pickDate').value,
  };

  fetch("http://localhost:3000/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(infosRecherche),
  })
    .then((response) => response.json())
    .then(data => {
      if(data)
      {
        document.querySelector("#results").innerHTML ='';
        for (let i = 0; i < data.length; i++) {
        document.querySelector("#results").innerHTML += `
            <div class="tripContainer">
                <p>${data[i].departure} > ${data[i].arrival}</p>
                <p>HORAIRE</p>
                <p>${data[i].price}€</p>
                <button>Book</button>
            </div>`;
      }}
      else {
        document.querySelector('#iconeRecherche').src='/images/notfound.png'
        
      }
    });
});
