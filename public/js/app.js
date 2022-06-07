const weatherForm = document.querySelector('form');
const addressInput = document.querySelector('input');
const message = document.querySelector('#message');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    message.innerHTML = 'Loading...';
    message.classList.remove('success', 'error');
    fetch(`/weather?address=${encodeURIComponent(addressInput.value)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);
            message.innerHTML = data.forecase.replace(/\n/g, '<br />');
            message.classList.add('success');
        }).catch(error => {
            message.innerHTML = error.message;
            message.classList.add('error');
        });
});
