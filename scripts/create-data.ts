import * as faker from 'faker';

import {
  sequelize,
  Show,
  User,
  SocialLink,
  PromoBanner,
  PageLink,
} from '../src/models';
import { Day, SocialSite } from '../src/types';

const userNumber = 50;
const showNumber = 45;
const promoBannerNumber = 4;
const pageLinkNumber = 20;

let shows = [];
let users = [];

// See https://github.com/Marak/faker.js/issues/541
function getRandomDay() {
  return Day[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(Day))
    )
  ];
}

function getRandomSocialSite() {
  return SocialSite[
    faker.helpers.replaceSymbolWithNumber(
      faker.random.arrayElement(Object.getOwnPropertyNames(SocialSite))
    )
  ];
}

async function createShows() {
  for (let i = 0; i < showNumber; i++) {
    const show = await Show.create({
      title: faker.company.bs(),
      description: faker.lorem.lines(1),
      genre: faker.company.bsBuzz(),
      imageURL: faker.image.imageUrl(),

      day: getRandomDay(),
      //startTime: faker.date,
      duration: faker.random.number({ min: 1, max: 2 }),
    });

    for (let j = 0; j < faker.random.number({ min: 0, max: 3 }); j++) {
      const link = await SocialLink.create({
        type: getRandomSocialSite(),
        url: faker.internet.url(),
      });
      show.addSocialLink(link);
    }

    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullName: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      picture: faker.image.imageUrl(),

      isDJ: true,
      djName: 'DJ ' + faker.lorem.word(),
      bio: faker.lorem.lines(1),

      isManager: faker.random.boolean(),
      isAdmin: faker.random.boolean(),
    });
    show.addUser(user);

    shows.push(show);
  }
}

async function createUsers() {
  for (let i = 0; i < userNumber; i++) {
    const user = await User.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullName: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      picture: faker.image.imageUrl(),

      isDJ: faker.random.boolean(),
      djName: 'DJ ' + faker.lorem.word(),
      bio: faker.lorem.lines(1),

      isManager: faker.random.boolean(),
      isAdmin: faker.random.boolean(),
    });
    if (faker.random.number({ min: 0, max: 2 }) != 0) {
      user.addShow(
        shows[
          faker.random.number({
            min: 0,
            max: showNumber,
          })
        ]
      );
    }

    users.push(user);
  }
}

async function createPromoBanners() {
  for (let i = 0; i < promoBannerNumber; i += 1) {
    await PromoBanner.create({
      imageUrl: faker.image.imageUrl(),
      linkUrl: faker.internet.url(),
    });
  }
}

async function createPageLinks() {
  for (let i = 0; i < pageLinkNumber; i += 1) {
    await PageLink.create({
      name: faker.company.bs(),
      description: faker.hacker.phrase(),
      linkUrl: faker.internet.url(),
      imageUrl: faker.image.imageUrl(),
    });
  }
}
async function main() {
  await sequelize.sync({ force: true });
  await createShows();
  await createUsers();
  await createPromoBanners();
  await createPageLinks();

  process.exit();
}

main();
