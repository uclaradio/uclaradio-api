import  { User } from '../models';

import { UserAttributes, UserInstance } from '../models/User';

/**
 * Gets a DJ with the specified id.
 *
 * @param {numberx} id
 * @returns {} DJ
 */
export async function getDJ(id: number) : Promise<ShowInstance | null> {
  const dj: ShowInstance | null = await User.findById(id);
  return dj;
}

/**
 * Gets all current DJs.
 *
 * @returns DJs
 */
export function getAllDJs() : Promise<ShowInstance[]> {
  const djs : ShowInstance[] = await User.all();
  return djs;
}
