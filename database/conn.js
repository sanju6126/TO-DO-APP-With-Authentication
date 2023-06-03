const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');


async function connect() {
    const monogod = await MongoMemoryServer.create();
    const getUri = monogod.getUri();

    console.log(getUri);
    mongoose.set('strictQuery',true);
    const db = await mongoose.connect(getUri);
    // const db = await mongoose.connect(ENV.ATLAS_URI);
    console.log("Database connected");

    return db;

}

module.exports = connect;
