import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';
import * as Note from './Note.js';
import * as Chord from './Chord.js';
import * as Scale from './Scale.js';
import * as Fret from './Fret.js';
import {FretboardString} from './FretboardString.js';
import { FretAttribute } from './FretAttribute.js';
// import {FretHTMLManager} from './FretHTMLManager.js';
//import {FretboardController} from './FretboardController.js';

export var Fretboard = {
	FretboardMap: new Array(),
	Scale: null,
	Tuning: {},
	HTMLManager: {},
	FretsPerString: 12,

	ResetFrets: function(){
		var frets = this.GetAllFrets();
		frets.forEach(f => {
			f.FretAttributes.length = 0;
			f.ScaleNote = false;
			f.ScaleRootNote = false;
			f.ChordNote = false;
		});
	},
		
	SetScale: function(scale){
        //console.log('scale:');
        //console.log(scale);
		this.Scale = scale;

		this.ResetFrets();
		var frets = this.GetAllFrets();
		
		frets.filter(f => this.Scale.NoteLetters.includes(f.Note.Name)).forEach(f => {
				f.ScaleNote = false;
				f.FretAttributes.push(FretAttribute.ScaleNote);
		});

		var scaleAttributePositions = [
			FretAttribute.ScaleRoot,
			FretAttribute.ScaleSecond,
			FretAttribute.ScaleThird,
			FretAttribute.ScaleFourth,
			FretAttribute.ScaleFifth,
			FretAttribute.ScaleSixth,
			FretAttribute.ScaleSeventh
		];

		for(var i=0; i<scaleAttributePositions.length; i++){
			frets.filter(f => f.Note.Name == Fretboard.Scale.NoteLetters[i]).forEach(f => {
				if(i===0){
					f.ScaleRoot = true;
				}
				f.FretAttributes.push(scaleAttributePositions[i]);
			});
		};

		// frets.filter(f => f.Note.Name === Fretboard.Scale.Root).forEach(f => {
		// 		f.ScaleRootNote = true;
		// 		f.FretAttributes.push(FretAttribute.ScaleRoot);
		// });
		
	},

	GetAllFrets: function(){
		var all = [];
		this.FretboardMap.forEach(f => {all = all.concat(f.Frets)});
		return all;
	},

	GetScaleFrets: function(){
		return this.GetAllFrets().filter(f => this.Scale.NoteLetters.includes(f.Note.Name));
	},

	GetNonScaleFrets: function(){
		return this.GetAllFrets().filter(f => this.Scale.NoteLetters.includes(f.Note.Name) === false);
	},

	GetScaleRootFrets: function(){
		return this.GetAllFrets().filter(f => this.Scale.Root === f.Note.Name);
	},

	SetTuning: function(tuning){
		this.Tuning = tuning;
		this.FretboardMap = [];
		for(var i=0; i<this.Tuning.Strings.length; i++){
			//Strings: [{Note: 'G'; Start: 5}, 'D', 'G', 'B', 'D']
			// This is to accomodate instruments like the 5-string banjo,
			// where the 5th string doesn't start until the 6th fret.
			if(this.Tuning.Strings[i].hasOwnProperty('Note') && this.Tuning.Strings[i].hasOwnProperty('Start')) {
				this.FretboardMap.push(new FretboardString(this.Tuning.Strings[i].Note, this.FretsPerString, i, this.Tuning.Strings[i].Start));
			} else {
				this.FretboardMap.push(new FretboardString(this.Tuning.Strings[i], this.FretsPerString, i));
			}
		};
		
		if(this.Scale !== null) {
			this.SetScale(this.Scale);
		};
	},

	
}