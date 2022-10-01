const errorHandler = (err, req, res, next) => {
  const { name, message: fullErrorMessage } = err
  const message = fullErrorMessage.split(':').pop()
  console.error({ name, fullErrorMessage })

  if (name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' })
  } else if (name === 'ValidationError') {
    return res.status(400).json({ error: message })
  }

  next(err)
}

module.exports = errorHandler
