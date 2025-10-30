document.addEventListener('click', event => {


    const id = event.target.dataset.id
    const li = event.target.closest('li')


    if (event.target.dataset.type === 'remove') {
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }

    if (event.target.dataset.type === 'update') {
        const title = li.querySelector('.list-title')
        const editTitle = li.querySelector(".edit-title")
        const input = li.querySelector('.edit-input')
        const editButtons = li.querySelector('.edit-buttons')
        const saveButtons = li.querySelector('.save-buttons')

        title.style.display = 'none';
        editButtons.style.display = 'none';
        editTitle.style.display = 'block';
        saveButtons.style.display = 'block';
        input.focus();
    }
    if (event.target.dataset.type === 'cancel') {
        const title = li.querySelector('.list-title')
        const editTitle = li.querySelector(".edit-title")
        const editButtons = li.querySelector('.edit-buttons')
        const saveButtons = li.querySelector('.save-buttons')

        title.style.display = 'block';
        editButtons.style.display = 'block';
        editTitle.style.display = 'none';
        saveButtons.style.display = 'none';
    }

    if (event.target.dataset.type === 'save') {

        const title = li.querySelector('.list-title')
        const editTitle = li.querySelector(".edit-title")
        const input = li.querySelector('.edit-input')
        const editButtons = li.querySelector('.edit-buttons')
        const saveButtons = li.querySelector('.save-buttons')
        const newTitle = input.value.trim()

        if (newTitle === '') {
            return
        } else {
            edit(id, newTitle).then(() => {
            title.textContent = newTitle
            title.style.display = 'block';
            editButtons.style.display = 'block';
            editTitle.style.display = 'none';
            saveButtons.style.display = 'none';
            })
        }
    }
})

const remove = async (id) => await fetch(`/${id}`, {method: "DELETE"});

const edit = async (id, title) => {
    await fetch(`/${id}`, {
    method: "PUT",
    headers: {
            'Content-Type': 'application/json'
        },
    body: JSON.stringify({ title })
    })
}
