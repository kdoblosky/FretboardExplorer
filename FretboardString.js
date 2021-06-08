import { Note } from "./Note.js";
import { Fret } from "./Fret.js";
import * as Util from "./Util.js";
import * as MusicDefs from "./MusicDefs.js";

export function FretboardString(rootNote, numFrets, stringNumber, startNumber, capoFret) {
  if (!startNumber) {
    startNumber = 0;
  }
  this.RootNote = rootNote;
  if (!capoFret) {
    capoFret = 0;
  }
  this.CapoFret = capoFret;

  var root;

  if (capoFret == 0) {
    root = new Note(rootNote);
  } else {
    var adjustedNote = Util.GetArrayOffset(MusicDefs.AllNotes, rootNote, capoFret);
    root = new Note(adjustedNote);
  }

  this.StringNumber = stringNumber;
  this.id = "string-" + stringNumber;
  this.StartFret = startNumber;

  this.Frets = new Array();
  this.Frets.push(new Fret(root, stringNumber, 0));

  var n = this.Frets[0].Note;
  var next = null;
  for (var i = 1; i <= numFrets; i++) {
    if (i < startNumber) {
      this.Frets.push(new Fret(new Note("None"), stringNumber, i));
    } else if (i === startNumber) {
      next = root.NextNote();
      this.Frets.push(new Fret(next, stringNumber, i));
    } else {
      next = n.NextNote();
      this.Frets.push(new Fret(next, stringNumber, i));
    }
    n = next;
  }
}
