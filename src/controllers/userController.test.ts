import * as faker from 'faker';

import { sequelize, User } from '../models';
import * as userController from './userController';

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

function createRandomUser() {
  return {
    email: faker.internet.email(),
    password: faker.misc.password(),
    fullName: faker.person.name(),
    phone: faker.phone_number.phone_number(),
    picture: faker.internet.image_url(),
    isDJ: Math.random() >= 0.5,
    djName: faker.person.name(),
    bio: faker.lorem.text(),
    isManager: Math.random() >= 0.5,
    isAdmin: Math.random() >= 0.5,
  };
}

describe('createUser', () => {
  it('should add a user entry to the database', async () => {
    const user = createRandomUser();

    await userController.createUser(user);

    const userResultsArray = await User.findAll({
      where: {
        fullName: user.fullName,
      },
    });
    // We need the `plain: true` option so that we only get the object values we care about.
    // See http://docs.sequelizejs.com/manual/tutorial/instances.html#values-of-an-instance
    const userResult = userResultsArray[0].get({
      plain: true,
    });

    expect(userResultsArray).toHaveLength(1);
    expect(userResult).toMatchObject(user);
    expect(userResult).toHaveProperty('id');
    expect(userResult).toHaveProperty('createdAt');
    expect(userResult).toHaveProperty('updatedAt');
  });
});

describe('getUser', () => {
  it('retrieves a user from the database', async () => {
    const user = createRandomUser();
    await User.create(user);

    const retrievedUserInstance = await userController.getUser(1);
    const retrievedUserAttributes = retrievedUserInstance.get({
      plain: true,
    });

    expect(retrievedUserAttributes).toMatchObject(user);
    expect(retrievedUserAttributes).toHaveProperty('id');
    expect(retrievedUserAttributes).toHaveProperty('createdAt');
    expect(retrievedUserAttributes).toHaveProperty('updatedAt');
  });

  it('returns null if a user with the specified ID cannot be found', async () => {
    const retrievedUserInstance = await userController.getUser(2);
    expect(retrievedUserInstance).toBeNull();
  });
});

describe('getAllUsers', () => {
  it('returns an empty array when the database is empty', async () => {
    expect(await userController.getAllUsers()).toHaveLength(0);
  });

  it('returns an array of all users', async () => {
    const user = createRandomUser();
    await User.create(user);

    const allUsers = await userController.getAllUsers();
    const retrievedUserAttributes = allUsers[0].get({ plain: true });

    expect(allUsers).toHaveLength(1);
    expect(retrievedUserAttributes).toMatchObject(user);
  });
});

describe('updateUser', () => {
  it('updates an existing user from the database', async () => {
    await User.create(createRandomUser());

    const newName = faker.person.name();

    const updatedUserInstance = await userController.updateUser(1, {
      fullName: newName,
    });
    const updatedUserAttributes = updatedUserInstance.get({
      plain: true,
    });

    expect(updatedUserAttributes).toHaveProperty('fullName', newName);
  });

  it('returns null if a user with the specified ID cannot be found', async () => {
    const updatedUserInstance = await userController.updateUser(2, {
      fullName: faker.person.name(),
    });

    expect(updatedUserInstance).toBeNull();
  });
});

describe('deleteUser', () => {
  it('deletes a user from the database and returns true', async () => {
    await User.create(createRandomUser());

    expect(await User.findAll()).toHaveLength(1);
    expect(await userController.deleteUser(1)).toBe(true);
    expect(await User.findAll()).toHaveLength(0);
  });

  it('does not delete a user from the database and returns false when the id is invalid', async () => {
    await User.create(getRandomUser());

    expect(await User.findAll()).toHaveLength(1);
    expect(await userController.deleteUser(2)).toBe(false);
    expect(await User.findAll()).toHaveLength(1);
  });
});
