import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';
import {Note} from './Note.js';
import {Chord} from './Chord.js';

export function Scale(root, scaleType) {
	var that = this;
	this.NoteLetters = new Array();
	this.ScaleType = scaleType;
	this.Root = root;
	this.ScaleNotes = new Array();
	this.ScaleChords = new Array();
	this.Name = root + ' ' + scaleType.Name;
	
	function ScaleNote(note, scaleType, scaleLetters){
		this.Note = new Note(note);
		this.ScaleType = scaleType;
		this.Position = scaleLetters.indexOf(note) + 1;
		this.NextNote = Util.GetArrayOffset(scaleLetters, note, 1);
		this.PrevNote = Util.GetArrayOffset(scaleLetters, note, -1);
		this.Third = Util.GetArrayOffset(scaleLetters, note, 2);
		this.Fifth = Util.GetArrayOffset(scaleLetters, note, 4);
	};
	
	function ScaleChord(scaleNote, chordType) {
		this.Chord = new Chord(scaleNote.Note, chordType);
		this.Position = scaleNote.Position;
		this.NashvilleNumber = MusicDefs.NashvilleNumbers.find(f => f.Position === scaleNote.Position);
		this.ScaleRootNote = scaleNote;

		this.DisplayName = function(){
			var number = (['Minor', 'Diminished'].includes(this.Chord.ChordType.Name)) ? this.NashvilleNumber.Minor : this.NashvilleNumber.Major;
			return number + ' - ' + this.Chord.Display
		}

		this.Display = this.DisplayName();

		this.GetID = function(){
			return (this.Chord.Root.Name + '-' + this.Chord.ChordType.Name).toLocaleLowerCase().replace(/ /g, '-');
		}

		this.ID = this.GetID();
	};

	this.NoteLetters.push(root);
	var currentNote = root;
    
	scaleType.Intervals.forEach(interval =>{
		var nextNote = Util.GetArrayOffset(MusicDefs.AllNotes, currentNote, interval);
		this.NoteLetters.push(nextNote);
		currentNote = nextNote;
	});
	
	this.NoteLetters.forEach(letter => {
		this.ScaleNotes.push(new ScaleNote(letter, scaleType, this.NoteLetters));
	});
	
	this.ScaleNotes.forEach(sn => {
		var intervals = [];
		intervals.push(sn.Note.GetInterval(new Note(sn.Third)));
		intervals.push(sn.Note.GetInterval(new Note(sn.Fifth)));
		this.ChordIntervals = JSON.stringify(intervals);
		var chordType = null;
		
		chordType = MusicDefs.ChordTypes.find(ct => ct.NumberOfNotes === 3 &&
				JSON.stringify(ct.Intervals) === this.ChordIntervals);

		if (chordType !== null && chordType !== undefined) {
			this.ScaleChords.push(new ScaleChord(sn, chordType));
		};
	});
}