import { convertMsToTime, generateRandomString } from './utils';

describe('convertMsToTime tests', () => {
    test('60000ms returns 1:00', () => {
        const ms = 60000;

        const time = convertMsToTime(ms);

        expect(time).toBe('1:00');
    });
    test('1000 returns 0:01', () => {
        const ms = 1000;

        const time = convertMsToTime(ms);

        expect(time).toBe('0:01');
    });
    test('3600000 returns 1:00:00', () => {
        const ms = 3600000;

        const time = convertMsToTime(ms);

        expect(time).toBe('1:00:00');
    });

});
describe('generateRandomString tests', () => {
   test('returns empty string when passed 0', () => {
    const desiredLength = 0;

    const result = generateRandomString(desiredLength);

    expect(result.length).toBe(0);
   });
   test('returns string with length 2 when passed 2', () => {
    const desiredLength = 2;

    const result = generateRandomString(desiredLength);

    expect(result.length).toBe(2);
   });
   test('throws error if non-negative number is passed', () => {
    const desiredLength = -2;

    const result = () => {
        generateRandomString(desiredLength);
    }

    expect(result).toThrow();
    });
});