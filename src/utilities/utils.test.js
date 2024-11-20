import { convertMsToTime } from './utils';

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