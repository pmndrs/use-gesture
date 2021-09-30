import { fetchProfile, fetchProfilesList } from '../profiles';
import { Constants } from '../constants';

const fetchMock = require('fetch-mock');

// Setup mock objects
const basePath = 'madeup/base/path';
const profilesListPath = `${basePath}/profilesList.json`;

const validProfileId = 'generic-trigger';
const validProfilePath = `${basePath}/${validProfileId}/profile.json`;
const validAssetPath = 'none.glb';

const validProfile = {
  layouts: {
    none: {
      assetPath: validAssetPath
    }
  }
};

const profilesList = {
  [validProfileId]: { path: `${validProfileId}/profile.json` }
};

function buildXRInputSource(profiles = [], handedness = Constants.Handedness.NONE) {
  const xrInputSource = {
    profiles,
    handedness
  };
  return xrInputSource;
}

afterEach(fetchMock.reset);

describe('fetchProfilesList', () => {
  test('Successfully fetch profilesList', async () => {
    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });

    const fetchedProfilesList = await fetchProfilesList(basePath);
    expect(fetchedProfilesList).toEqual(profilesList);
  });

  test('Bad arguments', async () => {
    await expect(fetchProfilesList(null))
      .rejects.toEqual(new Error('No basePath supplied'));

    await expect(fetchProfilesList(undefined))
      .rejects.toEqual(new Error('No basePath supplied'));
  });
});

describe('fetchProfile', () => {
  test('Bad arguments', async () => {
    const xrInputSource = buildXRInputSource();
    await expect(fetchProfile(xrInputSource, null))
      .rejects.toEqual(new Error('No basePath supplied'));

    await expect(fetchProfile(xrInputSource, undefined))
      .rejects.toEqual(new Error('No basePath supplied'));

    await expect(fetchProfile(null, basePath))
      .rejects.toEqual(new Error('No xrInputSource supplied'));

    await expect(fetchProfile(undefined, basePath))
      .rejects.toEqual(new Error('No xrInputSource supplied'));
  });

  test('Fail to first fetch profiles list', async () => {
    const xrInputSource = buildXRInputSource();

    const error = new Error('File not found');
    fetchMock.getOnce(profilesListPath, { status: 404, throws: error });

    await expect(fetchProfile(xrInputSource, basePath))
      .rejects.toEqual(error);
  });

  test('Successfully fetch profile with asset path', async () => {
    const xrInputSource = buildXRInputSource([validProfileId]);

    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });
    fetchMock.getOnce(validProfilePath, { status: 200, body: validProfile });

    const { profile, assetPath } = await fetchProfile(xrInputSource, basePath);
    expect(profile).toEqual(validProfile);
    expect(assetPath).toEqual(`${basePath}/${validProfileId}/${validAssetPath}`);
  });

  test('Successfully fetch profile with no asset path', async () => {
    const xrInputSource = buildXRInputSource([validProfileId]);

    const validProfileNoAssetPath = {
      layouts: { none: {} }
    };

    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });
    fetchMock.getOnce(validProfilePath, { status: 200, body: validProfileNoAssetPath });

    const { profile, assetPath } = await fetchProfile(xrInputSource, basePath, null, false);
    expect(profile).toEqual(validProfileNoAssetPath);
    expect(assetPath).toBeUndefined();
  });

  test('Successfully fetch profile skipping assetPath', async () => {
    const xrInputSource = buildXRInputSource([validProfileId], Constants.Handedness.LEFT);
    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });
    fetchMock.getOnce(validProfilePath, { status: 200, body: validProfile });

    const { profile, assetPath } = await fetchProfile(xrInputSource, basePath, null, false);
    expect(profile).toEqual(validProfile);
    expect(assetPath).toBeUndefined();
  });

  test('Successfully fetch a default profile when no results found in the array', async () => {
    const xrInputSource = buildXRInputSource(['made up profile id']);
    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });
    fetchMock.getOnce(validProfilePath, { status: 200, body: validProfile });

    const { profile, assetPath } = await fetchProfile(xrInputSource, basePath, validProfileId);
    expect(profile).toEqual(validProfile);
    expect(assetPath).toEqual(`${basePath}/${validProfileId}/${validAssetPath}`);
  });

  test('Successfully fetch second profile from array length 2', async () => {
    const xrInputSource = buildXRInputSource(['made up profile id', validProfileId]);
    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });
    fetchMock.getOnce(validProfilePath, { status: 200, body: validProfile });

    const { profile } = await fetchProfile(xrInputSource, basePath);
    expect(profile).toEqual(validProfile);
  });

  test('Successfully fetch second profile from array length 3', async () => {
    const xrInputSource = buildXRInputSource(['made up name', validProfileId, 'other made up name']);
    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });
    fetchMock.getOnce(validProfilePath, { status: 200, body: validProfile });

    const { profile } = await fetchProfile(xrInputSource, basePath);
    expect(profile).toEqual(validProfile);
  });

  test('Fail to fetch non-existent profile id', async () => {
    const xrInputSource = buildXRInputSource(['made up name']);
    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });

    const error = new Error('No matching profile name found');
    await expect(fetchProfile(xrInputSource, basePath))
      .rejects.toEqual(error);
  });

  test('Fail to fetch etch missing profile JSON', async () => {
    const xrInputSource = buildXRInputSource([validProfileId]);
    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });

    const error = new Error('File not found');
    fetchMock.getOnce(validProfilePath, { status: 404, throws: error });

    await expect(fetchProfile(xrInputSource, basePath))
      .rejects.toEqual(error);
  });

  test('Fail to fetch profile with mismatched handedness', async () => {
    const xrInputSource = buildXRInputSource([validProfileId], Constants.Handedness.LEFT);
    fetchMock.getOnce(profilesListPath, { status: 200, body: profilesList });
    fetchMock.getOnce(validProfilePath, { status: 200, body: validProfile });

    await expect(fetchProfile(xrInputSource, basePath))
      .rejects.toEqual(new Error(`No matching handedness, left, in profile ${validProfileId}`));
  });
});
