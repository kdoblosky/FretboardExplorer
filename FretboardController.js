/* eslint-disable no-import-assign */
import * as MusicDefs from "./MusicDefs.js";
import { Scale } from "./Scale.js";
import * as FretHTMLManager from "./FretHTMLManager.js";
import { Fretboard } from "./Fretboard.js";
import { FretAttribute } from "./FretAttribute.js";
import { CssUtils } from "./CssUtils.js";
import * as QueryStringUtils from "./QueryStringUtils.js";

export var FretboardController = {
  fretboard: Fretboard,
  HTMLManager: FretHTMLManager,

  HightlightedChord: null,

  ShowNonScaleNotes: false,
  HighlightScaleNotes: true,
  HighlightChordNotes: true,
  ShowScalePositions: false,
  capoFret: 0,

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
    if (this.ShowScalePositions) {
      this.ShowNonScaleNotes = false;
    }
    this.ShowScalePositions = FretHTMLManager.HTMLUtils.GetShowScalePositionsValue();
    FretHTMLManager.HTMLUtils.SetShowNonScaleNotesValue(false);
    this.SetShowNonScaleNotes();
  },

  SetCapo: function () {
    var capoFret = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._capoSelectID);
    this.fretboard.CapoFret = parseInt(capoFret, 10);
    QueryStringUtils.SetCapo(capoFret);
    this.ReDraw();
  },

  SetTuning: function (tuning) {
    this.fretboard.Tuning = tuning;
    //Fretboard.SetTuning(tuning, this.capoFret);
    FretHTMLManager.RedrawFretboard();
    if (this.fretboard.Scale !== undefined && this.fretboard.Scale !== null) {
      this.ReDraw();
    }
  },
  SetTuningFromForm: function () {
    var tuningName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._tuningSelectID);
    QueryStringUtils.SetTuning(tuningName);
    this.SetTuningByName(tuningName);
  },
  SetTuningByName: function (tuningName) {
    this.SetTuning(MusicDefs.Tunings.find((f) => f.Id === tuningName));
  },
  SetScaleFromForm: function () {
    var scaleName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._scaleSelectID);
    var scaleTypeName = FretHTMLManager.HTMLUtils.GetSelectValue(FretHTMLManager._scaleTypeSelectID);

    QueryStringUtils.SetScale(scaleName);
    QueryStringUtils.SetScaleType(scaleTypeName);
    var scaleType = MusicDefs.ScaleTypes.find((s) => s.Id === scaleTypeName);
    var scale = new Scale(scaleName, scaleType);
    this.SetScale(scale);
  },
  SetScale: function (scale) {
    this.fretboard.Scale = scale;
    var enharmonicScales = scale.GetEnharmonicScales();
    FretHTMLManager.SetEnharmonicScales(enharmonicScales);
    this.ReDraw();
  },
  SetHighlights: function () {
    var nonScaleFretIDs = this.fretboard.GetNonScaleFrets().map((f) => f.id);

    Object.keys(FretAttribute).forEach((fa) => {
      var frets = this.fretboard.GetFretsWithAttribute(FretAttribute[fa]).map((f) => f.id);
      FretHTMLManager.AddHighlightingClassToIDs(frets, CssUtils.GetFretAttributeCssClass(FretAttribute[fa]));
    });

    if (!this.ShowNonScaleNotes) {
      FretHTMLManager.AddHighlightingClassToIDs(nonScaleFretIDs, CssUtils.HighlightClasses.nonScaleHide);
    }
  },
  HighlightChord: function (id) {
    function _AddChordHighlight(chordNoteFrets, chord, position, chordClass) {
      var ids;
      if (position || position == 0) {
        ids = chordNoteFrets.filter((f) => f.Note.Name === chord.Chord.Notes[position].Name).map((f) => f.id);
      } else {
        ids = chordNoteFrets.filter((f) => chord.Chord.Notes.map((n) => n.Name).includes(f.Note.Name)).map((f) => f.id);
      }
      FretHTMLManager.AddHighlightingClassToIDs(ids, chordClass);
    }

    FretHTMLManager.RemoveChordHighlights();

    // If the chord was already highlighted, we don't want to re-highlight it
    if (this.HighlightedChord != id) {
      this.HighlightedChord = id;

      var chord = this.fretboard.Scale.ScaleChords.find((sc) => sc.ID === id);

      FretHTMLManager.SetChordDetailChart(chord.Chord);
      if (this.HighlightChordNotes) {
        FretHTMLManager.SetChordChartHighlightClass(id);

        var chordNoteNames = chord.Chord.Notes.map((n) => n.Name);
        var chordNoteFrets = this.fretboard.GetAllFrets().filter((f) => chordNoteNames.includes(f.Note.Name));

        _AddChordHighlight(chordNoteFrets, chord, 0, CssUtils.ChordHighlightClasses.chordRoot);
        _AddChordHighlight(chordNoteFrets, chord, 1, CssUtils.ChordHighlightClasses.chordThird);
        _AddChordHighlight(chordNoteFrets, chord, 2, CssUtils.ChordHighlightClasses.chordFifth);
        if (chord.Chord.Notes.length === 4) {
          _AddChordHighlight(chordNoteFrets, chord, 3, CssUtils.ChordHighlightClasses.chordSeventh);
        }
        //_AddChordHighlight(chordNoteFrets, chord, null, CssUtils.ChordHighlightClasses.chordNote);
      }
    } else {
      FretHTMLManager.SetChordDetailChart(null);
      this.HighlightedChord = null;
    }
  },
  ReDraw: function () {
    this.fretboard.SetTuning(this.fretboard.Tuning);
    this.fretboard.SetScale(this.fretboard.Scale);
    FretHTMLManager.RedrawFretboard(this.ShowScalePositions, this.fretboard.Scale);
    FretHTMLManager.DrawScaleChart(this.fretboard.Scale);
    FretHTMLManager.SetChordDetailChart(null);
    this.SetHighlights();
    FretHTMLManager.RedrawChordList();
    this.HighlightedChord = null;
    QueryStringUtils.SetQueryString();
  },
  Init: function () {
    this.fretboard = Fretboard;
    FretHTMLManager.Init();
  },
};
