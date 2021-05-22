import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';
import {Fretboard} from './fretboard.js';

export var FretHTMLManager = {
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
			for (var f of this.GetFrets()) {
				f.classList.remove(className);
			}
		}, 
		AddHTMLClassToFrets: function (classToFind, classToAdd) {
			for (var c of document.getElementsByClassName(classToFind)){
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
		for(var i=0; i<=Fretboard.FretsPerString; i++) {
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
		var tunings = Object.keys(MusicDefs.Tunings).map(t => MusicDefs.Tunings[t]);
		Util.PopulateDropdown(this._tuningSelectID, tunings, 'Key', 'Name')
	}, 
	PopulateScales: function() {
		Util.PopulateDropdown(this._scaleSelectID, MusicDefs.AllNotes);
	},
	PopulateScaleTypes: function() {
		var scaleTypes = Object.keys(MusicDefs.ScaleTypes).map(t => MusicDefs.ScaleTypes[t]);
		Util.PopulateDropdown(this._scaleTypeSelectID, scaleTypes, 'Key', 'Name');
	},
	Init: function(){
		this.PopulateTunings();
		this.PopulateScales();
		this.PopulateScaleTypes();
	}
}