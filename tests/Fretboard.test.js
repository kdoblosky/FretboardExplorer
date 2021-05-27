import * as MusicDefs from '../MusicDefs.js';
import {Note} from '../Note.js';
import {Chord} from '../Chord.js';
import {FretboardString} from '../FretboardString.js';
import {FretAttribute} from '../FretAttribute.js';
import {Fretboard} from '../Fretboard.js';
import { Scale } from '../Scale.js';

describe('Test Fretboard with Standard tuning', () => {
    
    var frets;
    var scaleFrets;
    var nonScaleFrets;
    var scaleRootFrets;

    beforeAll(() => {
        var tuning = MusicDefs.GetTuning('Standard');
        Fretboard.SetTuning(tuning);

        var minor = MusicDefs.GetScaleType('Minor');
        var aMinor = new Scale('A', minor);
        Fretboard.SetScale(aMinor);

        frets = Fretboard.GetAllFrets();
        scaleFrets = Fretboard.GetScaleFrets();
        nonScaleFrets = Fretboard.GetNonScaleFrets();
        scaleRootFrets = Fretboard.GetScaleRootFrets();
    });
        
    test('Test Fretboard has correct # of strings', () => {
        expect(Fretboard.FretboardMap.length).toBe(6);
    });

    test('Test First string has correct note at 5th Fret', () => {
        expect(Fretboard.FretboardMap[0].Frets[5].Note.Name).toBe('A');
    });

    test('Test Fretboard.GetAllFrets has correct number of strings', () => {
        expect(frets.length).toBe(13*6);
    });

    test('Test Fretboard.GetScaleFrets contains notes of scale', () => {
        expect(scaleFrets.filter(f => f.Note.Name === 'A').length).toBeGreaterThanOrEqual(6);
        expect(scaleFrets.filter(f => f.Note.Name === 'B').length).toBeGreaterThanOrEqual(6);
        expect(scaleFrets.filter(f => f.Note.Name === 'C').length).toBeGreaterThanOrEqual(6);
        expect(scaleFrets.filter(f => f.Note.Name === 'D').length).toBeGreaterThanOrEqual(6);
        expect(scaleFrets.filter(f => f.Note.Name === 'E').length).toBeGreaterThanOrEqual(6);
        expect(scaleFrets.filter(f => f.Note.Name === 'F').length).toBeGreaterThanOrEqual(6);
        expect(scaleFrets.filter(f => f.Note.Name === 'G').length).toBeGreaterThanOrEqual(6);
    });

    test('Test Fretboard.GetScaleFrets does not contain non-scale frets', () => {
        expect(scaleFrets.filter(f => f.Note.Name === 'A#').length).toBe(0);
        expect(scaleFrets.filter(f => f.Note.Name === 'C#').length).toBe(0);
        expect(scaleFrets.filter(f => f.Note.Name === 'D#').length).toBe(0);
        expect(scaleFrets.filter(f => f.Note.Name === 'F#').length).toBe(0);
        expect(scaleFrets.filter(f => f.Note.Name === 'G#').length).toBe(0);
    });

    test('Test Fretboard.GetNotScaleFrets contains non-scale frets', () => {
        expect(nonScaleFrets.filter(f => f.Note.Name === 'A#').length).toBeGreaterThanOrEqual(6);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'C#').length).toBeGreaterThanOrEqual(6);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'D#').length).toBeGreaterThanOrEqual(6);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'F#').length).toBeGreaterThanOrEqual(6);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'G#').length).toBeGreaterThanOrEqual(6);
    });

    test('Test Fretboard.GetNonScaleFrets does not contain notes of scale', () => {
        expect(nonScaleFrets.filter(f => f.Note.Name === 'A').length).toBe(0);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'B').length).toBe(0);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'C').length).toBe(0);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'D').length).toBe(0);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'E').length).toBe(0);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'F').length).toBe(0);
        expect(nonScaleFrets.filter(f => f.Note.Name === 'G').length).toBe(0);
    });

    test('Test Fretboard.GetScaleRootNotes contains root note frets', () => {
        expect(scaleRootFrets.filter(f => f.Note.Name === 'A').length).toBeGreaterThanOrEqual(6);
    });

    test('Test Fretboard.GetScaleRootNotes does not contain any non-root note frets', () => {
        expect(scaleRootFrets.filter(f => f.Note.Name !== 'A').length).toBe(0);
    });
});

describe('Test Fretboard with BanjoGMinor Tuning', () => {
    beforeAll(() => {
        var tuningB = MusicDefs.GetTuning('BanjoGMinor');
        Fretboard.SetTuning(tuningB);  
    });
    
    
    test('Test Fretboard has correct # of strings', () => {
        expect(Fretboard.FretboardMap.length).toBe(5);
    });

    test('Test First string has correct note at 6th Fret', () => {
        expect(Fretboard.FretboardMap[0].Frets.find(f => f.FretNumber === 6).Note.Name).toBe('G#');
    });
});