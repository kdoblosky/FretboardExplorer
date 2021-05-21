var Util = {
	GetIndexOffset: function(length, index, offset){
		// Assumes 0-based index for array
		var newIndex = (index + offset) % length
		
		if (newIndex < 0) {
			newIndex = length + newIndex;
		}
		return newIndex;
	},
	
	GetArrayOffset: function(arr, item, offset){
		var index = arr.indexOf(item);
		var newIndex = this.GetIndexOffset(arr.length, index, offset);
		return arr[newIndex];
	},
	IterateObject: function(obj){
		var arr = new Array();
		Object.keys(obj).forEach(o => {
			arr.push(obj[o]);
		});
		return arr;
	},
	FretMarkerClasses: {
		fret: 'fret',
		open: 'open',
		fret3: 'fret-3',
		fret5: 'fret-5',
		fret7: 'fret-7',
		fret12: 'fret-12'
	},
	ChordHighlightClasses: {
		chordNote: 'chord-note',
		chordRoot: 'chord-root',
		chordThird: 'chord-third',
		chordFifth: 'chord-fifth'
	},
	HighlightClasses: {
		scale: 'scale',
		scaleRoot: 'scale-root',
		scaleSecond: 'scale-second',
		scaleThird: 'scale-third',
		scaleFourth: 'scale-fourth',
		scaleFifth: 'scale-fifth',
		scaleSixth: 'scale-sixth',
		scaleSeventh: 'scale-seventh',
		nonScale: 'non-scale',
		nonScaleHide: 'non-scale-hide',
	}
}

var MusicDefs = {
	NoteLetters: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
	AllNotes: ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
	Intervals: {
		HalfStep: 1,
		WholeStep: 2,
		MinorThird: 3,
		MajorThird: 4,
		PerfectFourth: 5,
		DiminishedFifth: 6,
		PerfectFifth: 7,
		MinorSixth: 8,
		MajorSixth: 9,
		MinorSeventh: 10,
		MajorSeventh: 11
	},
	Tunings: {
		Standard: {
			Key: 'Standard',
			Name: 'Standard Tuning',
			Strings: ['E', 'A', 'D', 'G', 'B', 'E']
		},
		OpenDMinor: {
			Key: 'OpenDMinor',
			Name: 'Open D Minor',
			Strings: ['D', 'A', 'D', 'F', 'A', 'D']
		},
		OpenD: {
			Key: 'OpenD',
			Name: 'Open D',
			Strings: ['D', 'A', 'D', 'F#', 'A', 'D']
		},
		DADGAD: {
			Key: 'DADGAD',
			Name: 'DADGAD',
			Strings: ['D', 'A', 'D', 'G', 'A', 'D']
		},
		OpenG: {
			Key: 'OpenG',
			Name: 'Open G',
			Strings: ['D', 'G', 'D', 'G', 'B', 'D']
		},
		OpenA: {
			Key: 'OpenA',
			Name: 'Open A',
			Strings: ['E', 'A', 'C#', 'E', 'A', 'E']
		},
		OpenC: {
			Key: 'OpenC',
			Name: 'Open C',
			Strings: ['C', 'G', 'C', 'G', 'C', 'E']
		},
		OpenE: {
			Key: 'OpenE',
			Name: 'Open E',
			Strings: ['E', 'B', 'E', 'G#', 'B', 'E']
		},
		MandolinStandard: {
			Key: 'MandolinStandard',
			Name: 'Mandolin - Standard',
			Strings: ['G', 'D', 'A', 'E']
		},
		BanjoStandard: {
			Key: 'BanjoStandard',
			Name: 'Banjo - Standard',
			Strings: [{Note: 'G', Start: 6}, 'D', 'G', 'B', 'D']
		},
		BanjoGMinor: {
			Key: 'BanjoGMinor',
			Name: 'Banjo - GMinor',
			Strings: [{Note: 'G', Start: 6}, 'D', 'G', 'Bb', 'D']
		}
	},
	NashvilleNumbers: [
		{Position: 1, Major: "I", Minor: 'i'},
		{Position: 2, Major: "II", Minor: 'ii'},
		{Position: 3, Major: "III", Minor: 'iii'},
		{Position: 4, Major: "IV", Minor: 'iv'},
		{Position: 5, Major: "V", Minor: 'v'},
		{Position: 6, Major: "VI", Minor: 'vi'},
		{Position: 7, Major: "VII", Minor: 'vii'}
	],
	_init: function(){
		this.ScaleTypes = {
			Major: {
				Key: 'Major',
				Name: 'Major',
				Intervals: [this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.WholeStep]
			},
			Minor: {
				Key: 'Minor',
				Name: 'Minor',
				Intervals: [this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep]
			},
			Dorian: {
				Key: 'Dorian',
				Name: 'Dorian',
				Intervals: [this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep]
			},
			Phrygian: {
				Key: 'Phrygian',
				Name: 'Phrygian',
				Intervals: [this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep]
			},
			Lydian: {
				Key: 'Lydian',
				Name: 'Lydian',
				Intervals: [this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep]
			},
			Mixolydian: {
				Key: 'Mixolydian',
				Name: 'Mixolydian',
				Intervals: [this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep]
			},
			Aolian: {
				Key: 'Aolian',
				Name: 'Aolian',
				Intervals: [this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep]
			},
			Locrian: {
				Key: 'Locrian',
				Name: 'Locrian',
				Intervals: [this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep, this.Intervals.HalfStep, this.Intervals.WholeStep, this.Intervals.WholeStep]
			}
		};
		
		this.ChordTypes = {
			Major: {
				Name: 'Major',
				NumberOfNotes: 3,
				Display: '',
				Intervals: [this.Intervals.MajorThird, this.Intervals.PerfectFifth]
			},
			Minor: {
				Name: 'Minor',
				NumberOfNotes: 3,
				Display: 'min',
				Intervals: [this.Intervals.MinorThird, this.Intervals.PerfectFifth]
			},
			Diminished: {
				Name: 'Diminished',
				NumberOfNotes: 3,
				Display: 'dim',
				Intervals: [this.Intervals.MinorThird, this.Intervals.DiminishedFifth]
			},
			Seventh: {
				Name: 'Seventh',
				NumberOfNotes: 4,
				Display: '7',
				Intervals: [this.Intervals.MajorThird, this.Intervals.PerfectFifth, this.Intervals.MinorSeventh]
			},
			MinorSeventh: {
				Name: 'MinorSeventh',
				NumberOfNotes: 4,
				Display: 'm7',
				Intervals: [this.Intervals.MinorThird, this.Intervals.PerfectFifth, this.Intervals.MinorSeventh]
			},
			MajorSeventh: {
				Name: 'MajorSeventh',
				NumberOfNotes: 4,
				Display: 'Maj7',
				Intervals: [this.Intervals.MajorThird, this.Intervals.PerfectFifth, this.Intervals.MajorSeventh]
			}
		};
			
	
		
		return this;
	}
}._init();

