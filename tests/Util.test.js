import * as Util from '../Util.js';

describe('Testing GetIndexOffset', () => {
    test('GetIndexOffset works correctly going forward', () => {
        expect(Util.GetIndexOffset(10, 2, 4)).toBe(6);
    });

    test('GetIndexOffset works correctly backward', () => {
        expect(Util.GetIndexOffset(10, 8, -3)).toBe(5);
    });

    test('GetIndexOffset wraps correctly forward', () => {
        expect(Util.GetIndexOffset(10, 8, 4)).toBe(2);
    });

    test('GetIndexOffset wraps correctly backward', () => {
        expect(Util.GetIndexOffset(10, 2, -5)).toBe(7);
    });
});

var testArr = ['A', 'B', 'C', 'D', 'E'];
describe('Testing GetArrayOffset', () => {
    test('GetArrayOffset works correctly forward', () => {
        expect(Util.GetArrayOffset(testArr, 'A', 3)).toBe('D');
    });

    test('GetArrayOffset works correctly backward', () => {
        expect(Util.GetArrayOffset(testArr, 'C', -2)).toBe('A');
    });

    test('GetArrayOffset wraps correctly forward', () => {
        expect(Util.GetArrayOffset(testArr, 'D', 3)).toBe('B');
    });

    test('GetArrayOffset wraps correctly backward', () => {
        expect(Util.GetArrayOffset(testArr, 'C', -4)).toBe('D');
    });
});