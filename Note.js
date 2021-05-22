import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';

export function Note (name){
	//console.log('name: ' + name)
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
	//console.log('this.Name: ' + this.Name);
};