/* eslint-disable no-undef */
import * as Util from "../Util.js";
import * as MusicDefs from "../MusicDefs";
import { Note } from "../Note.js";
import { Fret } from "../Fret.js";
import { FretAttribute } from "../FretAttribute";
import { Scale } from "../Scale.js";

describe("Test Fret", () => {
  var dsharp = new Note("D#");
  var fret = new Fret(dsharp, 3, 5);

  test("Test Fret has correct note", () => {
    expect(fret.Note.Name).toBe("D#");
  });

  test("Test Fret has correct String Number", () => {
    expect(fret.StringNumber).toBe(3);
  });

  test("Test Fret has correct FretNumber", () => {
    expect(fret.FretNumber).toBe(5);
  });

  test("Test Fret.HasNote", () => {
    expect(fret.HasNote).toBe(true);
  });

  test("Test ScalePosition", () => {
    var scale = new Scale("C#", MusicDefs.GetScaleType("Major"));
    expect(fret.ScalePosition(scale)).toBe(2);
  });

  test("Test NoteName", () => {
    expect(fret.NoteName()).toBe("D# / Eb");
  });
});

describe("Test Fret with no note", () => {
  var fret = new Fret(null, 5, 3);
  test("Test creating fret without a note", () => {
    expect(fret.HasNote).toBe(false);
  });
});

describe("Test Fret with FretAttributes", () => {
  var f = new Note("F");
  var fret = new Fret(f, 4, 7);
  fret.FretAttributes.push(FretAttribute.ScaleNote);
  fret.FretAttributes.push(FretAttribute.ScaleRoot);
  fret.FretAttributes.push(FretAttribute.ChordNote);
  fret.FretAttributes.push(FretAttribute.ChordRoot);

  test("Test Fret has attribute ScaleNote", () => {
    expect(fret.HasFretAttribute(FretAttribute.ScaleNote)).toBe(true);
  });

  test("Test Fret has attribute ScaleRoot", () => {
    expect(fret.HasFretAttribute(FretAttribute.ScaleRoot)).toBe(true);
  });

  test("Test Fret has attribute ChordNote", () => {
    expect(fret.HasFretAttribute(FretAttribute.ChordNote)).toBe(true);
  });

  test("Test Fret has attribute ChordRoot", () => {
    expect(fret.HasFretAttribute(FretAttribute.ChordRoot)).toBe(true);
  });

  test("Test Fret does not have attribute ScaleThird", () => {
    expect(fret.HasFretAttribute(FretAttribute.ScaleThird)).toBe(false);
  });

  test("Test Fret.ScalePosition", () => {
    var scale = new Scale("A", MusicDefs.GetScaleType("Major"));
    var aMinorScale = new Scale("A", MusicDefs.GetScaleType("Minor"));
    expect(fret.ScalePosition(scale)).toBeFalsy();
    expect(fret.ScalePosition(aMinorScale)).toBe(6);
  });
});
