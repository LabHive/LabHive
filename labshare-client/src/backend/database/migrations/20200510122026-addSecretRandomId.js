const { v4 } = require("uuid")
module.exports = {
  async up(db) {
    let users = await db.collection('users').find({secretRandomId: {$exists: false}}).toArray();
    let promises = []
    for (let i of users) {
      promises.push(db.collection('users').updateOne({_id: i._id}, {$set: {secretRandomId: v4()}}));
    }
    await Promise.all(promises)
  },

  async down(db) {
    await db.collection('users').updateMany({secretRandomId: {$exists: true}}, {$unset: {secretRandomId: ""}});
  }
};
 