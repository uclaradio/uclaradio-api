import * as faker from 'faker';
import { sequelize, PromoBanner } from '../src/models';

function createPromoBanners(n) {
  const promises = [];
  for (let i = 0; i < n; i += 1) {
    const promise = PromoBanner.create({
      imageUrl: faker.image.imageUrl(),
      linkUrl: faker.internet.url(),
    });
    promise.catch(err => {
      console.log(err.message);
    });
    promises.push(promise);
  }
  return Promise.all(promises);
}

async function main() {
  await sequelize.sync({ force: true });
  await createPromoBanners(5);
  process.exit();
}

main();
