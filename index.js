import express from "express"
import 'dotenv/config'
import userRoutes from './routes/user.js'
import path from 'path';

const port = process.env.PORT
const app = express();
const __dirname = path.resolve();

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    const humanData = [
        { name: 'Leonard', age: 23, gender: 'male' },
        { name: 'Roycey', age: 23, gender: 'male' },
        { name: 'Ram', age: 24, gender: 'male' }
    ]
    res.status(200).render('./home', { username: 'Leonard', humanData })
})

// routes
app.use('/user', userRoutes)



app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found (404)" })
})

app.listen(port, () => {
    console.log(`Im listening @ PORT ${port}`)
})