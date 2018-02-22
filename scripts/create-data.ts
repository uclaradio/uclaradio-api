import * as faker from 'faker';
import { sequelize, Show, User, SocialLink } from '../src/models';

const userNumber = 50;
const showNumber = 45;

async function main() {
  await sequelize.sync({ force: true });

  let shows = [];
  for (let i = 0; i < showNumber; i++) {
    const show = await Show.create({
      title: faker.company.bs(),
      description: faker.lorem.lines(1),
      genre: faker.company.bsBuzz(),
      imageURL: faker.image.imageUrl(),

      // day: faker.random.number({ min: 0, max: 6 }),
      // startTime: faker.date.
      duration: faker.random.number({ min: 1, max: 2 }),
    });
    shows.push(show);
  }

  let users = [];
  for (let i = 0; i < userNumber; i++) {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullName: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      picture: faker.image.imageUrl(),

      isDJ: faker.random.boolean(),
      djName: 'DJ' + faker.company.bs(),
      bio: faker.lorem.lines(1),

      isManager: faker.random.boolean(),
      isAdmin: faker.random.boolean(),
    });
    if (faker.random.number({ min: 0, max: 6 }) != 0) {
      user.addShow(shows[faker.random.number({ min: 0, max: showNumber })]);
    }

    users.push(user);
  }

  process.exit();
}

main();
