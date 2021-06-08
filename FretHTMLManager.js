import * as MusicDefs from "./MusicDefs.js";
import { Fretboard } from "./Fretboard.js";
import { CssUtils } from "./CssUtils.js";
import { Scale } from "./Scale.js";

export var FretHTMLManager = {
  FretboardTable: document.getElementById("fretboard-table"),
  HighlightingClasses: ["scale", "scaleroot", "non-scale", "non-scale-hide", "chordroot", "chordthird", "chordfifth"],
  _tuningSelectID: "tuning-select",
  _scaleSelectID: "scale-select",
  _scaleTypeSelectID: "scale-type-select",
  _capoSelectID: "capo-select",
  GetNoteHTMLClass: function (note) {
    var classname = note.DisplayName;
    return classname.replace("#", "Sharp").replace(" / ", "-");
  },
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
      return document.getElementById("show-scale-position-instead-of-note").checked;
    },
    SetShowNonScaleNotesValue: function (value) {
      document.getElementById("show-non-scale-notes").checked = value;
    },
  },
  RemoveAllHighlightingClasses: function () {
    Object.values(CssUtils.HighlightClasses).forEach((c) => this.HTMLUtils.RemoveHTMLClassFromFrets(c));
  },
  RemoveChordHighlights: function () {
    Object.values(CssUtils.ChordHighlightClasses).forEach((c) => this.HTMLUtils.RemoveHTMLClassFromFrets(c));
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
  GetFretCssClasses: function (fret) {
    var classes = [];
    fret.FretAttributes.forEach((f) => {
      var fa = CssUtils.GetFretAttributeCssClass(f);
      if (fa !== "") {
        classes.push("'" + fa + "'");
      }
      return classes;
    });
  },
  GetFretCssClassesWithDefault: function (fret, extra) {
    var classes = this.GetFretCssClasses(fret);
    var allClasses;

    if (classes) {
      allClasses = [].concat(classes, extra);
    } else {
      allClasses = extra;
    }
    return allClasses.join(" ");
  },
  DrawScaleChart: function () {
    var scaleCss = [
      CssUtils.HighlightClasses.scaleRoot,
      CssUtils.HighlightClasses.scaleSecond,
      CssUtils.HighlightClasses.scaleThird,
      CssUtils.HighlightClasses.scaleFourth,
      CssUtils.HighlightClasses.scaleFifth,
      CssUtils.HighlightClasses.scaleSixth,
      CssUtils.HighlightClasses.scaleSeventh,
    ];

    var scale = window.FretboardController.fretboard.Scale;

    var headerRow = "<tr>";
    var noteRow = "<tr>";

    for (var i = 0; i < scaleCss.length; i++) {
      var cellPrefix = "<td class='" + scaleCss[i] + "'>";
      //headerRow += cellPrefix + (i === 0) ? "Root / 1" : (i + 1).toString() + "</td>";
      headerRow += cellPrefix + (i === 0 ? "Root / 1" : (i + 1).toString()) + "</td>";
      noteRow += cellPrefix + scale.NoteLetters[i] + "</td>";
    }

    var scaleChartHtml = "<h3>" + scale.Name + " contains these notes</h2>";
    scaleChartHtml += "<table>" + headerRow + "</tr>";
    scaleChartHtml += noteRow + "</tr></table>";

    var scaleChart = document.getElementById("scale-chart");
    scaleChart.innerHTML = scaleChartHtml;
  },
  RedrawFretboard: function () {
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
        //console.log(fs);
        fretboardHTMLTable += "<tr class='string' id='" + fs.id + "'>";

        fretboardHTMLTable += "<td class='string-root'>" + fs.RootNote + "</td>";

        fs.Frets.forEach((fret) => {
          classes = this.GetFretCssClassesWithDefault(fret, ["fret", this.GetNoteHTMLClass(fret.Note)]);

          var display;
          if (window.FretboardController.ShowScalePositions) {
            display = fret.ScalePosition(window.FretboardController.fretboard.Scale);
          } else {
            display = fret.NoteName();
          }
          fretboardHTMLTable +=
            // "<td class='fret " + this.GetNoteHTMLClass(fret.Note) + "' id='" +
            //"<td class='" + classes + "' id='" + fret.id + "'>" + fret.Note.DisplayName + "</td>";
            "<td class='" + classes + "' id='" + fret.id + "'>" + display + "</td>";
        });
        fretboardHTMLTable += "</tr>";
      });
    fretboardHTMLTable += "</table>";

    if (this.FretboardTable === null) {
      this.FretboardTable = document.getElementById("fretboard-table");
    }
    this.FretboardTable.innerHTML = fretboardHTMLTable;
  },
  RedrawChordList: function () {
    var chordlistHTML = "<div id='scale-chords'>";
    Fretboard.Scale.ScaleChords.forEach((sc) => {
      chordlistHTML +=
        "<span class='scale-chord ' id='" +
        sc.ID +
        "' onclick='FretboardController.HighlightChord(this.id)'>" +
        sc.Display +
        "</span>";
    });
    chordlistHTML += "</div>";
    document.getElementById("scale-chord-list").innerHTML = chordlistHTML;

    var seventhChordListHTML = "<div id='seventh-scale-chords'>";
    Fretboard.Scale.ScaleSeventhChords.forEach((sc) => {
      seventhChordListHTML +=
        "<span class='scale-chord ' id='" +
        sc.ID +
        "' onclick='FretboardController.HighlightChord(this.id)'>" +
        sc.Display +
        "</span>";
    });
    seventhChordListHTML += "</div>";
    document.getElementById("seventh-scale-chord-list").innerHTML = seventhChordListHTML;
  },
  PopulateTunings: function () {
    var tunings = Object.keys(MusicDefs.Tunings).map((t) => MusicDefs.Tunings[t]);
    this.HTMLUtils.PopulateDropdown(this._tuningSelectID, tunings, "Key", "Name");
  },
  PopulateScales: function () {
    this.HTMLUtils.PopulateDropdown(this._scaleSelectID, MusicDefs.AllNotes);
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
