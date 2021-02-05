import { UserLabDiag, TestCapacity } from 'backend/lib/database/models'
import { connect } from 'backend/lib/database/database'
import { exit } from 'process'


async function main() {
  console.log("start")
  const userIds = (await UserLabDiag.find({}).exec()).map(i => i._id)

  const promises = []
  for (let userId of userIds) {
    const old = await TestCapacity.find({user: userId}).exec()
    for (let o of old) {
      await o.remove()
    }

    for (let i = 150; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)

      //const totalCapacity = Math.floor(Math.random() * 2200) + 800
      const totalCapacity = Math.floor(Math.random() * 200) + ((200-i)*40) //growing steadily

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


connect().then(() => {
  main()
})
