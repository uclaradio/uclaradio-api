import * as faker from 'faker';

import { sequelize, Show } from '../models';
import * as showController from './showController';
import { ENETDOWN } from 'constants';

enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

function randomDayEnum() {
  const randNum = Math.floor(Math.random() * 7);
  const typedDayString: keyof typeof Day = 'Sunday';
  return typedDayString;
}

function getRandomShow() {
  return {
    title: faker.commerce.productAdjective(),
    description: faker.hacker.phrase(),
    genre: faker.commerce.productAdjective(),
    imageURL: faker.image.avatar(),
    day: Day[randomDayEnum()],
    startTime: Math.floor(Math.random() * 24),
    duration: Math.floor(Math.random() * 60),
  };
}

describe('createShow', () => {
  it('should add a show entry to the database', async () => {
    const show = getRandomShow();

    await showController.createShow(show);

    const showResultsArray = await Show.findAll({
      where: {
        title: show.title,
      },
    });
    // We need the `plain: true` option so that we only get the object values we care about.
    // See http://docs.sequelizejs.com/manual/tutorial/instances.html#values-of-an-instance
    const showResult = showResultsArray[0].get({
      plain: true,
    });

    expect(showResultsArray).toHaveLength(1);
    expect(showResult).toMatchObject(show);
    expect(showResult).toHaveProperty('id');
    expect(showResult).toHaveProperty('createdAt');
    expect(showResult).toHaveProperty('updatedAt');
  });
});

describe('getShow', () => {
  it('retrieves a show from the database', async () => {
    const show = {
      title: faker.commerce.productName(),
      description: faker.hacker.phrase(),
      genre: faker.commerce.productAdjective(),
      imageURL: faker.image.avatar(),
      day: Day[randomDayEnum()],
      startTime: Math.floor(Math.random() * 24),
      duration: Math.floor(Math.random() * 60),
    };
    await Show.create(show);

    const retrievedShowInstance = await showController.getShow(1);
    const retrievedShowAttributes = retrievedShowInstance.get({
      plain: true,
    });

    expect(retrievedShowAttributes).toMatchObject(show);
    expect(retrievedShowAttributes).toHaveProperty('id');
    expect(retrievedShowAttributes).toHaveProperty('createdAt');
    expect(retrievedShowAttributes).toHaveProperty('updatedAt');
  });

  it('returns null if a show with the specified ID cannot be found', async () => {
    const retrievedShowInstance = await showController.getShow(2);
    expect(retrievedShowInstance).toBeNull();
  });
});

describe('getAllShows', () => {
  it('returns an empty array when the database is empty', async () => {
    expect(await showController.getAllShows()).toHaveLength(0);
  });

  it('returns an array of all shows', async () => {
    const show = getRandomShow();
    await Show.create(show);

    const allShows = await showController.getAllShows();
    const retrievedShowAttributes = allShows[0].get({ plain: true });

    expect(allShows).toHaveLength(1);
    expect(retrievedShowAttributes).toMatchObject(show);
  });
});

describe('updateShow', () => {
  it('updates an existing show from the database', async () => {
    await Show.create(getRandomShow());

    const newName = faker.commerce.productName();
    const updatedShowInstance = await showController.updateShow(1, {
      title: faker.commerce.productName(),
      description: faker.hacker.phrase(),
      genre: faker.commerce.productAdjective(),
      imageURL: faker.image.avatar(),
      day: Day[randomDayEnum()],
      startTime: Math.floor(Math.random() * 24),
      duration: Math.floor(Math.random() * 60),
    });
    const updatedShowAttributes = updatedShowInstance.get({
      plain: true,
    });

    expect(updatedShowAttributes).toHaveProperty('title', newName);
  });

  it('returns null if a show with the specified ID cannot be found', async () => {
    const updatedShowInstance = await showController.updateShow(2, {
      title: faker.commerce.productName(),
      description: faker.hacker.phrase(),
      genre: faker.commerce.productAdjective(),
      imageURL: faker.image.avatar(),
      day: Day[randomDayEnum()],
      startTime: Math.floor(Math.random() * 24),
      duration: Math.floor(Math.random() * 60),
    });

    expect(updatedShowInstance).toBeNull();
  });
});

describe('deleteShow', () => {
  it('deletes a show from the database and returns true', async () => {
    await Show.create(getRandomShow());

    expect(await Show.findAll()).toHaveLength(1);
    expect(await showController.deleteShow(1)).toBe(true);
    expect(await Show.findAll()).toHaveLength(0);
  });

  it('does not delete a show from the database and returns false when the id is invalid', async () => {
    await Show.create(getRandomShow());

    expect(await Show.findAll()).toHaveLength(1);
    expect(await showController.deleteShow(2)).toBe(false);
    expect(await Show.findAll()).toHaveLength(1);
  });
});
