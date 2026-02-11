const params = new URLSearchParams(window.location.search);
const orderId = params.get("id");
const price = params.get("price");

document.getElementById("orderInfo").innerText =
    `ID: ${orderId} | Сома: ${price} тг`;

function pay(method) {
    const statusDiv = document.getElementById("paymentStatus");
    statusDiv.innerText = "Төлем өңделуде...";
    statusDiv.style.color = "#ff9800";

    setTimeout(() => {
        database.ref("orders/" + orderId).update({
            paymentStatus: "Төленді",
            paymentMethod: method
        });

        statusDiv.innerText = `Төлем сәтті аяқталды (${method.toUpperCase()})`;
        statusDiv.style.color = "#4caf50";
    }, 2000);
}
