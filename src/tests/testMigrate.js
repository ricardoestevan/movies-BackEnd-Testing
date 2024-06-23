    require('../models')
    const sequelize = require('../utils/connection');

    const testMigrate = async () => {
        try {
            await sequelize.sync({ force: true });
            console.log("DB reset exit");
            process.exit()
        } catch (error) {
            console.log(error)
        }
    }

    testMigrate();


    //running from package.json
    // "reset:migrate": "node ./src/tests/testMigrate.js"