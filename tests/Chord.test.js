/* eslint-disable no-undef */
import * as Util from "../Util.js";
import * as MusicDefs from "../MusicDefs.js";
import { Note } from "../Note.js";
import { Chord } from "../Chord.js";

var C = new Note("C");
var maj;
var CMajor;
var useAltName = false;

describe("Testing Chord Major", () => {
  maj = MusicDefs.GetChordType("Major");
  CMajor = new Chord(C, maj);

  test("Sanity check", () => {
    expect(maj.Name).toBe("Major");
  });

  test("Test Chord.Name", () => {
    expect(CMajor.Name).toBe("C Major");
  });

  test("Test Chord.Root", () => {
    expect(CMajor.Root.Name).toBe("C");
  });

  test("Test Chord.ChordType Major", () => {
    expect(CMajor.ChordType.Name).toBe("Major");
  });

  test("Test Chord.Display Major", () => {
    expect(CMajor.Display(useAltName)).toBe("C");
  });

  test("Test Chord.Notes Major", () => {
    expect(CMajor.Notes.length).toBe(3);
    expect(CMajor.Notes[0].Name).toBe("C");
    expect(CMajor.Notes[1].Name).toBe("E");
    expect(CMajor.Notes[2].Name).toBe("G");
  });

  test("Test ChordDisplayName", () => {
    expect(CMajor.DisplayName(false)).toBe("C Major");
  });

  test("Test ChordDisplayName with alt name", () => {
    var bFlatNote = new Note("A#");
    var bFlat = new Chord(bFlatNote, maj);
    expect(bFlat.DisplayName(true)).toBe("Bb Major");
  });
});

describe("Testing Chord Minor", () => {
  var CMinor = new Chord(
    C,
    MusicDefs.ChordTypes.find((f) => f.Name === "Minor")
  );

  test("Test Chord.ChordType Minor", () => {
    expect(CMinor.ChordType.Name).toBe("Minor");
  });

  test("Test Chord.Display Minor", () => {
    expect(CMinor.Display(useAltName)).toBe("Cmin");
  });

  test("Test Chord.Notes Minor", () => {
    expect(CMinor.Notes.length).toBe(3);
    expect(CMinor.Notes[0].Name).toBe("C");
    expect(CMinor.Notes[1].Name).toBe("D#");
    expect(CMinor.Notes[2].Name).toBe("G");
  });
});

describe("Test Chord Diminished", () => {
  var CDiminished = new Chord(
    C,
    MusicDefs.ChordTypes.find((f) => f.Name === "Diminished")
  );

  test("Test Chord.ChordType Diminished", () => {
    expect(CDiminished.ChordType.Name).toBe("Diminished");
  });

  test("Test Chord.Display Diminished", () => {
    expect(CDiminished.Display(useAltName)).toBe("Cdim");
  });

  test("Test Chord.Notes Diminished", () => {
    expect(CDiminished.Notes.length).toBe(3);
    expect(CDiminished.Notes[0].Name).toBe("C");
    expect(CDiminished.Notes[1].Name).toBe("D#");
    expect(CDiminished.Notes[2].Name).toBe("F#");
  });
});

describe("Test Chord Seventh", () => {
  var seventh = MusicDefs.GetChordType("Seventh");
  var CSeventh = new Chord(C, seventh);

  test("Test Chord.ChordType Seventh", () => {
    expect(CSeventh.ChordType.Name).toBe("Seventh");
  });

  test("Test Chord.Display Seventh", () => {
    expect(CSeventh.Display(useAltName)).toBe("C7");
  });

  test("Test Chord.Notes Seventh", () => {
    expect(CSeventh.Notes.length).toBe(4);
    expect(CSeventh.Notes[0].Name).toBe("C");
    expect(CSeventh.Notes[1].Name).toBe("E");
    expect(CSeventh.Notes[2].Name).toBe("G");
    expect(CSeventh.Notes[3].Name).toBe("A#");
  });
});
