import { Scale } from "./Scale.js";

/** @module FretboardExplorer/Fret */

/**
 * @constructor
 * @param {Note} note Note of the Fret
 * @param {int} stringNumber Number of the string
 * @param {int} fretNumber Number of the fret
 */
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

  this.NoteName = function (useAltName) {
    return useAltName ? this.Note.AltName : this.Note.Name;
  };

  this.ScalePosition = function (scale) {
    var position;
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
