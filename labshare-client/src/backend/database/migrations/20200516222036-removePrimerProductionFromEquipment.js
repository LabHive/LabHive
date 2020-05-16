module.exports = {
  async up(db) {

    // update lookingFor
    let users = await db.collection('users').find({
      "lookingFor.equipment": {
        $in: ["primerProduction"]
      }
    }).toArray();

    let promises = []

    for (let i of users) {
      let old = i.lookingFor.equipment
      old.splice(old.indexOf("primerProduction"), 1)

      promises.push(db.collection('users').updateOne({_id: i._id}, {$set: {"lookingFor.equipment": old}}));
    }

    // update offers
    users = await db.collection('users').find({
      "offers.equipment": {
        $in: ["primerProduction"]
      }
    }).toArray();

    for (let i of users) {
      let old = i.offers.equipment
      old.splice(old.indexOf("primerProduction"), 1)

      promises.push(db.collection('users').updateOne({_id: i._id}, {$set: {"offers.equipment": old}}));
    }

    Promise.all(promises)

  },

  async down() {
    
  }
};
