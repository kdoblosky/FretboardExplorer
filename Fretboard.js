import { FretboardString } from "./FretboardString.js";
import { FretAttribute } from "./FretAttribute.js";
import * as MusicDefs from "./MusicDefs.js";
import * as Util from "./Util.js";
import { Note } from "./Note.js";

export var Fretboard = {
  FretboardMap: new Array(),
  Scale: null,
  Tuning: {},
  HTMLManager: {},
  FretsPerString: 12,
  CapoFret: 0,

  ResetFrets: function () {
    var frets = this.GetAllFrets();
    frets.forEach((f) => {
      f.FretAttributes.length = 0;
      f.ScaleNote = false;
      f.ScaleRootNote = false;
      f.ChordNote = false;
    });
  },

  SetScale: function (scale) {
    this.Scale = scale;

    this.ResetFrets();
    var frets = this.GetAllFrets();

    // Add ScaleNote Attribute
    frets
      .filter((f) => this.Scale.NoteLetters.includes(f.Note.Name))
      .forEach((f) => {
        f.ScaleNote = false;
        f.FretAttributes.push(FretAttribute.ScaleNote);
      });

    // Add NonScale Attribute
    frets
      .filter((f) => !this.Scale.NoteLetters.includes(f.Note.Name))
      .forEach((f) => {
        f.ScaleNote = false;
        f.FretAttributes.push(FretAttribute.NonScale);
      });

    // Add NoteNone Attribute
    frets
      .filter((f) => f.Note.Name == "None")
      .forEach((f) => {
        f.FretAttributes.push(FretAttribute.NoteNone);
      });

    var scaleAttributePositions = [
      FretAttribute.ScaleRoot,
      FretAttribute.ScaleSecond,
      FretAttribute.ScaleThird,
      FretAttribute.ScaleFourth,
      FretAttribute.ScaleFifth,
      FretAttribute.ScaleSixth,
      FretAttribute.ScaleSeventh,
    ];

    // Set Scale position attributes
    for (var i = 0; i < scaleAttributePositions.length; i++) {
      frets
        .filter((f) => f.Note.Name == Fretboard.Scale.NoteLetters[i])
        .forEach((f) => {
          if (i === 0) {
            f.ScaleRoot = true;
          }
          f.FretAttributes.push(scaleAttributePositions[i]);
        });
    }
  },

  GetAllFrets: function () {
    var all = [];
    this.FretboardMap.forEach((f) => {
      all = all.concat(f.Frets);
    });
    return all;
  },

  GetScaleFrets: function () {
    return this.GetAllFrets().filter((f) => this.Scale.NoteLetters.includes(f.Note.Name));
  },

  GetNonScaleFrets: function () {
    return this.GetAllFrets().filter((f) => this.Scale.NoteLetters.includes(f.Note.Name) === false);
  },

  GetScaleRootFrets: function () {
    return this.GetAllFrets().filter((f) => this.Scale.Root === f.Note.Name);
  },

  GetFretsWithAttribute: function (attribute) {
    return this.GetAllFrets().filter((f) => f.FretAttributes.includes(attribute));
  },

  SetTuning: function (tuning, capoFret) {
    if (capoFret) {
      this.CapoFret = capoFret;
    }
    this.Tuning = tuning;
    this.FretboardMap = [];
    for (var i = 0; i < this.Tuning.Strings.length; i++) {
      //Strings: [{Note: 'G'; Start: 5}, 'D', 'G', 'B', 'D']
      // This is to accomodate instruments like the 5-string banjo,
      // where the 5th string doesn't start until the 6th fret.

      if (
        Object.prototype.hasOwnProperty.call(this.Tuning.Strings[i], "Note") &&
        Object.prototype.hasOwnProperty.call(this.Tuning.Strings[i], "Start")
      ) {
        this.FretboardMap.push(
          new FretboardString(
            this.Tuning.Strings[i].Note,
            this.FretsPerString,
            i,
            this.Tuning.Strings[i].Start,
            this.CapoFret
          )
          //new FretboardString(adjustedNote, this.FretsPerString, i, this.Tuning.Strings[i].Start)
        );
      } else {
        this.FretboardMap.push(
          new FretboardString(this.Tuning.Strings[i], this.FretsPerString, i, null, this.CapoFret)
        );
        //this.FretboardMap.push(new FretboardString(adjustedNote, this.FretsPerString, i));
      }
    }

    if (this.Scale !== null) {
      this.SetScale(this.Scale);
    }
  },
};
