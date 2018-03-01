import * as faker from 'faker';

import { sequelize, Show } from '../models';
import * as showController from './showController';
import { ShowInstance } from '../models/Show';

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

function getRandomShow() {
  return {
    name: faker.name.findName(),
    organization: faker.company.catchPhrase(),
    phones: faker.phone.phoneNumberFormat(),
    emails: faker.internet.email(),
    notes: faker.lorem.sentence(),
  };
}

describe('createShow', () => {
  it('should add a show entry to the database', async () => {
    const show = getRandomShow();

    await showController.createShow(show);

    const showResultsArray = await Show.findAll({
      where: {
        name: show.name,
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
      name: faker.name.findName(),
      organization: faker.company.catchPhrase(),
      phones: faker.phone.phoneNumberFormat(),
      emails: faker.internet.email(),
      notes: faker.lorem.sentence(),
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

    const newName = faker.name.findName();

    const updatedShowInstance = await showController.updateShow(1, {
      name: newName,
    });
    const updatedShowAttributes = updatedShowInstance.get({
      plain: true,
    });

    expect(updatedShowAttributes).toHaveProperty('name', newName);
  });

  it('returns null if a show with the specified ID cannot be found', async () => {
    const updatedShowInstance = await showController.updateShow(2, {
      name: faker.name.findName(),
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
