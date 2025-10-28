document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

    remove(id).then(() => {
        event.target.closest('li').remove()
    })
    }

    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id
        const li = event.target.closest('li')
        const title = li.querySelector('.list-title')
        const newTitle = prompt('Редактируйте заголовок');

        if (newTitle !== null && newTitle.trim() !=='') {
            edit(id, newTitle).then(() => {
                title.textContent = newTitle
            })
        }

    }
})

const remove = async (id) => await fetch(`/${id}`, {method: "DELETE"});

const edit = async (id, title) => {
    await fetch(`/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title })
    })
}
