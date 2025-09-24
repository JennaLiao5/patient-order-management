import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const names = ['小民', '阿芳', '志明', '小美', '建國']
  for (const name of names) {
    await prisma.patient.create({ data: { name } })
  }

  // order example
  const first = await prisma.patient.findFirst({ orderBy: { id: 'asc' } })
  if (first) {
    await prisma.order.createMany({
      data: [
        { patientId: first.id, message: '超過120請施打8u' },
        { patientId: first.id, message: '睡前測一次血糖' }
      ]
    })
  }


  const third = await prisma.patient.findFirst({ skip: 2, orderBy: { id: 'asc' } })
  if (third) {
    await prisma.order.create({
      data: { patientId: third.id, message: '高血壓門診一週後回診' }
    })
  }

  console.log('Seed done.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
