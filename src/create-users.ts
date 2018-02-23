
import User from './models/User';
import { sequelize } from './models/index';
import * as Sequelize from 'sequelize';
import * as faker from 'faker';

function createUsers(n) {
  const promises = [];
  for (let i = 0; i < n; i += 1) {
    promises.push(
      User.create({
        bio: faker.company.bsBuzz(),
        djName: faker.company.bsNoun(),
        email: faker.internet.email(),
        fullName: faker.name.findName(),
        password: Sequelize.STRING,
        phone: faker.phone.phoneNumberFormat(),
        picture: faker.image.imageUrl(),
        shows: [faker.company.catchPhrase()],
      })
    );
  }
  return Promise.all(promises);
}

async function main() {
  await sequelize.sync({ force: true });
  await createUsers(100);
  process.exit();
}

main();