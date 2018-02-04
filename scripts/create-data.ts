import * as faker from 'faker';
import { sequelize, Show } from '../src/models';


function createShows(n: number) {
  const promises = [];
  for (let i = 0; i < n; i += 1) {
    promises.push(
      Show.create({
        name: faker.commerce.productName(),
        genre: faker.commerce.productAdjective()
      })
    );
  }
  return Promise.all(promises);
}

async function main() {
    await sequelize.sync({ force: true});

    // const show = await Show.create({
    //     name: 'The Blah Show 2',
    //     genre: 'vaporwave'
    // });

    console.log("hi");
    await createShows(10);

    process.exit();
}

main();
