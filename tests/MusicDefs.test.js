import * as MusicDefs from '../MusicDefs.js';
import {Intervals} from '../MusicDefs.js';

describe('Testing NoteLetters', () => {
    test('NoteLetters contains the correct sequence of values', () => {
        expect(MusicDefs.NoteLetters).toStrictEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
});

describe('Testing AllNotes', () => {
    test('AllNotes contains the correct sequence of values', () => {
        expect(MusicDefs.AllNotes).toStrictEqual(['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']);
    });
});

describe('Testing Tunings', () => {
    test('Tunings contains Standard', () => {
        expect(MusicDefs.Tunings.find(f => f.Key === 'Standard').Name).toBe('Standard Tuning');
    });
    test('Standard Tuning contains correct sequence of Strings', () => {
        expect(MusicDefs.Tunings.find(f => f.Key === 'Standard').Strings).toStrictEqual(['E', 'A', 'D', 'G', 'B', 'E']);
    });
});

describe('Testing NashvilleNumbers', () => {
    test('NashvilleNumbers contains seven elements', () => {
        expect(MusicDefs.NashvilleNumbers.length).toBe(7);
    });
    test('NashvilleNumbers 7 has correct value for Major', () => {
        expect(MusicDefs.NashvilleNumbers.find(f => f.Position === 7).Major).toBe("VII");
    });
    test('NashvilleNumbers 4 has correct value for Minor', () => {
        expect(MusicDefs.NashvilleNumbers.find(f => f.Position === 4).Minor).toBe("iv");
    });
});

describe('Testing ScaleTypes', () => {
    test('ScaleTypes contains Minor', () => {
        expect(MusicDefs.ScaleTypes.find(f => f.Key === 'Minor').Name).toBe('Minor');
    });
    test('Dorian ScaleType correct sequence of Intervals', () => {
        expect(MusicDefs.ScaleTypes.find(f => f.Key === 'Dorian').Intervals).toStrictEqual([Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep]);
    });
});

describe('Testing GetChordType', () => {
    test('Test GetChordType Major', () => {
        var sc = MusicDefs.GetChordType('Major');
        expect(sc.Name).toBe('Major');
    });

    test('Test GetChordType Minor', () => {
        var sc = MusicDefs.GetChordType('Minor');
        expect(sc.Name).toBe('Minor');
    });

    test('Test GetChordType Diminished', () => {
        var sc = MusicDefs.GetChordType('Diminished');
        expect(sc.Name).toBe('Diminished');
    });

    test('Test GetChordType Seventh', () => {
        var sc = MusicDefs.GetChordType('Seventh');
        expect(sc.Name).toBe('Seventh');
    });

    test('Test GetChordType MinorSeventh', () => {
        var sc = MusicDefs.GetChordType('MinorSeventh');
        expect(sc.Name).toBe('MinorSeventh');
    });

    test('Test GetChordType MajorSeventh', () => {
        var sc = MusicDefs.GetChordType('MajorSeventh');
        expect(sc.Name).toBe('MajorSeventh');
    });

});

describe('Testing ChordTypes', () => {
    test('ChordTypes contains Minor', () => {
        expect(MusicDefs.ChordTypes.find(f => f.Name === 'Minor').Name).toBe('Minor');
    });
    test('MinorSeventh ChordType correct sequence of Intervals', () => {
        expect(MusicDefs.ChordTypes.find(f => f.Name === 'MinorSeventh').Intervals).toStrictEqual([Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]);
    });
});