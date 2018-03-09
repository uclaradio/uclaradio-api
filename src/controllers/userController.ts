import { User } from '../models';

import { UserAttributes, UserInstance } from '../models/User';

/**
 * Creates a new DJ from the specified parameters given. Returns that User instance.
 *
 * @param {UserAttributes} attributes An object of attributes for the user.
 */
export async function createUser(
  attributes: UserAttributes
): Promise<UserInstance> {
  const newUser: UserInstance = await User.create(attributes);
  return newUser;
}

/**
 * Gets a DJ with the specified id.
 *
 * @param {numberx} id
 * @returns {} DJ
 */
export async function getUser(id: number): Promise<ShowInstance | null> {
  const user: ShowInstance | null = await User.findById(id);
  return user;
}

/**
 * Gets all current DJs.
 *
 * @returns DJs
 */
export function getAllUsers(): Promise<ShowInstance[]> {
  const users: ShowInstance[] = await User.all();
  return users;
}

/**
 * Updates a DJ with the given id to the attributes specified. Returns the instance of the updated DJ. If no DJ with the given id is found, return null.
 *
 * @param id
 * @param attributes
 */
export async function updateUser(
  id: number,
  attributes: UserAttributes
): Promise<UserInstance | null> {
  const [numberOfUpdatedUsers, updatedUsers] = await User.update(attributes, {
    where: { id },
    returning: true,
  });

  if (numberOfUpdatedUsers === 1) {
    return updatedUsers[0];
  } else if (numberOfUpdatedUsers !== 0) {
    throw new Error(
      'More than 1 rows updated from single id in `updateUser`! This is bad!'
    );
  }
  return null;
}

/**
 * Deletes a DJ with the given id. Returns true if the DJ was deleted, returns false if there was an error.
 *
 * @param id
 */
export async function deleteUser(id: number): Promise<boolean> {
  const numberOfDeletedUsers = await User.destroy({
    where: { id },
  });

  if (numberOfDeletedUsers === 1) {
    return true;
  } else if (numberOfDeletedUsers !== 0) {
    throw new Error('More than 1 rows deleted from single id! This is bad!');
  }
  return false;
}
