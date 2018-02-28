import { PageLink } from '../models';
import { PageLinkAttributes, PageLinkInstance } from '../models/PageLink';

/**
 * Creates a page with the given attribues
 *
 * @param attributes
 * @returns The newly created page.
 */
export function createPage(attributes: PageLinkAttributes) : Promise<PageLinkInstance> {
  const newPageLink: PageLinkInstance = await PageLink.create(attribues);
  return newPageLink;
}

/**
 * Gets the page with the given id.
 *
 * @param id
 */
export function getPage(id: number): Promise<PageLinkInstance | null> {
  const pageLink: PageLinkInstance | null = await PageLink.findById(id);
  return pageLink;
}

/**
 * Gets all pages.
 *
 * @param id
 */
export function getAllPages(): Promise<PageLinkInstance[]> {
  const pageLink: PageLinkInstance[] = await PageLink.all();
  return pageLink;
}

/**
 * Updates a page with the given attributes. Returns the updated page, or undefined if the page is not updated.
 *
 * @export
 * @param {number} id
 * @param {*} attributes
 * @returns {(any | undefined)}
 */
export function updatePage(id: number, attributes: PageLinkAttributes): Promise<PageLinkInstance | null> {
  const [numberOfUpdatedPageLinks, updatedPageLinks] = await PageLink.update(
    attributes,
    {
      where: { id },
      returning: true,
    }
  );

  if (numberOfUpdatedPageLinks === 1) {
    return updatedPageLinks[0];
  } else if (numberOfUpdatedPageLinks !== 0) {
    throw new Error(
      'More than 1 rows updated from single id in `updatePage`! This is bad!'
    );
  }
  return null;
}

/**
 * Deletes a page. Returns true if the page was successfully deleted, false otherwise.
 *
 * @param id
 */
export function deletePage(id: number): Promise<boolean> {
  const numberOfDeletedPageLinks = await PageLink.destroy({
    where: { id },
  });

  if (numberOfDeletedPageLinks === 1) {
    return true;
  } else if (numberOfDeletedPageLinks !== 0) {
    throw new Error('More than 1 rows deleted from single id! This is bad!');
  }
  return false;
}
