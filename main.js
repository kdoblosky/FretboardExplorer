// import * as Util from './Util.js';
// import * as MusicDefs from './MusicDefs.js';
// import {Note} from './Note.js';
// import * as Chord from './Chord.js';
// import * as Scale from './Scale.js';
// import {Fret} from './Fret.js';
// import * as FretboardString from './FretboardString.js';
import * as FretHTMLManager from "./FretHTMLManager.js";
// import {Fretboard} from './Fretboard.js';
import { FretboardController } from "./FretboardController.js";
import * as QueryStringUtils from "./QueryStringUtils.js";

window.onload = function () {
  window.FretboardController = FretboardController;
  window.FretHTMLManager = FretHTMLManager;
  FretboardController.Init();
  if (QueryStringUtils.tuning) {
    FretHTMLManager.HTMLUtils.SelectOptionFromDropdown(FretHTMLManager._tuningSelectID, QueryStringUtils.tuning);
  }

  if (QueryStringUtils.scale) {
    FretHTMLManager.HTMLUtils.SelectOptionFromDropdown(FretHTMLManager._scaleSelectID, QueryStringUtils.scale);
  }

  if (QueryStringUtils.scaleType) {
    FretHTMLManager.HTMLUtils.SelectOptionFromDropdown(FretHTMLManager._scaleTypeSelectID, QueryStringUtils.scaleType);
  }

  if (QueryStringUtils.capo) {
    FretHTMLManager.HTMLUtils.SelectOptionFromDropdown(FretHTMLManager._capoSelectID, QueryStringUtils.capo);
  }
  FretboardController.SetTuningFromForm();
  FretboardController.SetScaleFromForm();
  FretboardController.SetCapo();
};
