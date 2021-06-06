import { Scale } from "./Scale.js";

export function Fret(note, stringNumber, fretNumber) {
  //console.log(note);
  this.Note = note;

  this.StringNumber = stringNumber;
  this.FretNumber = fretNumber;

  this.HasNote = note !== null;
  this.ScaleNote = false;
  this.ScaleRootNote = false;
  this.ChordNote = false;
  this.Classes = null;

  this.NoteName = function () {
    return this.Note.DisplayName;
  };

  this.ScalePosition = function (scale) {
    var position = "";
    if (scale.NoteLetters.includes(this.Note.Name)) {
      position = scale.NoteLetters.indexOf(this.Note.Name) + 1;
    }
    return position;
  };

  this.FretAttributes = new Array();

  this.HasFretAttribute = function (fretAttribute) {
    return this.FretAttributes.includes(fretAttribute);
  };

  this.id = "string-" + stringNumber + "-fret-" + fretNumber;
}
