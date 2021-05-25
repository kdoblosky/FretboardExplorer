import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';
import {FretAttribute} from './FretAttribute.js';

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

	this.FretAttributes = new Array();

	this.HasFretAttribute = function (fretAttribute){
		return this.FretAttributes.includes(fretAttribute);
	}

	this.id = 'string-' + stringNumber + '-fret-' + fretNumber;
};