function Note(name){
	console.log('name: ' + name)
	this.Name = name;
	
    this.Index = MusicDefs.AllNotes.indexOf(name);

    var that = this;

    var getLetterOffset = function(offset) {
        return Util.GetArrayOffset(MusicDefs.NoteLetters, that.Name, offset);
    }

    var getNoteOffset = function(offset) {
        return Util.GetArrayOffset(MusicDefs.AllNotes, that.Name, offset);
    }

    var GetAltName = function(){
		if (that.Name === 'None'){
			return that.Name;
		} else if(that.Name.includes('#')){
            return getNoteOffset(1) + 'b';
        // } else if (that.Name == 'C')  {
        //         return 'B#';
        // } else if (that.Name == 'B') {
        //     return 'Cb';
        // } else if (that.Name == 'E') { 
        //     return 'Fb';
        // } else if (that.Name == 'F') {
        //     return 'E#';
        } else {
            return that.Name;
        }
    };

    this.AltName = GetAltName();

    this.NextNote = function(){
		if(this.name === 'None') {
			return new Note('None');
		} else {
        	var offset = getNoteOffset(1);
			return new Note(offset);
		}
    };

    this.PrevNote = function(){
		if(this.name === 'None') {
			return new Note('None');
		} else {
        	var offset = getNoteOffset(-1);
			return new Note(getNoteOffset(-1))    
		}
    };

    var GetDisplayName = function(){
        if (that.Name === that.AltName) {
			if (that.Name === 'None') {
				return '';
			} else {
				return that.Name;
			}
        } else {
            return that.Name + ' / ' + that.AltName
        }
    }
	
	this.DisplayName = GetDisplayName();

    var GetHTMLClass = function(){
        var classname = that.DisplayName;
        return classname.replace('#', 'Sharp').replace(' / ', '-');
    }
	
	this.GetInterval = function(note){
		var interval;
		var rootIndex = MusicDefs.AllNotes.indexOf(this.Name);
		var noteIndex = MusicDefs.AllNotes.indexOf(note.Name);
		
		if(noteIndex < rootIndex) {
			noteIndex = MusicDefs.AllNotes.length + noteIndex;
		}
		
		var distance = noteIndex - rootIndex;
		
		interval = Util.IterateObject(MusicDefs.Intervals).find(i => i == distance);
		// Object.keys(MusicDefs.Intervals).forEach(i => {
		// 	if (MusicDefs.Intervals[i] === distance) {
		// 		interval = MusicDefs.Intervals[i];
		// 	}
		// });
		
		return interval;
	}
	
	this.HTMLClass = GetHTMLClass();
	console.log('this.Name: ' + this.Name);
};

