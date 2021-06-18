import * as Util from "./Util.js";
import * as MusicDefs from "./MusicDefs.js";

/** @module FretboardExplorer/Note */

/**
 * Create a new Note.
 *
 * @constructor
 * @param {string} name Root note. Always use sharps here.
 */
export function Note(name) {
  var that = this;

  if (name.includes("b")) {
    name = Util.GetArrayOffset(MusicDefs.NoteLetters, name.replace("b", ""), -1) + "#";
  }
  /**
   * @property {string} Name Name of the note
   */
  this.Name = name;

  /**
   * @property {int} Index Index of the note, within MusicDefs.AllNotes
   */
  this.Index = MusicDefs.AllNotes.indexOf(name);

  /**
   * Give current note, returns the name of a note that is offset
   * by the specified number of half-steps.
   *
   * @param {int} offset Number of half-steps to offset.
   * @returns {string} Name of offset note.
   */
  this.GetNoteOffset = function (offset) {
    return Util.GetArrayOffset(MusicDefs.AllNotes, that.Name, offset);
  };

  var GetAltName = function () {
    if (that.Name === "None") {
      return that.Name;
    } else if (that.Name.includes("#")) {
      return that.GetNoteOffset(1) + "b";
      // TODO: handle exceptions for cases below
      // } else if (that.Name == "C") {
      //   return "B#";
      // } else if (that.Name == "B") {
      //   return "Cb";
      // } else if (that.Name == "E") {
      //   return "Fb";
      // } else if (that.Name == "F") {
      //   return "E#";
    } else {
      return that.Name;
    }
  };

  /**
   * @property {string} Alternate Alternate name of the note. I.e. for a note with the name
   * F#, returns Gb.
   */
  this.AltName = GetAltName();

  /**
   * Gets the next note in the chromatic scale.
   * @returns {Note} The next chromatic note
   */
  this.NextNote = function () {
    if (that.Name === "None") {
      return new Note("None");
    } else {
      var offset = this.GetNoteOffset(1);
      return new Note(offset);
    }
  };

  /**
   * Gets the previous note in the chromatic scale.
   *
   * @returns {Note} The previous chromatic note
   */
  this.PrevNote = function () {
    if (that.Name === "None") {
      return new Note("None");
    } else {
      var offset = this.GetNoteOffset(-1);
      return new Note(offset);
    }
  };

  var GetDisplayName = function () {
    if (that.Name === that.AltName) {
      if (that.Name === "None") {
        return "";
      } else {
        return that.Name;
      }
    } else {
      return that.Name + " / " + that.AltName;
    }
  };

  /**
   * @property {string} DisplayName Full display name of note
   */
  this.DisplayName = GetDisplayName();

  /**
   *
   * @param {Note} note
   * @returns {int} Number of half-steps between this Note, and provided Note.
   */
  this.GetInterval = function (note) {
    var interval;
    var rootIndex = MusicDefs.AllNotes.indexOf(this.Name);
    var noteIndex = MusicDefs.AllNotes.indexOf(note.Name);

    if (noteIndex < rootIndex) {
      noteIndex = MusicDefs.AllNotes.length + noteIndex;
    }

    var distance = noteIndex - rootIndex;

    interval = Object.values(MusicDefs.Intervals).find((i) => i == distance);

    return interval;
  };
}
