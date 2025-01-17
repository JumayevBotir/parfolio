// Telegram bot sozlamalari
let tg = {
    token: "8009108477:AAG-zJ57XbdS6Zxau8b8eqHhQ7x1jlJNNDw",  // O'zingizning Telegram bot tokeningiz
    chat_id: "-1001926041752"  // O'zingizning chat ID
};

// Formani tanlash
let form = document.querySelector('#contactForm');
let formInputs = document.querySelectorAll("[data-form-input]");
let formBtn = document.querySelector("[data-form-btn]");

// Enable/Disable submit button based on form inputs
formInputs.forEach(input => {
    input.addEventListener("input", () => {
        const allFilled = Array.from(formInputs).every(input => input.value.trim() !== "");
        formBtn.disabled = !allFilled;
    });
});
// Forma yuborish
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Forma avtomatik yangilanishini to'xtatadi

    const fullName = form.querySelector("input[name='fullname']").value;
    const email = form.querySelector("input[name='email']").value;
    const message = form.querySelector("textarea[name='message']").value;

    sendMessage(`📩 Yangi xabar:\n👤 Ism: ${fullName}\n📧 Email: ${email}\n💬 Xabar: ${message}`);
    
    alert('Forma yuborildi!');
    form.reset(); // Formani tozalash
    formBtn.disabled = true; // Tugmani yana o'chirish
});

// Telegramga xabar yuborish
function sendMessage(text) {
    const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Xatolik:', response.status, response.statusText);
                throw new Error('Tarmoq javobi yaxshi emas');
            }
        })
        .then(data => {
            console.log('Xabar yuborildi:', data);
        })
        .catch(error => {
            console.error('Fetch jarayonida muammo yuz berdi:', error);
        });
}
