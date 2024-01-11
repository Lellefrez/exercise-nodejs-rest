import express from "express";
import path from "path";
import fs from "fs"
// Funzione che ci permette di leggere il file.Json
const readResource = (resourceName) => {
    const data = fs.readFileSync(path.resolve(`./databases/${resourceName}.json`))
    const resource = JSON.parse(data)
    return resource
}

// Impostare server --------------------
const app = express();
app.listen(3000, () => {
    console.log('va bene così BRO');
});
app.use(express.json());
// 1- Lettura tutti autri
// Get ---------------------------------
app.get('/authors', (req, res) => {
    res.sendFile(path.resolve('./databases/authors.json')); //resolve serve per far leggere a tutti i pc, 
});

// 1- Lettura autore singolo
// Get ---------------------------------
app.get('/authors/:id', (req, res) => {
    const { id } = req.params;
    const authors = readResource("authors")
    const author = authors.filter(aut => aut.id === Number(id))[0];
    if (!author) {
        res.status(404).send(`Author with id:${id} not found`);
        return;
    }
    res.send(author);
});