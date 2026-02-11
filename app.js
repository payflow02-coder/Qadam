let map, directionsService, directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 43.238949, lng: 76.889709 },
        zoom: 12
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

function createOrder() {
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const distance = document.getElementById("distance").value;

    if(!phone || !address || !distance) {
        alert("Барлық өрістерді толтырыңыз!");
        return;
    }

    const price = distance * 500;
    const id = Date.now();
    const travelTime = ((distance / 40) * 60).toFixed(0);

    database.ref("orders/" + id).set({
        phone: phone,
        address: address,
        distance: distance,
        price: price,
        status: "Күтілуде",
        paymentStatus: "Төленбеген",
        eta: travelTime + " мин"
    });

    document.getElementById("result").innerHTML = `
        <b>Тапсырыс ID:</b> ${id} <br>
        <b>Баға:</b> ${price} тг <br>
        <b>Телефон:</b> ${phone} <br>
        <b>To:</b> ${address} <br>
        <b>Шамамен уақыт:</b> ${travelTime} мин <br>
        <a href="payment.html?id=${id}&price=${price}">
            <button>Онлайн төлеу</button>
        </a>
        <div class="status-bar" id="status-${id}">Статус: Күтілуде</div>
    `;

    const statusDiv = document.getElementById(`status-${id}`);
    setTimeout(()=> { 
        statusDiv.innerHTML = "Статус: Жолда"; 
        statusDiv.style.color = "#ff9800";
        database.ref("orders/" + id).update({status: "Жолда"});
    }, 5000);

    setTimeout(()=> { 
        statusDiv.innerHTML = "Статус: Жеткізілді"; 
        statusDiv.style.color = "#4caf50";
        database.ref("orders/" + id).update({status: "Жеткізілді"});
    }, 15000);
}
