export const NoteLetters = ["A", "B", "C", "D", "E", "F", "G"];
export const AllNotes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
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
export var Tunings = [
  {
    Key: "Standard",
    Name: "Standard Tuning",
    Strings: ["E", "A", "D", "G", "B", "E"],
  },
  {
    Key: "OpenDMinor",
    Name: "Open D Minor",
    Strings: ["D", "A", "D", "F", "A", "D"],
  },
  {
    Key: "OpenD",
    Name: "Open D",
    Strings: ["D", "A", "D", "F#", "A", "D"],
  },
  {
    Key: "DADGAD",
    Name: "DADGAD",
    Strings: ["D", "A", "D", "G", "A", "D"],
  },
  {
    Key: "OpenG",
    Name: "Open G",
    Strings: ["D", "G", "D", "G", "B", "D"],
  },
  {
    Key: "OpenA",
    Name: "Open A",
    Strings: ["E", "A", "C#", "E", "A", "E"],
  },
  {
    Key: "OpenC",
    Name: "Open C",
    Strings: ["C", "G", "C", "G", "C", "E"],
  },
  {
    Key: "OpenE",
    Name: "Open E",
    Strings: ["E", "B", "E", "G#", "B", "E"],
  },
  {
    Key: "MandolinStandard",
    Name: "Mandolin - Standard",
    Strings: ["G", "D", "A", "E"],
  },
  {
    Key: "BanjoStandard",
    Name: "Banjo - Standard",
    Strings: [{ Note: "G", Start: 6 }, "D", "G", "B", "D"],
  },
  {
    Key: "BanjoGMinor",
    Name: "Banjo - GMinor",
    Strings: [{ Note: "G", Start: 6 }, "D", "G", "Bb", "D"],
  },
];

export function GetTuning(name) {
  return Tunings.find((f) => f.Key === name);
}

export var NashvilleNumbers = [
  { Position: 1, Major: "I", Minor: "i" },
  { Position: 2, Major: "II", Minor: "ii" },
  { Position: 3, Major: "III", Minor: "iii" },
  { Position: 4, Major: "IV", Minor: "iv" },
  { Position: 5, Major: "V", Minor: "v" },
  { Position: 6, Major: "VI", Minor: "vi" },
  { Position: 7, Major: "VII", Minor: "vii" },
];
export const ScaleTypes = [
  {
    Key: "Major",
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
    Key: "Minor",
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
    Key: "Dorian",
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
    Key: "Phrygian",
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
    Key: "Lydian",
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
    Key: "Mixolydian",
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
  // {
  //   Key: "Aolian",
  //   Name: "Aolian",
  //   Intervals: [
  //     Intervals.WholeStep,
  //     Intervals.HalfStep,
  //     Intervals.WholeStep,
  //     Intervals.WholeStep,
  //     Intervals.HalfStep,
  //     Intervals.WholeStep,
  //   ],
  // },
  {
    Key: "Locrian",
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

export const ScaleRelationships = ["Major", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Minor", "Locrian"];

export function GetScaleType(name) {
  return ScaleTypes.find((f) => f.Name === name);
}

export var ChordTypes = [
  {
    Name: "Major",
    NumberOfNotes: 3,
    Display: "",
    NashvilleSuffix: "",
    Intervals: [Intervals.MajorThird, Intervals.PerfectFifth],
  },
  {
    Name: "Minor",
    NumberOfNotes: 3,
    Display: "min",
    NashvilleSuffix: "m",
    Intervals: [Intervals.MinorThird, Intervals.PerfectFifth],
  },
  {
    Name: "Diminished",
    NumberOfNotes: 3,
    Display: "dim",
    NashvilleSuffix: "°",
    Intervals: [Intervals.MinorThird, Intervals.DiminishedFifth],
  },
  {
    Name: "Sustained2nd",
    NumberOfNotes: 3,
    Display: "sus2",
    NashvilleSuffix: "sus2",
    Intervals: [Intervals.WholeStep, Intervals.PerfectFifth],
  },
  {
    Name: "Sustained4th",
    NumberOfNotes: 3,
    Display: "sus4",
    NashvilleSuffix: "sus4",
    Intervals: [Intervals.PerfectFourth, Intervals.PerfectFifth],
  },
  {
    Name: "Seventh",
    NumberOfNotes: 4,
    Display: "7",
    NashvilleSuffix: "7",
    Intervals: [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh],
  },
  {
    Name: "MinorSeventh",
    NumberOfNotes: 4,
    Display: "m7",
    NashvilleSuffix: "m7",
    Intervals: [Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh],
  },
  {
    Name: "MajorSeventh",
    NumberOfNotes: 4,
    Display: "Maj7",
    NashvilleSuffix: "Δ",
    Intervals: [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSeventh],
  },
  {
    Name: "HalfDiminishedSeventh",
    NumberOfNotes: 4,
    Display: "Half-Dim7",
    NashvilleSuffix: "ø7",
    Intervals: [Intervals.MinorThird, Intervals.DiminishedFifth, Intervals.MinorSeventh],
  },
];

export function GetChordType(name) {
  return ChordTypes.find((f) => f.Name === name);
}
