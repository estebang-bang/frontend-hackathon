

function updateDeletetrips() {
    const deleteTrip = document.querySelectorAll(".btnDelete");
	for (let i = 0; i < deleteTrip.length; i++) {
		deleteTrip[i].addEventListener('click', function () {
			fetch(`http://localhost:3000/cart/${this.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data) {
						this.parentNode.remove();
                        updateDeletetrips()
					}
				});
		});
	}
}