import { Note } from "./Note.js";
import { Fret } from "./Fret.js";

export function FretboardString(rootNote, numFrets, stringNumber, startNumber) {
  if (startNumber === undefined) {
    startNumber = 0;
  }
  this.RootNote = rootNote;
  var root = new Note(rootNote);
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
