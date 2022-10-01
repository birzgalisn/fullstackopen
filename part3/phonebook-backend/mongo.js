const mongoose = require('mongoose')
const [node, file, password, name, number] = process.argv
const argvs = process.argv.length

if (argvs < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
} else if (argvs === 4) {
  console.log('Number missing')
  process.exit(1)
}

const url = `mongodb+srv://fullstack:${password}@cluster0.lr2ra3s.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(async (result) => {
    console.log('Connected')

    if (argvs === 3) {
      console.log('Phonebook:')
      return await Person.find({}).then((result) => {
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`)
        })
      })
    }

    const person = new Person({
      name,
      number,
    })

    const saved = await person.save()

    console.log(`Added ${saved.name} number ${saved.number} to phonebook`)

    return saved
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
