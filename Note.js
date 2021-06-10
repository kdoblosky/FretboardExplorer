import * as Util from "./Util.js";
import * as MusicDefs from "./MusicDefs.js";

/** @module FretboardExplorer/Note */
export function Note(name) {
  //console.log('name: ' + name)
  var that = this;

  /**
	 @property {Name}	{Name} - Name of the note
	*/
  this.Name = name;

  this.Index = MusicDefs.AllNotes.indexOf(name);

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

  this.AltName = GetAltName();

  this.NextNote = function () {
    if (that.Name === "None") {
      return new Note("None");
    } else {
      var offset = this.GetNoteOffset(1);
      return new Note(offset);
    }
  };

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

  this.DisplayName = GetDisplayName();

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
