/** @module FretboardExplorer/Fret */

/**
 * Create a new Fret object. A Fret represents a string on a particular fret.
 * @constructor
 * @param {Note} note Note of the Fret
 * @param {int} stringNumber Number of the string
 * @param {int} fretNumber Number of the fret
 */
export function Fret(note, stringNumber, fretNumber) {
  /** The {@link module:FretboardExplorer/Note.Note|Note} for this fret.  */
  this.Note = note;

  /** String number for this Fret */
  this.StringNumber = stringNumber;

  /** Fret number for this fret */
  this.FretNumber = fretNumber;

  /**
   * Note name to display for the fret.
   * @param {boolean} useAltName Whether we should use the AltName for the Note
   * @returns {string} Display name of the Note in the fret
   */
  this.NoteName = function (useAltName) {
    return useAltName ? this.Note.AltName : this.Note.Name;
  };

  /**
   * Get the position within the scale of the note in this fret;
   *
   * @param {Scale} scale {@link module:FretboardExplorer/Scale.Sclae|Scale} for this fret.
   * @returns {int} The position within the scale of the Note in this fret.
   */
  this.ScalePosition = function (scale) {
    var position;
    if (scale.NoteLetters.includes(this.Note.Name)) {
      position = scale.NoteLetters.indexOf(this.Note.Name) + 1;
    }
    return position;
  };

  /** Array of {@link module:FretboardExplorer/FretAttribute|FretAttributes} */
  this.FretAttributes = new Array();

  /**
   * Does this Fret have the specified FretAttribute?
   * @param {FretAttribute} fretAttribute
   * @returns {boolean}
   */
  this.HasFretAttribute = function (fretAttribute) {
    return this.FretAttributes.includes(fretAttribute);
  };

  /** Id of the fret */
  this.id = "string-" + stringNumber + "-fret-" + fretNumber;
}
