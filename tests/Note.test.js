import * as MusicDefs from '../MusicDefs.js';
import {Note} from '../Note.js';

var note = new Note('D');


describe('Testing Note', () => {
    test('Calling constructor with a note name works as expected', () => {
        expect(note.Name).toBe('D');
    });

    test('Testing Note.Index', () => {
        expect(note.Index).toBe(5);
    });

    test('Testing Note.GetAltName', () => {
        var dsharp = new Note('D#');
        expect(dsharp.AltName).toBe('Eb');
    });

    test('Testing Note.NextNote', () => {
        expect(note.NextNote().Name).toBe('D#');
    });
    
    test('Testing Note.PrevNote', () => {
        expect(note.PrevNote().Name).toBe('C#');
    });

    test('Testing Note.DisplayName', () => {
        expect(note.DisplayName).toBe('D');
    });

    test('Testing Note.DisplayName with a sharp', () => {
        var fsharp = new Note('F#');
        expect(fsharp.DisplayName).toBe('F# / Gb');
    });

    test('Testing Note.GetInterval', () => {
        var a = new Note('A');
        expect(note.GetInterval(a)).toStrictEqual(MusicDefs.Intervals.PerfectFifth);
    });

    test('Testing Note.GetInterval Again', () => {
        var a = new Note('A');
        expect(a.GetInterval(note)).toBe(MusicDefs.Intervals.PerfectFourth);
    });

    var none = new Note('None');

    test('Testing Note constructor with None', () => {
        expect(none.Name).toBe('None');
    });

    test('Testing Note.AltName with None', () => {
        expect(none.AltName).toBe('None');
    });

    test('Testing Note.NextNote with None', () => {
        expect(none.NextNote().Name).toBe('None');
    });

    test('Testing Note.PrevNote with None', () => {
        expect(none.PrevNote().Name).toBe('None');
    });

    test('Testing Note.DisplayName with None', () => {
        expect(none.DisplayName).toBe('');
    });
})