import * as Util from './Util.js';
import * as MusicDefs from './MusicDefs.js';
import {Note} from './Note.js';
import * as Chord from './Chord.js';
import * as Scale from './Scale.js';
import {Fret} from './Fret.js';
import * as FretboardString from './FretboardString.js';
import {FretHTMLManager} from './FretHTMLManager.js';
import {Fretboard} from './fretboard.js';
import {FretboardController} from './FretboardController.js';

window.onload = function() {
	FretboardController.Init();
	FretboardController.SetTuningFromForm();
	FretboardController.SetScaleFromForm();
	window.FretboardController = FretboardController;
};