function Chord(rootNote, chordType){
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

function Scale(root, scaleType) {
	that = this;
	this.NoteLetters = new Array();
	this.ScaleType = scaleType;
	this.Root = root;
	this.ScaleNotes = new Array();
	this.ScaleChords = new Array();
	
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
			var number = (this.Chord.ChordType === MusicDefs.ChordTypes.Minor || this.Chord.ChordType === MusicDefs.ChordTypes.Diminished) ? this.NashvilleNumber.Minor : this.NashvilleNumber.Major;
			return number + ' - ' + this.Chord.Display
		}

		this.Display = this.DisplayName();

		this.GetID = function(){
			return (this.Chord.Root.HTMLClass + '-' + this.Chord.ChordType.Name).toLocaleLowerCase().replace(/ /g, '-');
		}

		this.ID = this.GetID();
	};

	this.NoteLetters.push(root);
	var currentNote = root;
    
	scaleType.Intervals.forEach(interval =>{
		nextNote = Util.GetArrayOffset(MusicDefs.AllNotes, currentNote, interval);
		this.NoteLetters.push(nextNote);
		currentNote = nextNote;
	});
	
	this.NoteLetters.forEach(letter => {
		this.ScaleNotes.push(new ScaleNote(letter, scaleType, this.NoteLetters));
	});
	
	var getScaleNoteClasses = function() {
		return that.ScaleNotes.map(n => n.Note.HTMLClass);
	};
	
	this.ScaleNoteClasses = getScaleNoteClasses();
	
	this.ScaleNotes.forEach(sn => {
		var intervals = [];
		intervals.push(sn.Note.GetInterval(new Note(sn.Third)));
		intervals.push(sn.Note.GetInterval(new Note(sn.Fifth)));
		thisChordIntervals = JSON.stringify(intervals);
		chordType = null;
		
		chordType = Util.IterateObject(MusicDefs.ChordTypes).find(ct => ct.NumberOfNotes === 3 &&
				JSON.stringify(ct.Intervals) === thisChordIntervals);

		if (chordType !== null && chordType !== undefined) {
			this.ScaleChords.push(new ScaleChord(sn, chordType));
		};
	});
}

