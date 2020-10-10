module.exports = {
  async up(db) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('users').updateMany({__t: 'labDiag'}, {$set: {__t: "lab_diag"}});
    await db.collection('users').updateMany({__t: 'labResearch'}, {$set: {__t: "lab_research"}});
  },

  async down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('users').updateMany({__t: 'lab_diag'}, {$set: {__t: "labDiag"}});
    await db.collection('users').updateMany({__t: 'lab_research'}, {$set: {__t: "labResearch"}});
  }
};
