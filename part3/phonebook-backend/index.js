require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const unknownEndpoint = require('./middlewares/unknownEndpoint')
const errorHandler = require('./middlewares/errorHandler')
const Person = require('./models/person')

morgan.token('body', function (req) {
  return req.method === 'POST' && JSON.stringify(req.body)
})

app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
app.use(cors())
app.use(express.static('build'))

app.get('/info', (req, res) => {
  Person.count({}).then((count) => {
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `)
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findById(id)
    .then((person) => {
      res.json(person)
    })
    .catch((err) => {
      next(err)
    })
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  const person = new Person({
    name,
    number,
  })
  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((err) => {
      next(err)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { number } = req.body
  Person.findByIdAndUpdate(
    id,
    { number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((person) => {
      res.json(person)
    })
    .catch((err) => {
      next(err)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  Person.findByIdAndRemove(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => {
      next(err)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
