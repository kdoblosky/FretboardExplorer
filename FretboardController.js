import * as Util from "./Util.js";
import * as MusicDefs from "./MusicDefs.js";
import { Scale } from "./Scale.js";
import { FretHTMLManager } from "./FretHTMLManager.js";
import { Fretboard } from "./Fretboard.js";
import { FretAttribute } from "./FretAttribute.js";
import { CssUtils } from "./CssUtils.js";

export var FretboardController = {
  fretboard: Fretboard,
  HTMLManager: FretHTMLManager,

  ShowNonScaleNotes: false,
  HighlightScaleNotes: true,
  HighlightChordNotes: true,
  ShowScalePositions: false,

  SetHighlightScaleNotes: function () {
    this.HighlightScaleNotes = FretHTMLManager.HTMLUtils.GetHighlightScaleNotesValue();
    this.ReDraw();
  },

  SetHighlightChordNotes: function () {
    this.HighlightChordNotes = FretHTMLManager.HTMLUtils.GetHighlightChordNotesValue();
    this.ReDraw();
  },

  SetShowNonScaleNotes: function () {
    this.ShowNonScaleNotes = FretHTMLManager.HTMLUtils.GetShowNonScaleNotesValue();
    this.ReDraw();
  },

  SetShowScalePositions: function () {
    this.ShowScalePositions = FretHTMLManager.HTMLUtils.GetShowScalePositionsValue();
    FretHTMLManager.HTMLUtils.SetShowNonScaleNotesValue(false);
    this.ReDraw();
  },
  SetTuning: function (tuning) {
    Fretboard.SetTuning(tuning);
    FretHTMLManager.RedrawFretboard();
    if (this.fretboard.Scale !== undefined && this.fretboard.Scale !== null) {
      this.ReDraw();
    }
  },
  SetTuningFromForm: function () {
    var tuningName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._tuningSelectID);
    this.SetTuningByName(tuningName);
  },
  SetTuningByName: function (tuningName) {
    this.SetTuning(MusicDefs.Tunings.find((f) => f.Key === tuningName));
  },
  SetScaleFromForm: function () {
    var scaleName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._scaleSelectID);
    var scaleTypeName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._scaleTypeSelectID);

    var scaleType = MusicDefs.ScaleTypes.find((s) => s.Key === scaleTypeName);
    var scale = new Scale(scaleName, scaleType);
    this.SetScale(scale);
  },
  SetScale: function (scale) {
    this.fretboard.SetScale(scale);
    this.ReDraw();
  },
  SetHighlights: function () {
    var nonScaleFretIDs = this.fretboard.GetNonScaleFrets().map((f) => f.id);

    Object.keys(FretAttribute).forEach((fa) => {
      var frets = this.fretboard.GetFretsWithAttribute(FretAttribute[fa]).map((f) => f.id);
      FretHTMLManager.AddHighlightingClassToIDs(frets, CssUtils.GetFretAttributeCssClass(FretAttribute[fa]));
    });
    // if (this.fretboard.Scale !== null && this.HighlightScaleNotes) {
    //   var scaleFretIDs = this.fretboard.GetScaleFrets().map((f) => f.id);
    //   FretHTMLManager.AddHighlightingClassToIDs(scaleFretIDs, CssUtils.HighlightClasses.scale);

    //   FretHTMLManager.AddHighlightingClassToIDs(nonScaleFretIDs, CssUtils.HighlightClasses.nonScale);

    //   var scaleRootNoteIDs = this.fretboard.GetScaleRootFrets().map((f) => f.id);
    //   FretHTMLManager.AddHighlightingClassToIDs(scaleRootNoteIDs, CssUtils.HighlightClasses.scaleRoot);
    // }

    if (!this.ShowNonScaleNotes) {
      FretHTMLManager.AddHighlightingClassToIDs(nonScaleFretIDs, CssUtils.HighlightClasses.nonScaleHide);
    }
  },
  HighlightChord: function (id) {
    function _AddChordHighlight(chordNoteFrets, chord, position, chordClass) {
      var ids = chordNoteFrets.filter((f) => f.Note.Name === chord.Chord.Notes[position].Name).map((f) => f.id);
      FretHTMLManager.AddHighlightingClassToIDs(ids, chordClass);
    }

    FretHTMLManager.RemoveChordHighlights();
    if (this.HighlightChordNotes) {
      var chord = this.fretboard.Scale.ScaleChords.find((sc) => sc.ID === id);
      if (!chord) {
        chord = this.fretboard.Scale.ScaleSeventhChords.find((sc) => sc.ID === id);
      }
      //console.log(chord);
      var chordNoteNames = chord.Chord.Notes.map((n) => n.Name);
      var chordNoteFrets = this.fretboard.GetAllFrets().filter((f) => chordNoteNames.includes(f.Note.Name));
      //FretHTMLManager.AddHighlightingClassToIDs(chordNoteFrets.map(f => f.id), Util.ChordHighlightClasses.chordNote);

      _AddChordHighlight(chordNoteFrets, chord, 0, CssUtils.ChordHighlightClasses.chordRoot);
      _AddChordHighlight(chordNoteFrets, chord, 1, CssUtils.ChordHighlightClasses.chordThird);
      _AddChordHighlight(chordNoteFrets, chord, 2, CssUtils.ChordHighlightClasses.chordFifth);
      if (chord.Chord.Notes.length === 4) {
        _AddChordHighlight(chordNoteFrets, chord, 3, CssUtils.ChordHighlightClasses.chordSeventh);
      }
    }
  },
  ReDraw: function () {
    FretHTMLManager.RedrawFretboard();
    FretHTMLManager.DrawScaleChart();
    FretHTMLManager.RemoveChordHighlights();
    //FretHTMLManager.RemoveAllHighlightingClasses();
    this.SetHighlights();
    FretHTMLManager.RedrawChordList();
  },
  Init: function () {
    this.fretboard = Fretboard;
    FretHTMLManager.Init();
  },
};
