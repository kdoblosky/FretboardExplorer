/* eslint-disable no-undef */
import * as Util from "../Util.js";
import * as MusicDefs from "../MusicDefs.js";
import { Note } from "../Note.js";
import { Chord } from "../Chord.js";
import { Scale } from "../Scale.js";

describe("Testing Scale", () => {
  var maj = MusicDefs.GetScaleType("Major");

  var sc = new Scale("C", maj);
  test("Testing constructor ", () => {
    expect(sc.Name).toBe("C Major");
  });

  test("Test Scale.NoteLetters contains correct number of elements", () => {
    expect(sc.NoteLetters.length).toBe(7);
  });

  test("Test Scale.NoteLetters contains correct sequence", () => {
    expect(sc.NoteLetters).toStrictEqual(["C", "D", "E", "F", "G", "A", "B"]);
  });

  test("Test Scale.ScaleChords contains correct number of elements", () => {
    expect(sc.ScaleChords.length).toBe(7);
  });

  test("Test Scale.ScaleSeventhChords contains correct number of elements", () => {
    expect(sc.ScaleSeventhChords.length).toBe(7);
  });

  test("Test Scale.ScaleChords 6th element is correct", () => {
    expect(sc.ScaleChords[5].Display).toBe("vi - Amin");
  });
});

describe("Testing GetEnharmonicScales", () => {
  var scl;
  var enh;

  beforeAll(() => {
    scl = new Scale("C", MusicDefs.GetScaleType("Major"));
    enh = scl.GetEnharmonicScales();
  });
  test("Test Includes D Dorian", () => {
    expect(enh).toContain("D Dorian");
  });

  test("Test Includes E Phrygian", () => {
    expect(enh).toContain("E Phrygian");
  });
  test("Test Includes F Lydian", () => {
    expect(enh).toContain("F Lydian");
  });
  test("Test Includes G Mixolydian", () => {
    expect(enh).toContain("G Mixolydian");
  });
  test("Test Includes A Minor", () => {
    expect(enh).toContain("A Minor");
  });
  test("Test Includes B Locrian", () => {
    expect(enh).toContain("B Locrian");
  });
});
