import { PrismaClient } from '@prisma/client'
import csvtojson from 'csvtojson'
import { join } from 'path'

const prisma = new PrismaClient()
async function main() {
  const data = await csvtojson().fromFile(
    join(process.cwd(), './prisma/livers.csv')
  )
  const createMany = await prisma.liver.createMany({
    data,
  })
  console.log(createMany)
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
