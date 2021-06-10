import * as Util from "./Util.js";
import * as MusicDefs from "./MusicDefs.js";
import { Note } from "./Note.js";
import { Chord } from "./Chord.js";

export function Scale(root, scaleType) {
  var that = this;
  this.NoteLetters = new Array();
  this.ScaleType = scaleType;
  this.Root = root;
  this.ScaleNotes = new Array();
  this.ScaleChords = new Array();
  this.ScaleSeventhChords = new Array();
  this.Name = root + " " + scaleType.Name;
  this.UseAltNames = false;

  function ScaleNote(note, scaleType, scaleLetters) {
    this.Note = new Note(note);
    this.ScaleType = scaleType;
    this.Position = scaleLetters.indexOf(note) + 1;
    this.NextNote = Util.GetArrayOffset(scaleLetters, note, 1);
    this.PrevNote = Util.GetArrayOffset(scaleLetters, note, -1);
    this.Third = Util.GetArrayOffset(scaleLetters, note, 2);
    this.Fifth = Util.GetArrayOffset(scaleLetters, note, 4);
    this.Seventh = Util.GetArrayOffset(scaleLetters, note, 6);
    this.ScaleChords = [];
  }

  function ScaleChord(scaleNote, chordType) {
    this.Chord = new Chord(scaleNote.Note, chordType);
    this.Position = scaleNote.Position;
    this.NashvilleNumber = MusicDefs.NashvilleNumbers.find((f) => f.Position === scaleNote.Position);
    this.ScaleRootNote = scaleNote;

    this.DisplayName = function () {
      var number = this.NashvilleNumber.Position.toString() + this.Chord.ChordType.NashvilleSuffix;
      return number + " - " + this.Chord.Display(that.UseAltNames);
    };

    this.Display = this.DisplayName();

    this.GetID = function () {
      return (this.Chord.Root.Name + "-" + this.Chord.ChordType.Name).toLocaleLowerCase().replace(/ /g, "-");
    };

    this.ID = this.GetID();
  }

  this.NoteLetters.push(root);
  var currentNote = root;

  scaleType.Intervals.forEach((interval) => {
    var nextNote = Util.GetArrayOffset(MusicDefs.AllNotes, currentNote, interval);
    this.NoteLetters.push(nextNote);
    currentNote = nextNote;
  });

  this.NoteLetters.forEach((letter) => {
    this.ScaleNotes.push(new ScaleNote(letter, scaleType, this.NoteLetters));
  });

  var distinctScaleLetters = this.NoteLetters.map((nl) => nl.replace("#", ""));
  var setDistinct = new Set(distinctScaleLetters);
  if (setDistinct.size != this.NoteLetters.length) {
    this.UseAltNames = true;
  } else {
    this.UseAltNames = false;
  }

  function getAllScaleChords(startingNote) {
    // Loop through all chord types, trying intervals
    // If all notes are contained within the scale, then it's a valid chord
    var chords = [];
    MusicDefs.ChordTypes.forEach((ct) => {
      var isScaleChord = true;
      ct.Intervals.forEach((i) => {
        if (!that.ScaleNotes.map((sn) => sn.Note.Name).includes(startingNote.Note.GetNoteOffset(i))) {
          isScaleChord = false;
        }
      });

      if (isScaleChord) {
        chords.push(new ScaleChord(startingNote, ct));
      }
    });
    return chords;
  }

  function getScaleChordType(startingNote, numberOfNotes) {
    var intervals = [];
    intervals.push(startingNote.Note.GetInterval(new Note(startingNote.Third)));
    intervals.push(startingNote.Note.GetInterval(new Note(startingNote.Fifth)));

    if (numberOfNotes === 4) {
      intervals.push(startingNote.Note.GetInterval(new Note(startingNote.Seventh)));
    }
    var chordIntervals = JSON.stringify(intervals);
    var chordType = null;

    chordType = MusicDefs.ChordTypes.find(
      (ct) => ct.NumberOfNotes === numberOfNotes && JSON.stringify(ct.Intervals) === chordIntervals
    );

    return chordType;
  }

  this.ScaleNotes.forEach((sn) => {
    // var chordType = getScaleChordType(sn, 3);
    // if (chordType) {
    //   this.ScaleChords.push(new ScaleChord(sn, chordType));
    // }
    sn.ScaleChords = getAllScaleChords(sn);
    this.ScaleChords = this.ScaleChords.concat(sn.ScaleChords);

    var chordType = getScaleChordType(sn, 4);
    if (chordType) {
      this.ScaleSeventhChords.push(new ScaleChord(sn, chordType));
    }
  });

  this.GetEnharmonicScales = function () {
    var scaleRelationshipIndex = MusicDefs.ScaleRelationships.indexOf(this.ScaleType.Name);

    var enharmonicScales = [];

    for (var i = 0; i < MusicDefs.ScaleRelationships.length; i++) {
      if (i != scaleRelationshipIndex) {
        var offset = i - scaleRelationshipIndex;
        var startingNoteIndex = Util.GetIndexOffset(7, 0, offset);
        var sc = this.NoteLetters[startingNoteIndex] + " " + MusicDefs.ScaleRelationships[i];
        enharmonicScales.push(sc);
      }
    }

    return enharmonicScales;
  };
}
