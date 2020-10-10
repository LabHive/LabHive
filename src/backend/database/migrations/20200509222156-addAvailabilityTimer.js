module.exports = {
  async up(db) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('users').updateMany({__t: 'volunteer'}, {$set: {availabilityTimer: null}});
  },

  async down(db) {
    await db.collection('users').updateMany({__t: 'volunteer'}, {$unset: {availabilityTimer: ""}});
  }
};
