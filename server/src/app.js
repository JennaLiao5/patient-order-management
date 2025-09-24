import express from 'express'
import cors from 'cors'
import { prisma } from './db.js'

const app = express()
app.use(cors())
app.use(express.json())

// get patient list
app.get('/api/patients', async (req, res, next) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: [{ id: 'asc' }]
    })
    res.json(patients.map(p => ({ id: p.id, name: p.name })))
  } catch (e) { next(e) }
})

// get order by patient id
app.get('/api/patients/:id/orders', async (req, res, next) => {
  try {
    const pid = Number(req.params.id)
    if (!Number.isInteger(pid)) return res.status(400).json({ error: 'Invalid patient id' })

    const patient = await prisma.patient.findUnique({ where: { id: pid } })
    if (!patient) return res.status(404).json({ error: 'Patient not found' })

    const orders = await prisma.order.findMany({
      where: { patientId: pid },
      orderBy: [{ id: 'desc' }]
    })
    res.json(orders)
  } catch (e) { next(e) }
})

// create order
app.post('/api/orders', async (req, res, next) => {
  try {
    const { patientId, message } = req.body || {}
    if (!Number.isInteger(patientId)) {
      return res.status(400).json({ error: 'patientId must be an integer' })
    }
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' })
    }

    const exists = await prisma.patient.findUnique({ where: { id: patientId } })
    if (!exists) return res.status(404).json({ error: 'Patient not found' })

    const order = await prisma.order.create({
      data: { patientId, message: message.trim() }
    })
    res.status(201).json(order)
  } catch (e) { next(e) }
})

// modify order
app.put('/api/orders/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { message } = req.body || {}

    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'Invalid order id' })
    }
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty' })
    }

    const existing = await prisma.order.findUnique({ where: { id } })
    if (!existing) {
      return res.status(404).json({ error: 'Order not found' })
    }

    if (existing.message.trim() === message.trim()) {
      return res.json(existing)
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { message: message.trim() }
    })

    res.json(updated)
  } catch (e) {
    next(e)
  }
})

// error handling
app.use((err, req, res, next) => {
  console.error(err)
  const payload = process.env.NODE_ENV === 'production'
    ? { error: 'Internal Server Error' }
    : { error: err.message, stack: err.stack }
  res.status(500).json(payload)
})

export default app
