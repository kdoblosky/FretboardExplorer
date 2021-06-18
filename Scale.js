import * as Util from "./Util.js";
import * as MusicDefs from "./MusicDefs.js";
import { Note } from "./Note.js";
import { Chord } from "./Chord.js";

/** @module FretboardExplorer/Scale */

/**
 * Create a new Scale
 *
 * @constructor
 * @param {string} root Root note of the scale
 * @param {ScaleType} scaleType The {@link module:FretboardExplorer/MusicDefs.ScaleTypes|ScaleType} for this scale.
 */
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

  /**
   * Special case of a Note contained within a specific Scale.
   * @constructor
   * @param {string} note Note for this ScaleNote
   * @param {ScaleType} scaleType The {@link module:FretboardExplorer/MusicDefs.ScaleTypes|ScaleType} for this ScaleNote
   * @param {string[]} scaleLetters An array of all notes in the associated Scale
   */
  function ScaleNote(note, scaleType, scaleLetters) {
    /** The {@link module:FretboardExplorer/Note.Note|Note} for this ScaleNote */
    this.Note = new Note(note);

    /** The The {@link module:FretboardExplorer/MusicDefs.ScaleTypes|ScaleType} for this ScaleNote */
    this.ScaleType = scaleType;

    /** The position of this note within its Scale */
    this.Position = scaleLetters.indexOf(note) + 1;

    /** The next {@link module:FretboardExplorer/Note.Note|Note} within the Scale */
    this.NextNote = Util.GetArrayOffset(scaleLetters, note, 1);

    /** The previous {@link module:FretboardExplorer/Note.Note|Note} within the Scale */
    this.PrevNote = Util.GetArrayOffset(scaleLetters, note, -1);

    /** The {@link module:FretboardExplorer/Note.Note|Note} a third (either minor or major) above this note, within the Scale */
    this.Third = Util.GetArrayOffset(scaleLetters, note, 2);

    /** The {@link module:FretboardExplorer/Note.Note|Note} a fifth above this note, within the Scale */
    this.Fifth = Util.GetArrayOffset(scaleLetters, note, 4);

    /** The {@link module:FretboardExplorer/Note.Note|Note} a seventh above this note, within the Scale */
    this.Seventh = Util.GetArrayOffset(scaleLetters, note, 6);

    /** An array of {@link module:FretboardExplorer/Scale.Scale~ScaleChord|ScaleChords} or chords rooted in the current note, contained entirely within the scale. */
    this.ScaleChords = [];
  }

  /**
   * Special case of a Chord within a Scale
   * @constructor
   * @param {ScaleNote} scaleNote
   * @param {ChordType} chordType
   */
  function ScaleChord(scaleNote, chordType) {
    /** Chord */
    this.Chord = new Chord(scaleNote.Note, chordType);

    /** Position of the root note of this chord within the scale */
    this.Position = scaleNote.Position;

    /** Root note of this chord */
    this.ScaleRootNote = scaleNote;

    /**
     * Get DisplayName of this chord
     * @returns {string}
     */
    this.DisplayName = function () {
      return this.Chord.Display(that.UseAltNames);
    };

    /** Name to display for this chord */
    this.Display = this.DisplayName();

    /** ID of this chord */
    this.GetID = function () {
      return (this.Chord.Root.Name + "-" + this.Chord.ChordType.Name).toLocaleLowerCase().replace(/ /g, "-");
    };

    /** ID of this chord
     * @returns {string}
     */
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

  /**
   * Get all ScaleChords starting from the startingNote
   * @param {ScaleNote} startingNote
   * @returns {ScaleChord[]}
   */
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

  /**
   * Get the ChordType of a triad or 7th chord starting from the specified ScaleNote
   * @param {ScaleNote} startingNote
   * @param {int} numberOfNotes
   * @returns
   */
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
    sn.ScaleChords = getAllScaleChords(sn);
    this.ScaleChords = this.ScaleChords.concat(sn.ScaleChords);

    var chordType = getScaleChordType(sn, 4);
    if (chordType) {
      this.ScaleSeventhChords.push(new ScaleChord(sn, chordType));
    }
  });

  /**
   * Gets a list of enharmonic scales (scales with the same notes as the current scale, but a different root note)
   * @returns {string[]}
   */
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
