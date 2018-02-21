// import * as faker from 'faker';

export const djs = [
  {
    id: 1,
    name: 'B',
    picture: 'pic.jpg',
    bio: 'One half of Web.',
    shows: ['Geek Squad'],
  },
  {
    id: 2,
    name: 'Huckleberry Spin',
    picture: 'ya.png',
    bio: 'The other half of Web.',
    shows: ['The Spicy Hour'],
  },
];

// for (let i = 0; i < 100; i++) {
//   const shows =
//     i % 7 == 0
//       ? [faker.company.companyName()]
//       : [faker.company.companyName(), faker.company.companyName()];

//   djs.push({
//     id: i,
//     name: faker.name.findName(),
//     picture: faker.internet.avatar(),
//     bio: faker.lorem.sentence(),
//     shows,
//   });
// }

export const shows = [
  {
    id: 1,
    title: 'Musicology',
    description: 'Ya',
    genre: 'Music',
    startTime: '2018-02-18T17:00:00.000-08:00',
    endTime: '2018-02-18T18:00:00.000-08:00',
    picture: 'pic.jpg',
    bio: 'Ya',
    djs: [djs[0]],
    socialLinks: [{ type: 'FACEBOOK', link: 'http://facebook.com' }],
  },
];
