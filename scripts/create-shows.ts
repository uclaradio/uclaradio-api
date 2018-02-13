import * as faker from 'faker';
import { sequelize, Show } from '../src/models';


function createShows(n: number) {
  const promises = [];
  let randoms = Array(4).fill(Math.floor(Math.random() * 9));

  for (let i = 0; i < n; i += 1) {
    promises.push(
      Show.create({
        name: faker.commerce.productName(),
        userIds: randoms,
        description: faker.hacker.phrase(),
        genre: faker.commerce.productAdjective(),
        image: faker.image.avatar(),
      })
    );
  }
  return Promise.all(promises);
}

async function main() {
    await sequelize.sync({ force: true});
    await createShows(11);
    process.exit();
}

main();
