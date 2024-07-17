import express from 'express'
import { getTable, createUser } from '../database.js'
const router = express.Router()


// GET
router.get('/', async (req, res) => {
    const humanData = await getTable();
    res.status(200).render('home', { username: 'Leonard', humanData })
})


router.get('/create', (req, res) => {
    res.status(200).render('signup')
})


//POST
router.post('/', (req, res) => {
    console.log(req.body)
    createUser(req.body)
    res.redirect('/user')
})



router.get('/:id', (req, res) => {
    res.status(200).render('profile', { user: req.params.id })
})

export default router;