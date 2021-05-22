/**
 * Returns the index of an array based on an offset. Assumes 0-based index for array. 
 * Wraps around, so for example length 3, index 2, offset 2 would return 1.
 * @param  {int} length - The number of elements in the array
 * @param  {int} index - The starting index
 * @param  {int} offset - How many items to offset. Can be negative.
 * @returns {int} The index offset.
 */
export function GetIndexOffset(length, index, offset){
	// Assumes 0-based index for array
	var newIndex = (index + offset) % length
	
	if (newIndex < 0) {
		newIndex = length + newIndex;
	}
	return newIndex;
};
	
/**
 * Returns an item from an array based on the provided item, and offset. Wraps around,
 * so with an arr ['A', 'B', 'C', 'D', 'E'], item 'B', offset -3, would return 'D'
 * @param  {Array} arr - The array to get offset item from.
 * @param  {Object} item - An element of the array.
 * @param  {int} offset - How many items to offset. Can be negative.
 * @returns {Object} An element of the input array.
 */
export function GetArrayOffset(arr, item, offset){
	var index = arr.indexOf(item);
	var newIndex = this.GetIndexOffset(arr.length, index, offset);
	return arr[newIndex];
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
