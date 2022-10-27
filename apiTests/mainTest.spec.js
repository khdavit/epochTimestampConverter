import * as apiRequest from '../commands/apiRequests';

beforeAll(async () => {
  await apiRequest.constructor();
});

describe('Convert From Unix TimeStamp to Date String', () => {

  test('Convert standard positive test', async () => {
    expect(await apiRequest.convertTimestamp(1451613802)).toBe('2016-01-01 02:03:22');
  });

  test('Convert mid positive test', async () => {
    expect(await apiRequest.convertTimestamp(1073741823)).toBe('2004-01-10 01:37:03');
  });

  test('Convert minimum positive test', async () => {
    expect(await apiRequest.convertTimestamp(0)).toBe('1970-01-01 12:00:00');
  });

  test('Convert above minimum positive test', async () => {
    expect(await apiRequest.convertTimestamp(5067)).toBe('1970-01-01 01:24:27');
  });

  test('Convert below maximum positive test', async () => {
    expect(await apiRequest.convertTimestamp(2147480000)).toBe('2038-01-19 02:13:20');
  });

  test('Convert maximum positive test', async () => {
    expect(await apiRequest.convertTimestamp(2147483647)).toBe('2038-01-19 03:14:07');
  });

  test('Convert minimum negative test', async () => {
    expect(await apiRequest.convertTimestamp(-98346754)).toBe('1966-11-19 05:27:26');
  });

  test('Convert maximum negative test', async () => {
    expect(await apiRequest.convertTimestamp(9147483647)).toBe('2259-11-15 03:40:47');
  });

  test('Convert mid positive test', async () => {
    expect(await apiRequest.convertTimestamp(1073741823)).toBe('2004-01-10 01:37:03');
  });

  // Seems all real numbers are converted without considering mantissa
  test('Convert real number test', async () => {
    expect(await apiRequest.convertTimestamp(1073741823.7)).toBe('2004-01-10 01:37:03');
  });

  test('Convert string', async () => {
    expect(await apiRequest.convertTimestamp('string')).toBe(false);
  });

  test('Convert symbols', async () => {
    expect(await apiRequest.convertTimestamp('#$%^')).toBe(false);
  });
});
