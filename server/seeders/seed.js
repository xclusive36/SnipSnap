const db = require('../config/connection');
const { User, Service, Stylist } = require('../models');
const userSeeds = require('./userSeeds.json');
const serviceSeeds = require('./serviceSeeds.json');
const stylistSeeds = require('./stylistSeeds.json');

db.once('open', async () => {
  try {
    await Service.deleteMany({});
    await Stylist.deleteMany({});
    await User.deleteMany({});

    await User.create(userSeeds);
    await Service.create(serviceSeeds);
    await Stylist.create(stylistSeeds);
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
