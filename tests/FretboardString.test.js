import {Note} from '../Note.js';
import {Fret} from '../Fret.js';
import {FretboardString} from '../FretboardString.js';

describe('Testing FretboardString', () => {
    var fbs = new FretboardString('E', 15, 2, 1);

    test('Test FretboardString creates correct number of Frets', () => {
        expect(fbs.Frets.length).toBe(16);
    });

    test('Test FretboardString has correct RootNote', () => {
        expect(fbs.RootNote).toBe('E');
    });

    test('Test FretboardString has correct StringNumber', () => {
        expect(fbs.StringNumber).toBe(2);
    });

    test('Test FretboardString has correct StartFret', () => {
        expect(fbs.StartFret).toBe(1);
    });

    test('Test FretboardString has correct note on 7th fret', () => {
        expect(fbs.Frets[7].Note.Name).toBe('B');
    });

    test('Test FretboardString with higher StartFret', () => {
        var b = new FretboardString('G', 12, 5, 6);
        expect(b.Frets.find(f => f.FretNumber === 6).Note.Name).toBe('G#');
    });

    test('Test FretboardString defaults to 0 as start number', () => {
        var c = new FretboardString('C', 12, 4);
        expect(c.StartFret).toBe(0);
        expect(c.Frets.find(f => f.FretNumber === 5).Note.Name).toBe('F');
    });
});