import * as faker from 'faker';
import { sequelize, User, Show } from '../src/models';

// function createUsers(n: number) {
//   const promises = [];
//   let randoms = Array(4).fill(Math.floor(Math.random() * 9));

//   for (let i = 0; i < n; i += 1) {
//     promises.push(

//     );

//   }
//   return Promise.all(promises);
// }

async function main() {
  await sequelize.sync({ force: true });
  const user = await User.create({ fullName: 'Nathan Smith' });
  const show = await Show.create({ title: 'The Spicy Hour' });
  await user.addShow(show);

  const shows = await user.getShows();
  console.log(shows[0].title);

  process.exit();
}

main();
