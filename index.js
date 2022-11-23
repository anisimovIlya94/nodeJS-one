const chalk = require("chalk")
const { addNote, getNotes, removeNote, editNote } = require("./notes.controller")
const express = require("express")
const path = require("path")

const port = 3000

const app = express()

app.set("view engine", "ejs")
app.set("views", "pages")

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.resolve(__dirname, "public")))
app.use(express.json())

app.get("/", async (req, res) => {
    res.render("index", {
        title: "Express title",
        notes: await getNotes(),
        created: false
    })
})

app.post("/", async (req, res) => {
    await addNote(req.body.title)
    res.render("index", {
        title: "Express title",
        notes: await getNotes(),
        created: true
    })
})

app.put("/:id", async (req, res) => {
    const id = req.params.id
    await editNote(id, req.body.title)
    res.render("index", {
        title: "Express title",
        notes: await getNotes(),
        created: false
    })
})

app.delete("/:id", async (req, res) => {
    const id = req.params.id
    await removeNote(id)
    res.render("index", {
        title: "Express title",
        notes: await getNotes(),
        created: false
    })
})

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}...`))
})