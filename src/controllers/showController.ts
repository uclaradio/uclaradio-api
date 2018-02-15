/**
 * Creates a show with the given attribues
 *
 * @param attributes
 * @returns The newly created show.
 */
export function createShow(attributes: any) {}

/**
 * Gets the show with the given id.
 *
 * @param id
 */
export function getShow(id: number): any | undefined {}

/**
 * Gets all shows.
 *
 * @param id
 */
export function getAllShows(): any {}

/**
 * Updates a show with the given attributes. Returns the updated show, or undefined if the show is not updated.
 *
 * @export
 * @param {number} id
 * @param {*} attributes
 * @returns {(any | undefined)}
 */
export function updateShow(id: number, attributes: any): any | undefined {}

/**
 * Deletes a show. Returns true if the show was successfully deleted, false otherwise.
 *
 * @param id
 */
export function deleteSource(id: number): boolean {
  return false;
}
