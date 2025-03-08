import express from 'express'

const app = express()

app.listen(5050, () => {
  console.log('server runing at: http://localhost:5050')
})
