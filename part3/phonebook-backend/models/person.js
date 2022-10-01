const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name missing'],
    minLength: [3, 'Name must be at least 3 characters long'],
    unique: true,
  },
  number: {
    type: String,
    required: [true, 'Number missing'],
    validate: [
      {
        validator: (v) => v.match(/[0-9]/g).length > 7,
        message: 'Number must be at lest 8 symbols long',
      },
      {
        validator: (v) => /\d{2,3}-[0-9]\d{4,}/.test(v),
        message: (props) => `${props.value} is not a valid phone number`,
      },
    ],
  },
})

personSchema.post('save', (err, doc, next) => {
  const { name, code } = err
  if (name === 'MongoServerError' && code === 11000) {
    const validationError = new mongoose.Error.ValidationError(null)
    validationError.addError(
      'name',
      new mongoose.Error.ValidatorError({
        message: 'Name must be unique',
      })
    )
    return next(validationError)
  }
  next(err)
})

personSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  },
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
