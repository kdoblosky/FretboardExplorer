import * as MusicDefs from "./MusicDefs.js";
import * as Util from "./Util.js";
import { Fretboard } from "./Fretboard.js";
import { CssUtils } from "./CssUtils.js";
import { Scale } from "./Scale.js";
import { Note } from "./Note.js";

export var FretHTMLManager = {
  FretboardTable: document.getElementById("fretboard-table"),
  HighlightingClasses: ["scale", "scaleroot", "non-scale", "non-scale-hide", "chordroot", "chordthird", "chordfifth"],
  _tuningSelectID: "tuning-select",
  _scaleSelectID: "scale-select",
  _scaleTypeSelectID: "scale-type-select",
  _capoSelectID: "capo-select",
  // GetNoteHTMLClass: function (note) {
  //   var classname = note.DisplayName;
  //   return classname.replace("#", "Sharp").replace(" / ", "-");
  // },
  HTMLUtils: {
    PopulateDropdown: function (dropdownID, source, valueProperty, textProperty) {
      var element = document.getElementById(dropdownID);

      source.forEach((n) => {
        var opt = document.createElement("option");
        opt.value = valueProperty == null ? n : n[valueProperty];
        opt.text = textProperty == null ? n : n[textProperty];
        element.add(opt, null);
      });
    },
    GetFrets: function () {
      return document.getElementsByClassName("fret");
    },
    RemoveHTMLClassFromFrets: function (className) {
      for (var f of this.GetFrets()) {
        f.classList.remove(className);
      }
    },
    AddHTMLClassToFrets: function (classToFind, classToAdd) {
      for (var c of document.getElementsByClassName(classToFind)) {
        c.classList.add(classToAdd);
      }
    },
    GetSelectValue: function (id) {
      var element = document.getElementById(id);
      return element.options[element.selectedIndex].value;
    },
    GetShowNonScaleNotesValue: function () {
      return document.getElementById("show-non-scale-notes").checked;
    },
    GetHighlightScaleNotesValue: function () {
      return document.getElementById("highlight-scale-notes").checked;
    },
    GetHighlightChordNotesValue: function () {
      return document.getElementById("highlight-chord-notes").checked;
    },
    GetShowScalePositionsValue: function () {
      // if this is enabled, show-non-scale-notes should be disabled
      var value = document.getElementById("show-scale-position-instead-of-note").checked;
      var ssn = document.getElementById("show-non-scale-notes");

      ssn.disabled = value;

      return value;
    },
    SetShowNonScaleNotesValue: function (value) {
      document.getElementById("show-non-scale-notes").checked = value;
    },
  },
  RemoveAllHighlightingClasses: function () {
    Object.values(CssUtils.HighlightClasses).forEach((c) => this.HTMLUtils.RemoveHTMLClassFromFrets(c));
  },
  SetChordChartHighlightClass: function (id) {
    var c = document.getElementById(id);
    c.classList.add(CssUtils.ChordHighlightClasses.chordHighlight);
  },
  RemoveChordHighlights: function () {
    Object.values(CssUtils.ChordHighlightClasses).forEach((c) => {
      this.HTMLUtils.RemoveHTMLClassFromFrets(c);
    });
    // There should only be one highlighted chord
    var chords = document.getElementsByClassName(CssUtils.ChordHighlightClasses.chordHighlight);
    Array.prototype.forEach.call(chords, (c) => c.classList.remove(CssUtils.ChordHighlightClasses.chordHighlight));
  },
  SetChordDetailChart: function (chord) {
    const chordNoteHighlightClasses = [
      CssUtils.ChordHighlightClasses.chordRoot,
      CssUtils.ChordHighlightClasses.chordThird,
      CssUtils.ChordHighlightClasses.chordFifth,
      CssUtils.ChordHighlightClasses.chordSeventh,
    ];
    var html = "";

    if (chord) {
      html += "<div class='chord-detail'><span class='chord-detail-prefix'>Selected Chord: </span>";
      //html += "<span class='chord-detail-header'>" + chord.Name + "</span>";
      html += "<span class='chord-detail-header'>" + chord.DisplayName(Fretboard.Scale.UseAltNames) + "</span>";
      for (var i = 0; i < chord.Notes.length; i++) {
        var n = chord.Notes[i];
        html +=
          "<span class='chord-detail-note " +
          chordNoteHighlightClasses[i] +
          "'>" +
          (Fretboard.Scale.UseAltNames ? n.AltName : n.Name) +
          "</span>";
        // chord.Notes.forEach((n) => {
        //   html += "<span class='chord-detail-note'>" + (Fretboard.Scale.UseAltNames ? n.AltName : n.Name) + "</span>";
        // });
      }
      html += "</div>";
    }
    var chart = document.getElementById("chord-detail-chart");
    chart.innerHTML = html;
  },
  RemoveAllHighlights: function () {
    this.RemoveAllHighlightingClasses();
    this.RemoveChordHighlights();
  },
  AddHighlightingClassToIDs(ids, highlightingClass) {
    if (ids !== null && ids.length > 0) {
      ids.forEach((i) => document.getElementById(i).classList.add(highlightingClass));
    }
  },

  DrawScaleChart: function (scale) {
    var scaleCss = [
      CssUtils.HighlightClasses.scaleRoot,
      CssUtils.HighlightClasses.scaleSecond,
      CssUtils.HighlightClasses.scaleThird,
      CssUtils.HighlightClasses.scaleFourth,
      CssUtils.HighlightClasses.scaleFifth,
      CssUtils.HighlightClasses.scaleSixth,
      CssUtils.HighlightClasses.scaleSeventh,
    ];

    // var scale = window.FretboardController.fretboard.Scale;

    var scaleChartHtml =
      "<div class='scale-chart'><span class='scale-chart-header'>Notes in " + scale.Name + " scale: </span>";

    for (var i = 0; i < scaleCss.length; i++) {
      scaleChartHtml += "<span class='scale-chart-item " + scaleCss[i] + "'>";
      var note = new Note(scale.NoteLetters[i]);
      //scaleChartHtml += (i + 1).toString() + " / " + note.DisplayName + "</span>";
      scaleChartHtml += (i + 1).toString() + " / " + (scale.UseAltNames ? note.AltName : note.Name) + "</span>";
    }

    scaleChartHtml += "</div>";

    var scaleChart = document.getElementById("scale-chart-container");
    scaleChart.innerHTML = scaleChartHtml;
  },

  RedrawFretboard: function (showScalePositions, scale) {
    function GetNoteHTMLClass(note) {
      var classname = note.DisplayName;
      return classname.replace("#", "Sharp").replace(" / ", "-");
    }
    function GetFretCssClasses(fret) {
      var classes = [];
      fret.FretAttributes.forEach((f) => {
        var fa = CssUtils.GetFretAttributeCssClass(f);
        if (fa !== "") {
          classes.push("'" + fa + "'");
        }
        return classes;
      });
    }
    function GetFretCssClassesWithDefault(fret, extra) {
      var classes = GetFretCssClasses(fret);
      var allClasses;

      if (classes) {
        allClasses = [].concat(classes, extra);
      } else {
        allClasses = extra;
      }
      return allClasses.join(" ");
    }
    function getFretHTML(fret) {
      classes = GetFretCssClassesWithDefault(fret, ["fret", GetNoteHTMLClass(fret.Note)]);

      var display;

      if (showScalePositions) {
        display = fret.ScalePosition(scale);
      } else {
        display = fret.NoteName(Fretboard.Scale.UseAltNames);
      }
      return "<td class='" + classes + "' id='" + fret.id + "'>" + display + "</td>";
    }
    function getFretboardStringHTML(fs) {
      var fsHtml = "<tr class='string' id='" + fs.id + "'>";

      fsHtml += "<td class='string-root'>" + fs.RootNote + "</td>";

      fs.Frets.forEach((fret) => {
        fsHtml += getFretHTML(fret);
      });
      fsHtml += "</tr>";

      return fsHtml;
    }

    var fretboardHTMLTable = "<table>";
    var classes;

    fretboardHTMLTable += "<tr class='fretboard-header-row'><th class='string-root'>String</th>";
    for (var i = 0; i <= Fretboard.FretsPerString; i++) {
      fretboardHTMLTable += "<th scope='col' class='fret-header'>" + (i === 0 ? "Open" : i) + "</th>";
    }
    fretboardHTMLTable += "</tr>";

    Fretboard.FretboardMap.map((x) => x)
      .reverse()
      .forEach((fs) => {
        fretboardHTMLTable += getFretboardStringHTML(fs);
      });
    fretboardHTMLTable += "</table>";

    if (this.FretboardTable === null) {
      this.FretboardTable = document.getElementById("fretboard-table");
    }
    this.FretboardTable.innerHTML = fretboardHTMLTable;
  },
  RedrawChordList: function () {
    var scaleNoteLengths = Fretboard.Scale.ScaleNotes.map((sn) => sn.ScaleChords.length);
    // Math.max doesn't allow an array, so using the spread operator (...) to convert it to the individual values
    var numberOfRows = Math.max(...scaleNoteLengths);

    var chordlistHTML = "<table id='scale-chords'>";
    for (var i = 0; i < numberOfRows; i++) {
      chordlistHTML += "<tr>";

      Fretboard.Scale.ScaleNotes.forEach((sn) => {
        if (sn.ScaleChords[i]) {
          chordlistHTML +=
            "<td class='scale-chord ' id='" +
            sn.ScaleChords[i].ID +
            "' onclick='FretboardController.HighlightChord(this.id)'>" +
            sn.ScaleChords[i].Display +
            "</td>";
        } else {
          chordlistHTML += "<td class='scale-chord'></td>";
        }
      });
      chordlistHTML += "</tr>";
    }
    chordlistHTML += "</table>";

    document.getElementById("scale-chord-list").innerHTML = chordlistHTML;
  },
  PopulateTunings: function () {
    var tunings = Object.keys(MusicDefs.Tunings).map((t) => MusicDefs.Tunings[t]);
    this.HTMLUtils.PopulateDropdown(this._tuningSelectID, tunings, "Key", "Name");
  },
  PopulateScales: function () {
    var notes = MusicDefs.AllNotes.map((f) => {
      if (f.includes("#")) {
        return f + " / " + Util.GetArrayOffset(MusicDefs.NoteLetters, f.replace("#", ""), 1) + "b";
      } else {
        return f;
      }
    });
    //this.HTMLUtils.PopulateDropdown(this._scaleSelectID, MusicDefs.AllNotes);
    this.HTMLUtils.PopulateDropdown(this._scaleSelectID, notes);
  },
  PopulateScaleTypes: function () {
    var scaleTypes = Object.keys(MusicDefs.ScaleTypes).map((t) => MusicDefs.ScaleTypes[t]);
    this.HTMLUtils.PopulateDropdown(this._scaleTypeSelectID, scaleTypes, "Key", "Name");
  },
  PopulateCapo: function () {
    var capoFrets = [];

    for (var i = -2; i < 10; i++) {
      capoFrets.push(i);
    }

    this.HTMLUtils.PopulateDropdown(this._capoSelectID, capoFrets);
    document.getElementById(this._capoSelectID).selectedIndex = 2;
  },
  SetEnharmonicScales(scales) {
    var text = scales.join("<br>");
    document.getElementById("enharmonic-scales").innerHTML = text;
  },
  Init: function () {
    this.PopulateCapo();
    this.PopulateTunings();
    this.PopulateScales();
    this.PopulateScaleTypes();
  },
};
