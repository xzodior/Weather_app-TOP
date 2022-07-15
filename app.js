const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const input = form.search.value.trim();
    form.reset();
})