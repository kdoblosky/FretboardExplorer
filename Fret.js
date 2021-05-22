import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';

export function Fret(note, stringNumber, fretNumber){
	//console.log(note);
	this.Note = note;

	this.StringNumber = stringNumber;
	this.FretNumber = fretNumber;

	this.HasNote = note !== null;
	this.ScaleNote = false;
	this.ScaleRootNote = false;
	this.ChordNote = false;
	this.Classes = null;
	this.id = 'string-' + stringNumber + '-fret-' + fretNumber;
};