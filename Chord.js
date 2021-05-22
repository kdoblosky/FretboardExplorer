import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';
import {Note} from './Note.js';

export function Chord (rootNote, chordType){
	this.Name = rootNote.Name + chordType.Name;
	this.Root = rootNote;
	this.ChordType = chordType;
	this.Display = rootNote.Name + chordType.Display;
	this.Notes = [];

	this.Notes.push(rootNote);
	chordType.Intervals.forEach(i => {
		var newNoteName = Util.GetArrayOffset(MusicDefs.AllNotes, rootNote.Name, i);
		var newNote = new Note(newNoteName);
		this.Notes.push(newNote);
	});
}
