/** @module FretboardExplorer/MusicDefs */

/** Array of note letters, A through G, without sharps or flats */
export const NoteLetters = ["A", "B", "C", "D", "E", "F", "G"];

/** Array of all possible note names. Only includes sharps. */
export const AllNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

/** Array of interval types. Measured in half-steps. */
export const Intervals = {
  HalfStep: 1,
  WholeStep: 2,
  MinorThird: 3,
  MajorThird: 4,
  PerfectFourth: 5,
  DiminishedFifth: 6,
  PerfectFifth: 7,
  MinorSixth: 8,
  MajorSixth: 9,
  MinorSeventh: 10,
  MajorSeventh: 11,
};

/**
 * Array of Tunings. Each Tuning has three properties:
 * - Id: Lookup value for Tuning
 * - Name: Display name of Tuning
 * - Strings: In most cases, this is an array of strings, with each
 *    corresponding to the root note for a string.
 *    In some instances (mostly 5-string Banjo), you can specify an object
 *    for a string, with these properties:
 *      - Note: Starting note for the string.
 *      - Start: What fret the string should start on.
 */
export var Tunings = [
  {
    Id: "Standard",
    Name: "Standard Tuning",
    Strings: ["E", "A", "D", "G", "B", "E"],
  },
  {
    Id: "OpenDMinor",
    Name: "Open D Minor",
    Strings: ["D", "A", "D", "F", "A", "D"],
  },
  {
    Id: "OpenD",
    Name: "Open D",
    Strings: ["D", "A", "D", "F#", "A", "D"],
  },
  {
    Id: "DADGAD",
    Name: "DADGAD",
    Strings: ["D", "A", "D", "G", "A", "D"],
  },
  {
    Id: "OpenG",
    Name: "Open G",
    Strings: ["D", "G", "D", "G", "B", "D"],
  },
  {
    Id: "OpenA",
    Name: "Open A",
    Strings: ["E", "A", "C#", "E", "A", "E"],
  },
  {
    Id: "OpenC",
    Name: "Open C",
    Strings: ["C", "G", "C", "G", "C", "E"],
  },
  {
    Id: "OpenE",
    Name: "Open E",
    Strings: ["E", "B", "E", "G#", "B", "E"],
  },
  {
    Id: "MandolinStandard",
    Name: "Mandolin - Standard",
    Strings: ["G", "D", "A", "E"],
  },
  {
    Id: "BanjoStandard",
    Name: "Banjo - Standard",
    Strings: [{ Note: "G", Start: 6 }, "D", "G", "B", "D"],
  },
  {
    Id: "BanjoGMinor",
    Name: "Banjo - GMinor",
    Strings: [{ Note: "G", Start: 6 }, "D", "G", "Bb", "D"],
  },
];

/**
 * Returns the Tuning with the specified name.
 * @see {@link module:FretboardExplorer/MusicDefs.Tunings|Tunings}
 * @param {string} name
 * @returns {Tuning}
 */
export function GetTuning(name) {
  return Tunings.find((f) => f.Id === name);
}

/** Array of ScaleTypes. Each ScaleType has three properties:
 * - Id: Lookup value of the ScaleType
 * - Name: Display name of the ScaleType
 * - Intervals: Array of {@link module:FretboardExplorer/MusicDefs.Intervals|Intervals}
 */
export const ScaleTypes = [
  {
    Id: "Major",
    Name: "Major",
    Intervals: [
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.HalfStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
    ],
  },
  {
    Id: "Minor",
    Name: "Minor",
    Intervals: [
      Intervals.WholeStep,
      Intervals.HalfStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.HalfStep,
      Intervals.WholeStep,
    ],
  },
  {
    Id: "Dorian",
    Name: "Dorian",
    Intervals: [
      Intervals.WholeStep,
      Intervals.HalfStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.HalfStep,
    ],
  },
  {
    Id: "Phrygian",
    Name: "Phrygian",
    Intervals: [
      Intervals.HalfStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.HalfStep,
      Intervals.WholeStep,
    ],
  },
  {
    Id: "Lydian",
    Name: "Lydian",
    Intervals: [
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.HalfStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
    ],
  },
  {
    Id: "Mixolydian",
    Name: "Mixolydian",
    Intervals: [
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.HalfStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.HalfStep,
    ],
  },
  {
    Id: "Locrian",
    Name: "Locrian",
    Intervals: [
      Intervals.HalfStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
      Intervals.HalfStep,
      Intervals.WholeStep,
      Intervals.WholeStep,
    ],
  },
];

