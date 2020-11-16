import { UserLabDiag, TestCapacity } from '../backend/database/models'
import { ready } from '../backend/database/database'
import { GlobalEvent } from '../backend/constants'
import { exit } from 'process'


async function main() {
  console.log("start")
  const userIds = (await UserLabDiag.find({}).exec()).map(i => i._id)

  const promises = []
  for (let userId of userIds) {
    for (let i = 7; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      const totalCapacity = Math.floor(Math.random() * 2200) + 800

      promises.push(new TestCapacity({
        user: userId,
        totalCapacity: totalCapacity,
        usedCapacity: Math.floor(Math.random() * totalCapacity),
        positiveRate: Math.random() * 15,
        sampleBackup: Math.floor(Math.random() * 5000),
        staging: i == 0,
        createdAt: date
      }).save())
    }
  }

  Promise.all(promises).then(() => {
    exit(0)
  })
}

if (ready) {
  main()
} else {
  GlobalEvent.once('ready', () => {
    main()
  })
}