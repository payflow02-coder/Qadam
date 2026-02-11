database.ref("orders").on("value", function(snapshot){
    const data = snapshot.val();
    const ordersDiv = document.getElementById("orders");
    ordersDiv.innerHTML = "";

    for(let id in data){
        const order = data[id];
        const statusColor = order.status === "Жеткізілді" ? "#4caf50" : order.status === "Жолда" ? "#ff9800" : "#333";
        const paymentColor = order.paymentStatus === "Төленді" ? "#4caf50" : "#e60012";

        ordersDiv.innerHTML += `
            <div class="order-card">
                <p><b>ID:</b> ${id}</p>
                <p><b>Телефон:</b> ${order.phone}</p>
                <p><b>Мекенжай:</b> ${order.address}</p>
                <p><b>Баға:</b> ${order.price} тг</p>
                <p><b>ETA:</b> ${order.eta}</p>
                <p class="status-bar" style="color:${statusColor};"><b>Статус:</b> ${order.status}</p>
                <p class="status-bar" style="color:${paymentColor};"><b>Төлем:</b> ${order.paymentStatus}</p>
            </div>
        `;
    }
});
