import * as faker from 'faker';
import { sequelize, SocialLink } from '../src/models';

function createLinks(n) {
  const promises = [];
  for (let i = 0; i < n; i += 1) {
    promises.push(
      SocialLink.create({
        show_id: 1,
        url: "http://google.com",
        social: 'FACEBOOK',
      })
    );
  }
  return Promise.all(promises);
}

async function main() {
  await sequelize.sync({ force: true });
  await createLinks(100);
  process.exit();
}

main();
