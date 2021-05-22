export function GetIndexOffset(length, index, offset){
	// Assumes 0-based index for array
	var newIndex = (index + offset) % length
	
	if (newIndex < 0) {
		newIndex = length + newIndex;
	}
	return newIndex;
};
	
export function GetArrayOffset(arr, item, offset){
	var index = arr.indexOf(item);
	var newIndex = this.GetIndexOffset(arr.length, index, offset);
	return arr[newIndex];
};
export function IterateObject(obj){
	var arr = new Array();
	Object.keys(obj).forEach(o => {
		arr.push(obj[o]);
	});
	return arr;
};
export function PopulateDropdown(dropdownID, source, valueProperty, textProperty) {
	var element = document.getElementById(dropdownID);
	
	source.forEach(n => {
		var opt = document.createElement("option");
		opt.value = valueProperty == null ? n : n[valueProperty];
		opt.text = textProperty == null ? n : n[textProperty];
		element.add(opt, null);
	});
};
export var FretMarkerClasses = {
	fret: 'fret',
	open: 'open',
	fret3: 'fret-3',
	fret5: 'fret-5',
	fret7: 'fret-7',
	fret12: 'fret-12'
};
export var ChordHighlightClasses = {
	chordNote: 'chord-note',
	chordRoot: 'chord-root',
	chordThird: 'chord-third',
	chordFifth: 'chord-fifth'
};
export var HighlightClasses = {
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
};
