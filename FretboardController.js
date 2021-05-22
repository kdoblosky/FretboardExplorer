import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';
import {Note} from './Note.js';
import {Chord} from './Chord.js';
import {Scale} from './Scale.js';
import {Fret} from './Fret.js';
import {FretboardString} from './FretboardString.js';
import {FretHTMLManager} from './FretHTMLManager.js';
import {Fretboard} from './fretboard.js';

export var FretboardController = {
	fretboard: Fretboard,
	HTMLManager: FretHTMLManager,
	
	HideNonScaleNotes: false,
	
	SetHideNonScaleNotes: function(){
		this.HideNonScaleNotes = FretHTMLManager.HTMLUtils.GetHideNonScaleNotesValue();
		this.ReDraw();
	},
	
	SetTuning: function(tuning){
		//this.fretboard.SetTuning(tuning);
		Fretboard.SetTuning(tuning);
		FretHTMLManager.RedrawFretboard();
		if (this.fretboard.Scale !== undefined && this.fretboard.Scale !== null){
			this.ReDraw();
		}
	},
	SetTuningFromForm: function() {
		var tuningName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._tuningSelectID);
		this.SetTuningByName(tuningName);
	},
	SetTuningByName: function(tuningName) {
		this.SetTuning(MusicDefs.Tunings[tuningName]);
	},
	SetScaleFromForm: function() {
		var scaleName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._scaleSelectID);
		var scaleTypeName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._scaleTypeSelectID);
		
        var scaleType = MusicDefs.ScaleTypes[scaleTypeName];
		var scale = new Scale(scaleName, scaleType);
		this.SetScale(scale);
	},
	SetScale: function(scale){
		this.fretboard.SetScale(scale);
		this.ReDraw();
	},
	SetHighlights: function(){
		if(this.fretboard.Scale !== null){
			var scaleFretIDs = this.fretboard.GetScaleFrets().map(f => f.id);
			FretHTMLManager.AddHighlightingClassToIDs(scaleFretIDs, Util.HighlightClasses.scale);
			
			var nonScaleFretIDs = this.fretboard.GetNonScaleFrets().map(f => f.id);
			FretHTMLManager.AddHighlightingClassToIDs(nonScaleFretIDs, Util.HighlightClasses.nonScale);
			if (this.HideNonScaleNotes) {
				FretHTMLManager.AddHighlightingClassToIDs(nonScaleFretIDs, Util.HighlightClasses.nonScaleHide);
			}

			var scaleRootNoteIDs = this.fretboard.GetScaleRootFrets().map(f => f.id);
			FretHTMLManager.AddHighlightingClassToIDs(scaleRootNoteIDs, Util.HighlightClasses.scaleRoot);
		}
	},
	HighlightChord: function(id){
		function _AddChordHight(chordNoteFrets, chord, position, chordClass){
			var ids = chordNoteFrets.filter(f => f.Note.Name === chord.Chord.Notes[position].Name).map(f => f.id);
			FretHTMLManager.AddHighlightingClassToIDs(ids, chordClass);
		};

		FretHTMLManager.RemoveChordHighlights();
		var chord = this.fretboard.Scale.ScaleChords.find(sc => sc.ID === id);
		console.log(chord);
		var chordNoteNames = chord.Chord.Notes.map(n => n.Name);
		var chordNoteFrets = this.fretboard.GetAllFrets().filter(f => chordNoteNames.includes(f.Note.Name));
		//FretHTMLManager.AddHighlightingClassToIDs(chordNoteFrets.map(f => f.id), Util.ChordHighlightClasses.chordNote);

		_AddChordHight(chordNoteFrets, chord, 0, Util.ChordHighlightClasses.chordRoot);
		_AddChordHight(chordNoteFrets, chord, 1, Util.ChordHighlightClasses.chordThird);
		_AddChordHight(chordNoteFrets, chord, 2, Util.ChordHighlightClasses.chordFifth);
	},
	ReDraw: function(){
		FretHTMLManager.RemoveChordHighlights();
		FretHTMLManager.RemoveAllHighlightingClasses();
		this.SetHighlights();
		FretHTMLManager.RedrawChordList();
	},
	Init: function(){
		this.fretboard = Fretboard;
		FretHTMLManager.Init();
	}
};