var Fret = function(note, stringNumber, fretNumber){
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

var FretboardString = function(rootNote, numFrets, stringNumber, startNumber){
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
var Fretboard = {
	FretboardMap: new Array(),
	Scale: null,
	Tuning: {},
	HTMLManager: {},
	FretsPerString: 12,

	ResetFrets: function(){
		var frets = this.GetAllFrets();
		frets.forEach(f => {
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
		
		frets.filter(f => this.Scale.NoteLetters.includes(f.Note.Name)).forEach(f => f.ScaleNote = false);
		frets.filter(f => f.Note.Name === Fretboard.Scale.Root).forEach(f => f.ScaleRootNote = true);
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
		for(i=0; i<this.Tuning.Strings.length; i++){
			//Strings: [{Note: 'G'; Start: 5}, 'D', 'G', 'B', 'D']
			if(this.Tuning.Strings[i].hasOwnProperty('Note') && this.Tuning.Strings[i].hasOwnProperty('Start')) {
				console.log('beep');
				this.FretboardMap.push(new FretboardString(this.Tuning.Strings[i].Note, this.FretsPerString, i, this.Tuning.Strings[i].Start));
			} else {
				console.log('boop');
				this.FretboardMap.push(new FretboardString(this.Tuning.Strings[i], this.FretsPerString, i));
			}
		};
		
		if(this.Scale !== null) {
			this.SetScale(this.Scale);
		};
	},

	
}

var FretHTMLManager = {
	FretboardTable: document.getElementById('fretboard-table'),
	HighlightingClasses: ['scale', 'scaleroot', 'non-scale', 'non-scale-hide', 'chordroot', 'chordthird', 'chordfifth'],
	_tuningSelectID: 'tuning-select',
	_scaleSelectID: 'scale-select',
	_scaleTypeSelectID: 'scale-type-select',
	HTMLUtils: {
		GetFrets: function() {
			return document.getElementsByClassName('fret');
		},
		RemoveHTMLClassFromFrets: function(className) {
			for (f of this.GetFrets()) {
				f.classList.remove(className);
			}
		}, 
		AddHTMLClassToFrets: function (classToFind, classToAdd) {
			for (c of document.getElementsByClassName(classToFind)){
				c.classList.add(classToAdd)
			};
		},
		GetSelectValue: function(id) {
			var element = document.getElementById(id);
			return element.options[element.selectedIndex].value;
		},
		GetHideNonScaleNotesValue: function() {
			return document.getElementById('hide-non-scale-notes').checked;
		}
    },
    RemoveAllHighlightingClasses: function() {
		Util.IterateObject(Util.HighlightClasses).forEach(c => this.HTMLUtils.RemoveHTMLClassFromFrets(c));
		//Object.keys(Util.HighlightClasses).forEach(c => this.HTMLUtils.RemoveHTMLClassFromFrets(c));
		//this.HighlightingClasses.forEach(c => this.HTMLUtils.RemoveHTMLClassFromFrets(c));
	},
	RemoveChordHighlights: function() {
		Util.IterateObject(Util.ChordHighlightClasses).forEach(c => this.HTMLUtils.RemoveHTMLClassFromFrets(c));
	},
	RemoveAllHighlights:function() {
		this.RemoveAllHighlightingClasses();
		this.RemoveChordHighlights();
	},
	AddHighlightingClassToIDs(ids, highlightingClass){
		if(ids !== null && ids.length > 0){
			ids.forEach(i => document.getElementById(i).classList.add(highlightingClass));
		}
	},
	RedrawFretboard: function() {
		
		var fretboardHTMLTable = "<table>"
		fretboardHTMLTable += "<tr class='fretboard-header-row'><th class='string-root'>String</th>"
		for(i=0; i<=Fretboard.FretsPerString; i++) {
			fretboardHTMLTable += "<th scope='col' class='fret-header'>" + i + "</th>";
		}
		fretboardHTMLTable += "</tr>";
		
		Fretboard.FretboardMap.reverse().forEach(fs => {
			//console.log(fs);
			fretboardHTMLTable += "<tr class='string' id='" + fs.id + "'><td class='string-root'>" + fs.RootNote + "</td>";
			
			fs.Frets.forEach(fret => {
				fretboardHTMLTable += "<td class='fret " + fret.Note.HTMLClass + "' id='" + fret.id + "'>" + fret.Note.DisplayName + "</td>";
			});
			fretboardHTMLTable += "</tr>";
		} );
		fretboardHTMLTable += "</table>";

		if(this.FretboardTable === null) {
			this.FretboardTable = document.getElementById('fretboard-table');
		};
		this.FretboardTable.innerHTML = fretboardHTMLTable; 
	},
	RedrawChordList: function() {
		var chordlistHTML = "<div id='scale-chords'>"
		Fretboard.Scale.ScaleChords.forEach(sc => {
			chordlistHTML += "<span class='scale-chord ' id='" + sc.ID + "' onclick='FretboardController.HighlightChord(this.id)'>" + sc.Display + "</span>";
		});
		chordlistHTML += "</div>"
		document.getElementById('scale-chord-list').innerHTML = chordlistHTML;
	},
	PopulateTunings: function() {
		var element = document.getElementById(this._tuningSelectID);
	
		Object.keys(MusicDefs.Tunings).forEach(t => {
			var tuning = MusicDefs.Tunings[t];
			var opt = document.createElement("option");
			opt.value = tuning.Key;
			opt.text = tuning.Name;
			element.add(opt, null);
		});
	},
	PopulateScales: function() {
		var element = document.getElementById(this._scaleSelectID);
		MusicDefs.AllNotes.forEach(n => {
			var opt = document.createElement("option");
			opt.value = n;
			opt.text = n;
			element.add(opt, null);
		});
	},
	PopulateScaleTypes: function() {
		var element = document.getElementById(this._scaleTypeSelectID);
		
		Object.keys(MusicDefs.ScaleTypes).forEach(t => {
			var scaleType = MusicDefs.ScaleTypes[t];
			var opt = document.createElement("option");
			opt.value = scaleType.Key;
			opt.text = scaleType.Name;
			element.add(opt, null);
		});
	},
	Init: function(){
		this.PopulateTunings();
		this.PopulateScales();
		this.PopulateScaleTypes();
	}
}

var FretboardController = {
	fretboard: Fretboard,
	HTMLManager: FretHTMLManager,
	
	HideNonScaleNotes: false,
	
	SetHideNonScaleNotes: function(){
		this.HideNonScaleNotes = this.HTMLManager.HTMLUtils.GetHideNonScaleNotesValue();
		this.ReDraw();
	},
	
	SetTuning: function(tuning){
		this.fretboard.SetTuning(tuning);
		this.HTMLManager.RedrawFretboard();
		if (this.fretboard.Scale !== undefined && this.fretboard.Scale !== null){
			this.ReDraw();
		}
	},
	SetTuningFromForm: function() {
		var tuningName = this.HTMLManager.HTMLUtils.GetSelectValue(this.HTMLManager._tuningSelectID);
		this.SetTuningByName(tuningName);
	},
	SetTuningByName: function(tuningName) {
		this.SetTuning(MusicDefs.Tunings[tuningName]);
	},
	SetScaleFromForm: function() {
		var scaleName = this.HTMLManager.HTMLUtils.GetSelectValue(this.HTMLManager._scaleSelectID);
		var scaleTypeName = this.HTMLManager.HTMLUtils.GetSelectValue(this.HTMLManager._scaleTypeSelectID);
		
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
			this.HTMLManager.AddHighlightingClassToIDs(scaleFretIDs, Util.HighlightClasses.scale);
			
			var nonScaleFretIDs = this.fretboard.GetNonScaleFrets().map(f => f.id);
			this.HTMLManager.AddHighlightingClassToIDs(nonScaleFretIDs, Util.HighlightClasses.nonScale);
			if (this.HideNonScaleNotes) {
				this.HTMLManager.AddHighlightingClassToIDs(nonScaleFretIDs, Util.HighlightClasses.nonScaleHide);
			}

			var scaleRootNoteIDs = this.fretboard.GetScaleRootFrets().map(f => f.id);
			this.HTMLManager.AddHighlightingClassToIDs(scaleRootNoteIDs, Util.HighlightClasses.scaleRoot);
		}
	},
	HighlightChord: function(id){
		function _AddChordHight(chordNoteFrets, chord, position, chordClass){
			var ids = chordNoteFrets.filter(f => f.Note.Name === chord.Chord.Notes[position].Name).map(f => f.id);
			FretHTMLManager.AddHighlightingClassToIDs(ids, chordClass);
		};

		this.HTMLManager.RemoveChordHighlights();
		var chord = this.fretboard.Scale.ScaleChords.find(sc => sc.ID === id);
		console.log(chord);
		var chordNoteNames = chord.Chord.Notes.map(n => n.Name);
		var chordNoteFrets = this.fretboard.GetAllFrets().filter(f => chordNoteNames.includes(f.Note.Name));
		//this.HTMLManager.AddHighlightingClassToIDs(chordNoteFrets.map(f => f.id), Util.ChordHighlightClasses.chordNote);

		_AddChordHight(chordNoteFrets, chord, 0, Util.ChordHighlightClasses.chordRoot);
		_AddChordHight(chordNoteFrets, chord, 1, Util.ChordHighlightClasses.chordThird);
		_AddChordHight(chordNoteFrets, chord, 2, Util.ChordHighlightClasses.chordFifth);
	},
	ReDraw: function(){
		this.HTMLManager.RemoveChordHighlights();
		this.HTMLManager.RemoveAllHighlightingClasses();
		this.SetHighlights();
		this.HTMLManager.RedrawChordList();
	},
	Init: function(){
		this.HTMLManager.Init();
	}
};

window.onload = function() {
	FretboardController.Init();
	FretboardController.SetTuningFromForm();
	FretboardController.SetScaleFromForm();
};