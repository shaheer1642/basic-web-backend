const express = require('express')
const { db } = require('../db_connection')
const router = express.Router()

router.get('/students', (req, res) => {
    console.log('GET [/api/students] called')

    db.query('SELECT * FROM students ORDER BY name ASC').then((db_res) => {
        res.send(db_res.rows)
    }).catch((err) => {
        console.error(err)
        res.sendStatus(500).send({ message: 'DB error', detail: err.detail || err })
    })

})

router.post('/students/:id', (req, res) => {
    console.log(`POST [/api/students/${req.params.id}] called`)
    console.log(req.body)

    db.query(`
        UPDATE students SET 
        ${req.body.name ? `name = '${req.body.name}'` : ''}
        ${req.body.gender ? `,gender = '${req.body.gender}'` : ''}
        ${req.body.age ? `,age = ${req.body.age}` : ''}
        ${req.body.fee ? `,fee = ${req.body.fee}` : ''}
        ${req.body.description ? `,description = '${req.body.description}'` : ''}
        WHERE id = ${req.params.id}
    `).then((db_res) => {
        if (db_res.rowCount == 1) {
            res.send({ message: 'OK' })
        } else if (db_res.rowCount == 0) {
            res.sendStatus(400).send({ message: 'Error inserting into db' })
        }
    }).catch((err) => {
        console.error(err)
        res.sendStatus(500).send({ message: 'DB error', detail: err.detail || err })
    })
})

router.post('/students', (req, res) => {
    console.log(`POST [/api/students] called`)
    console.log(req.body)

    db.query(`
        INSERT INTO students (
            name,
            gender,
            age,
            fee
        ) values (
            '${req.body.name}',
            '${req.body.gender}',
            '${req.body.age}',
            ${req.body.fee}
        )
    `).then((db_res) => {
        if (db_res.rowCount == 1) {
            res.send({ message: 'OK' })
        } else if (db_res.rowCount == 0) {
            res.sendStatus(400).send({ message: 'Error inserting into db' })
        }
    }).catch((err) => {
        console.error(err)
        res.sendStatus(500).send({ message: 'DB error', detail: err.detail || err })
    })
})

router.delete('/students/:id', (req, res) => {
    console.log(`DELETE [/api/students] called`, req.params)
    db.query(`
        DELETE FROM students
        WHERE id = ${req.params.id}
    `).then((db_res) => {
        if (db_res.rowCount == 1) {
            res.send({ message: 'OK' })
        } else if (db_res.rowCount == 0) {
            res.sendStatus(400).send({ message: 'Error inserting into db' })
        }
    }).catch((err) => {
        console.error(err)
        res.sendStatus(500).send({ message: 'DB error', detail: err.detail || err })
    })
})

module.exports = router