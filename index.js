import express from "express"
import 'dotenv/config'
import fs from 'fs/promises'
const port = process.env.PORT
const app = express();

app.set('view engine', 'ejs')
app.use(express.json())



app.get('/', (req, res) => {
    res.status(200).render('./home', { username: 'Leonard' })
})

app.get('/signup', (req, res) => {
    res.render('./signup')
})


app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found (404)" })
})

app.listen(port, () => {
    console.log(`Im listening @ PORT ${port}`)
})