import * as MusicDefs from '../MusicDefs.js';

describe('Testing NoteLetters', () => {
    test('NoteLetters contains the correct number sequence of values', () => {
        expect(MusicDefs.NoteLetters).toStrictEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
});

describe('Testing AllNotes', () => {
    test('AllNotes contains the correct sequence of values', () => {
        expect(MusicDefs.AllNotes).toStrictEqual(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']);
    })
});