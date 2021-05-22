import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';
import {Note} from './Note.js';
import {Fret} from './Fret.js';

export function FretboardString(rootNote, numFrets, stringNumber, startNumber){
	if (startNumber === undefined) {
		console.log('yep');
		var startNumber = 0;
	};
	this.RootNote = rootNote;
	var root = new Note(rootNote);
	this.StringNumber = stringNumber;
	this.id = 'string-' + stringNumber;

	this.Frets = new Array();
	this.Frets.push(new Fret(root, stringNumber, 0));

	var n = this.Frets[0].Note;
	var next = null;
	//console.log(numFrets);
	for (var i=1; i<=numFrets; i++) {
		if (i < startNumber){
			//console.log('beep');
			this.Frets.push(new Fret(new Note('None'), stringNumber, i));
		} else if (i === startNumber) {
			next = root.NextNote();
			this.Frets.push(new Fret(next, stringNumber, i));
		}
		else {
			//console.log('boop');
			next = n.NextNote() ;
			this.Frets.push(new Fret(next, stringNumber, i));
		};
		console.log(this.Frets);
		n = next;
	};
};