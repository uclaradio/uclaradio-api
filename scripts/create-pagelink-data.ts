import * as faker from 'faker';
import { sequelize, PageLink } from '../src/models';

function createPageLinks(n: number) {
  const promises = [];
  for (let i = 0; i < n; i += 1) {
    promises.push(
      PageLink.create({
        showId: faker.random.number(),
        name: faker.random.alphaNumeric(),
        description: faker.hacker.phrase(),
        url: faker.internet.url(),
        image: faker.image.imageUrl(),
      })
    );
  }
  return Promise.all(promises);
}

async function main() {
  await sequelize.sync({ force: true });
  await createPageLinks(100);
  process.exit();
}

main();