/**
 * Returns the scale with the specified name.
 * @see {@link module:FretboardExplorer/MusicDefs.ScaleTypes|ScaleTypes}
 * @param {string} name Name of scale to return
 * @returns {Scale}
 */
export function GetScaleType(name) {
  return ScaleTypes.find((f) => f.Name === name);
}

/**
 * Names of ScaleTypes - used to determine enharmonic scales.
 */
export const ScaleRelationships = ["Major", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Minor", "Locrian"];

export var ChordTypes = [
  {
    Name: "Major",
    NumberOfNotes: 3,
    Display: "",
    Intervals: [Intervals.MajorThird, Intervals.PerfectFifth],
  },
  {
    Name: "Minor",
    NumberOfNotes: 3,
    Display: "min",
    Intervals: [Intervals.MinorThird, Intervals.PerfectFifth],
  },
  {
    Name: "Diminished",
    NumberOfNotes: 3,
    Display: "dim",
    Intervals: [Intervals.MinorThird, Intervals.DiminishedFifth],
  },
  {
    Name: "Sustained2nd",
    NumberOfNotes: 3,
    Display: "sus2",
    Intervals: [Intervals.WholeStep, Intervals.PerfectFifth],
  },
  {
    Name: "Sustained4th",
    NumberOfNotes: 3,
    Display: "sus4",
    Intervals: [Intervals.PerfectFourth, Intervals.PerfectFifth],
  },
  {
    Name: "Augmented",
    NumberOfNotes: 3,
    Display: "aug",
    Intervals: [Intervals.MajorThird, Intervals.MinorSixth],
  },
  {
    Name: "Add2",
    NumberOfNotes: 4,
    Display: "add2",
    Intervals: [Intervals.WholeStep, Intervals.MajorThird, Intervals.PerfectFifth],
  },
  {
    Name: "MinorAdd2",
    NumberOfNotes: 4,
    Display: "madd2",
    Intervals: [Intervals.WholeStep, Intervals.MinorThird, Intervals.PerfectFifth],
  },
  {
    Name: "Add4",
    NumberOfNotes: 4,
    Display: "add4",
    Intervals: [Intervals.MajorThird, Intervals.PerfectFourth, Intervals.PerfectFifth],
  },
  {
    Name: "MinorAdd4",
    NumberOfNotes: 4,
    Display: "madd4",
    Intervals: [Intervals.MinorThird, Intervals.PerfectFourth, Intervals.PerfectFifth],
  },
  {
    Name: "Major6th",
    NumberOfNotes: 4,
    Display: "6",
    Intervals: [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSixth],
  },
  {
    Name: "Minor6th",
    NumberOfNotes: 4,
    Display: "min6",
    Intervals: [Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MajorSixth],
  },
  {
    Name: "Seventh",
    NumberOfNotes: 4,
    Display: "7",
    Intervals: [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh],
  },
  {
    Name: "MinorSeventh",
    NumberOfNotes: 4,
    Display: "m7",
    Intervals: [Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh],
  },
  {
    Name: "MajorSeventh",
    NumberOfNotes: 4,
    Display: "Maj7",
    Intervals: [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSeventh],
  },
  {
    Name: "HalfDiminishedSeventh",
    NumberOfNotes: 4,
    Display: "Half-Dim7",
    Intervals: [Intervals.MinorThird, Intervals.DiminishedFifth, Intervals.MinorSeventh],
  },
];

export function GetChordType(name) {
  return ChordTypes.find((f) => f.Name === name);
}
