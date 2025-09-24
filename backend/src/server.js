import app from './app.js'
import { ping, prisma } from './db.js'

const port = process.env.PORT || 4000

ping().then(() => {
  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`)
  })
}).catch(e => {
  console.error('DB connect failed:', e)
  process.exit(1)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
