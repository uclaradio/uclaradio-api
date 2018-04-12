import { Show } from '../models';
import { ShowAttributes, ShowInstance } from '../models/Show';

/**
 * Creates a show with the given attribues
 * @author Tanzeela Khan
 * @param {ShowAttributes} attributes
 * @returns {ShowInstance} The newly created show.
 */

export async function createShow(
  attributes: ShowAttributes
): Promise<ShowInstance> {
  const newShow: ShowInstance = await Show.create(attributes);
  return newShow;
}
/**
 * Gets the show with the given id.
 * @author Tanzeela Khan
 * @param {numberx} id
 * @returns {ShowInstance} The show with the matching id.
 */
export async function getShow(id: number): Promise<ShowInstance | null> {
  const show: ShowInstance | null = await Show.findById(id);
  return show;
}

/**
 * Gets all shows.
 * @author Tanzeela Khan
 * @param {numberx} id
 * @returns {ShowInstance[]} All the shows.
 */
export async function getAllShows(): Promise<ShowInstance[]> {
  const shows: ShowInstance[] = await Show.all();
  return shows;
}

/**
 * Updates a show with the given attributes.
 *
 * @export
 * @author Tanzeela Khan
 * @param {number} id
 * @param {*} attributes
 * @returns {(ShowInstance | undefined)} The updated show, or undefined if the show is not updated.
 */
export async function updateShow(
  id: number,
  attributes: ShowAttributes
): Promise<ShowInstance | null> {
  const [numberOfUpdatedShows, updatedShows] = await Show.update(attributes, {
    where: { id },
    returning: true,
  });
  if (numberOfUpdatedShows === 1) {
    return updatedShows[0];
  } else if (numberOfUpdatedShows !== 0) {
    // throw new
    throw new Error(
      'More than 1 rows updated from single id in `updateShow`! This is bad!'
    );
  }
  return null;
}

/**
 * Deletes a show. Returns true if the show was successfully deleted, false otherwise.
 * @author Tanzeela Khan
 * @param id
 * @returns {Promise<boolean>}
 */
export async function deleteShow(id: number): Promise<boolean> {
  const numberOfDeletedShows = await Show.destroy({
    where: { id },
  });

  if (numberOfDeletedShows === 1) {
    return true;
  } else if (numberOfDeletedShows !== 0) {
    throw new Error('More than 1 row deleted from single id! This is bad!');
  }
  return false;
}
