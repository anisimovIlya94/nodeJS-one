document.addEventListener("click", (event) => {
    if (event.target.dataset.type === "remove") {
        const id = event.target.dataset.id
        remove(id).then(() => {
            event.target.closest("li").remove()
        })
    }
    if (event.target.dataset.type === "edit") {
        const id = event.target.dataset.id
        const newTitle = prompt("Введите новое название")
        if (newTitle) {
            edit(id, newTitle).then(() => {
                const title = event.target.closest("li")
                title.children[0].textContent = newTitle
            })
        }
    }
})

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}

async function edit(id, title) {
    await fetch(`/${id}`, {
        method: "PUT",
        body: JSON.stringify({title}),
        headers: {
            "Content-Type": "application/json",
        }
    })
}