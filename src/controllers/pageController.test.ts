import * as faker from 'faker';

import { sequelize, PageLink } from '../models';
import * as pageController from './pageController';
import { PageLinkInstance } from '../models/PageLink';

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

function getRandomPage() {
  return {
    showId: faker.random.number(),
    name: faker.random.alphaNumeric(),
    description: faker.hacker.phrase(),
    url: faker.internet.url(),
    image: faker.image.imageUrl(),
  };
}

describe('createPage', () => {
  it('should add a page link entry to the database', async () => {
    const page = getRandomPage();

    await pageController.createPage(page);

    const pageResultsArray = await PageLink.findAll({
      where: {
        name: page.name,
      },
    });

    // We need the `plain: true` option so that we only get the object values we care about.
    // See http://docs.sequelizejs.com/manual/tutorial/instances.html#values-of-an-instance
    const pageResult = pageResultsArray[0].get({
      plain: true,
    });

    expect(pageResultsArray).toHaveLength(1);
    expect(pageResult).toMatchObject(page);
    expect(pageResult).toHaveProperty('id');
    expect(pageResult).toHaveProperty('createdAt');
    expect(pageResult).toHaveProperty('updatedAt');
  });
});

describe('getPage', () => {
  it('retrieves a page link from the database', async () => {
    const page = {
      showId: faker.random.number(),
      name: faker.random.alphaNumeric(),
      description: faker.hacker.phrase(),
      url: faker.internet.url(),
      image: faker.image.imageUrl(),
    };
    await PageLink.create(page);

    const retrievedPageLinkInstance = await pageController.getPage(1);
    const retrievedPageLinkAttributes = retrievedPageLinkInstance.get({
      plain: true,
    });

    expect(retrievedPageLinkAttributes).toMatchObject(page);
    expect(retrievedPageLinkAttributes).toHaveProperty('id');
    expect(retrievedPageLinkAttributes).toHaveProperty('createdAt');
    expect(retrievedPageLinkAttributes).toHaveProperty('updatedAt');
  });

  it('returns null if a page with the specified ID cannot be found', async () => {
    const retrievedPageLinkInstance = await pageController.getPage(2);
    expect(retrievedPageLinkInstance).toBeNull();
  });
});

describe('getAllPages', () => {
  it('returns an empty array when the database is empty', async () => {
    expect(await pageController.getAllPages()).toHaveLength(0);
  });

  it('returns an array of all pages', async () => {
    const page = getRandomPage();
    await PageLink.create(page);

    const allPages = await pageController.getAllPages();
    const retrievedPageLinkAttributes = allPages[0].get({ plain: true });

    expect(allPages).toHaveLength(1);
    expect(retrievedPageLinkAttributes).toMatchObject(page);
  });
});

describe('updatePage', () => {
  it('updates an existing page from the database', async () => {
    await PageLink.create(getRandomPage());

    const newName = faker.random.alphaNumeric();

    const updatedPageLinkInstance = await pageController.updatePage(1, {
      name: newName,
    });
    const retrievedPageLinkAttributes = updatedPageLinkInstance.get({
      plain: true,
    });

    expect(updatedPageLinkAttributes).toHaveProperty('name', newName);
  });

  it('returns null if a page with the specified ID cannot be found', async () => {
    const updatedPageLinkInstance = await pageController.updatePage(2, {
      name: faker.random.alphaNumeric(),
    });

    expect(updatedPageLinkInstance).toBeNull();
  });
});

describe('deletePage', () => {
  it('deletes a page from the database and returns true', async () => {
    await PageLink.create(getRandomPage());

    expect(await PageLink.findAll()).toHaveLength(1);
    expect(await pageController.deletePage(1)).toBe(true);
    expect(await PageLink.findAll()).toHaveLength(0);
  });

  it('does not delete a page from the database and returns false when the id is invalid', async () => {
    await PageLink.create(getRandomPage());

    expect(await PageLink.findAll()).toHaveLength(1);
    expect(await pageController.deletePage(2)).toBe(false);
    expect(await PageLink.findAll()).toHaveLength(1);
  });
});
