/** @module FretboardExplorer/FretHTMLManager */

import * as MusicDefs from "./MusicDefs.js";
import * as Util from "./Util.js";
import { Fretboard } from "./Fretboard.js";
import { CssUtils } from "./CssUtils.js";
import { Note } from "./Note.js";

//export var FretHTMLManager = {
export var FretboardTable = document.getElementById("fretboard-table");
//HighlightingClasses: ["scale", "scaleroot", "non-scale", "non-scale-hide", "chordroot", "chordthird", "chordfifth"],
export var _tuningSelectID = "tuning-select";

export var _scaleSelectID = "scale-select";

export var _scaleTypeSelectID = "scale-type-select";
export var _capoSelectID = "capo-select";

/**
 * Collection of utility functions for dealing with HTML.
 */
export var HTMLUtils = {
  /**
   * Populate a dropdown with the provided options.
   *
   * @param {string} dropdownID ID of the DOM dropdown element to populate
   * @param {*} source Array of elements to populate
   * @param {*} valueProperty Property of source to use as value for option. If null, use source itself.
   * @param {*} textProperty Property of source to use as text for option. If null, use source itself.
   */
  PopulateDropdown: function (dropdownID, source, valueProperty, textProperty) {
    var element = document.getElementById(dropdownID);

    source.forEach((n) => {
      var opt = document.createElement("option");
      opt.value = valueProperty == null ? n : n[valueProperty];
      opt.text = textProperty == null ? n : n[textProperty];
      element.add(opt, null);
    });
  },

  ClearOptionsFromDropdown: function (dropdownID) {
    var selectElement = document.getElementById(dropdownID);
    var last = selectElement.options.length - 1;
    for (var i = last; i >= 0; i--) {
      selectElement.remove(i);
    }
  },

  SelectOptionFromDropdown: function (dropdownID, value) {
    document.getElementById(dropdownID).value = value;
  },

  /**
   * Get all DOM elements with the class 'fret'
   *
   * @returns {HTMLCollection}
   */
  GetFrets: function () {
    return document.getElementsByClassName("fret");
  },

  // AddNoteNoneAttributeToFrets: function() {
  //   var frets = this.Fretboard.GetAllFrets().filter((f) => f.Note.Name == "None");
  //   frets.forEach((f) => {
  //     f.classList.add(CssUtils.HighlightClasses.noteNone)
  //   });
  // },

  /**
   * Remove specified CSS class from all frets
   *
   * @param {string} className Name of class to remove
   */
  RemoveHTMLClassFromFrets: function (className) {
    for (var f of this.GetFrets()) {
      f.classList.remove(className);
    }
  },

  /**
   * Add CSS class to all elements with the specified class.
   *
   * @param {string} classToFind CSS class for elements to add new class to.
   * @param {string} classToAdd New CSS class to add.
   */
  AddHTMLClassToFrets: function (classToFind, classToAdd) {
    // TODO: Rename this, since it's not specific to frets
    for (var c of document.getElementsByClassName(classToFind)) {
      c.classList.add(classToAdd);
    }
  },

  /**
   * Get value of specified select dropdown.
   *
   * @param {string} id DOM ID of select element to get value of.
   * @returns value of selected option.
   */
  GetSelectValue: function (id) {
    var element = document.getElementById(id);
    return element.options[element.selectedIndex].value;
  },

  /**
   * Returns value of Show non-scale notes checkbox
   *
   * @returns {boolean} Should we show non-scale note labels?
   */
  GetShowNonScaleNotesValue: function () {
    return document.getElementById("show-non-scale-notes").checked;
  },

  /**
   * Returns value of Highlight scale notes checkbox
   *
   * @returns {boolean} Should we highlight scale notes?
   */
  GetHighlightScaleNotesValue: function () {
    return document.getElementById("highlight-scale-notes").checked;
  },

  /**
   * Returns value of Highlight chord notes checkbox
   *
   * @returns {boolean} Should we highlight chords?
   */
  GetHighlightChordNotesValue: function () {
    return document.getElementById("highlight-chord-notes").checked;
  },

  /**
   * Returns value of Show scale position instead of notes checkbox. If this is checked,
   * disable the Show non-scale notes checkbox.
   *
   * @returns {boolean} Should we show scale positions?
   */
  GetShowScalePositionsValue: function () {
    var value = document.getElementById("show-scale-position-instead-of-note").checked;
    var ssn = document.getElementById("show-non-scale-notes");

    // if this is enabled, show-non-scale-notes should be disabled
    ssn.disabled = value;

    return value;
  },

  /**
   * Set checked status of Show non-scale notes checkbox
   * @param {boolean} value
   */
  SetShowNonScaleNotesValue: function (value) {
    document.getElementById("show-non-scale-notes").checked = value;
  },

  /**
   * Set the innerHTML of an element with the provided id.
   *
   * @param {string} id ID of the element to set
   * @param {*} innerHtml Value to set innerHTML to.
   */
  SetInnerHtmlById: function (id, innerHtml) {
    var element = document.getElementById(id);
    element.innerHTML = innerHtml;
  },
};

/**
 * Remove all CSS classes in CssUtils.HighlightClasses from frets.
 */
export var RemoveAllHighlightingClasses = function () {
  Object.values(CssUtils.HighlightClasses).forEach((c) => this.HTMLUtils.RemoveHTMLClassFromFrets(c));
};

/**
 * Add CSS class for chordHighlight to specified ID.
 *
 * @param {string} id DOM id of chord chart to add chordHighlight CSS class to.
 */
export var SetChordChartHighlightClass = function (id) {
  var c = document.getElementById(id);
  c.classList.add(CssUtils.ChordHighlightClasses.chordHighlight);
};

/**
 * Remove chord highlights from fretboard, and from chord chart
 */
export var RemoveChordHighlights = function () {
  Object.values(CssUtils.ChordHighlightClasses).forEach((c) => {
    this.HTMLUtils.RemoveHTMLClassFromFrets(c);
  });
  // There should only be one highlighted chord
  var chords = document.getElementsByClassName(CssUtils.ChordHighlightClasses.chordHighlight);
  Array.prototype.forEach.call(chords, (c) => c.classList.remove(CssUtils.ChordHighlightClasses.chordHighlight));
};

/**
 * Populate chord detail chart based on provided chord
 *
 * @param {Chord} chord Chord to populate chord detail chart from
 */
export var SetChordDetailChart = function (chord) {
  function getChordDetailChartHeaderHTML(c) {
    var headerHTML = "<div class='chord-detail'><span class='chord-detail-prefix'>Selected Chord: </span>";
    headerHTML += "<span class='chord-detail-header'>" + c.DisplayName(Fretboard.Scale.UseAltNames) + "</span>";
    return headerHTML;
  }

  function getChordDetailHTML(c) {
    var detailHTML = "";
    var n = c.Notes[i];
    detailHTML =
      "<span class='chord-detail-note " +
      chordNoteHighlightClasses[i] +
      "'>" +
      (Fretboard.Scale.UseAltNames ? n.AltName : n.Name) +
      "</span>";
    return detailHTML;
  }

  function getChordDetailChartFooterHTML() {
    return "</div>";
  }
  const chordNoteHighlightClasses = [
    CssUtils.ChordHighlightClasses.chordRoot,
    CssUtils.ChordHighlightClasses.chordThird,
    CssUtils.ChordHighlightClasses.chordFifth,
    CssUtils.ChordHighlightClasses.chordSeventh,
  ];
  var html = "";

  if (chord) {
    html += getChordDetailChartHeaderHTML(chord);
    for (var i = 0; i < chord.Notes.length; i++) {
      html += getChordDetailHTML(chord);
    }
    html += getChordDetailChartFooterHTML();
  }

  this.HTMLUtils.SetInnerHtmlById("chord-detail-chart", html);
};

/**
 * Remove all highlighting classes from fretboard.
 */
export var RemoveAllHighlights = function () {
  this.RemoveAllHighlightingClasses();
  this.RemoveChordHighlights();
};

/**
 * Add CSS class to DOM elements with provided IDs.
 *
 * @param {string[]} ids IDs of DOM elements to add class to
 * @param {*} highlightingClass CSS class to add
 */
export var AddHighlightingClassToIDs = function (ids, highlightingClass) {
  // TODO: Rename this, as it can be used for any CSS class.
  if (ids !== null && ids.length > 0) {
    ids.forEach((i) => document.getElementById(i).classList.add(highlightingClass));
  }
};

/**
 * (Re)generates HTML for scale chart.
 * @param {Scale} scale
 */
export var DrawScaleChart = function (scale) {
  /**
   * Get HTML fragment for scale chart header.
   *
   * @param {Scale} scale
   * @returns {string} HTML fragment for scale chart header.
   */
  function getScaleChartHeader(sc) {
    return "<div class='scale-chart'><span class='scale-chart-header'>Notes in " + sc.Name + " scale: </span>";
  }

  /**
   * Get HTML fragment for scale chart footer.
   *
   * @returns {string} HTML fragment for scale chart footer.
   */
  function getScaleChartFooter() {
    return "</div>";
  }

  /**
   * Get HTML fragment for a single note in the scale chart.
   * @param {int} position 0-based index of scale position. Used as index for scaleCss and scale.NoteLetters.
   * @returns {string} HTML fragment for a single note in the scale chart.
   */
  function getScaleChartNote(position) {
    var noteHTML = "<span class='scale-chart-item " + scaleCss[position] + "'>";
    var note = new Note(scale.NoteLetters[position]);
    noteHTML += (position + 1).toString() + " / " + (scale.UseAltNames ? note.AltName : note.Name) + "</span>";
    return noteHTML;
  }

  var scaleCss = [
    CssUtils.HighlightClasses.scaleRoot,
    CssUtils.HighlightClasses.scaleSecond,
    CssUtils.HighlightClasses.scaleThird,
    CssUtils.HighlightClasses.scaleFourth,
    CssUtils.HighlightClasses.scaleFifth,
    CssUtils.HighlightClasses.scaleSixth,
    CssUtils.HighlightClasses.scaleSeventh,
  ];

  var scaleChartHtml = getScaleChartHeader(scale);

  for (var i = 0; i < scaleCss.length; i++) {
    scaleChartHtml += getScaleChartNote(i);
  }

  scaleChartHtml += getScaleChartFooter();

  this.HTMLUtils.SetInnerHtmlById("scale-chart-container", scaleChartHtml);
};

/**
 * (Re)generates the HTML for the fretboard.
 *
 * @param {boolean} showScalePositions When true, show scale positions (1, 2, etc.). When false, show note names.
 * @param {Scale} scale Scale to display on fretboard
 */
export var RedrawFretboard = function (showScalePositions, scale) {
  /**
   * Get the CSS class to be applied to frets with the specified note.
   *
   * @param {Note} note
   * @returns {string} CSS class for the specified Note.
   */
  function GetNoteHTMLClass(note) {
    var classname = note.DisplayName;
    return classname.replace("#", "Sharp").replace(" / ", "-");
  }

  /**
   * Get css classes associated with FretAttributes for the specified fret.
   *
   * @param {Fret} fret
   * @returns Array of strings, with each element corresponding to a single CSS class
   */
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

  /**
   * Get css classes associated with FretAttributes for the specified fret, along with the provided extra classes.
   *
   * @param {Fret} fret The Fret to get CSS classes for.
   * @param {*} extra An array of strings with extra CSS classes to apply.
   * @returns A string of all CSS classes to be applied, separated by spaces.
   */
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

  /**
   * Get HTML fragment for a single Fret.
   *
   * @param {Fret} fret
   * @returns {string} HTML fragment representing a single fret.
   */
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

  /**
   * Get HTML fragment for a single FretboardString.
   *
   * @param {FretboardString} fs
   * @returns {string} HTML fragment for a single FretboardString.
   */
  function getFretboardStringHTML(fs) {
    var fsHtml = "<tr class='string' id='" + fs.id + "'>";

    fsHtml += "<td class='string-root'>" + fs.RootNote + "</td>";

    fs.Frets.forEach((fret) => {
      fsHtml += getFretHTML(fret);
    });
    fsHtml += "</tr>";

    return fsHtml;
  }

  /**
   * Get HTML fragment for the header of the fretboard.
   *
   * @returns HTML fragment for the header of the fretboard.
   */
  function getFretboardHeaderHTML() {
    var headerHTML = "<table>";

    headerHTML += "<tr class='fretboard-header-row'><th class='string-root'>String</th>";
    for (var i = 0; i <= Fretboard.FretsPerString; i++) {
      headerHTML += "<th scope='col' class='fret-header'>" + (i === 0 ? "Open" : i) + "</th>";
    }
    headerHTML += "</tr>";

    return headerHTML;
  }

  /**
   * Get HTML fragment for the footer of the fretboard.
   *
   * @returns HTML fragment for the footer of the fretboard.
   */
  function getFretboardFooterHTML() {
    return "</table>";
  }

  var fretboardHTMLTable = getFretboardHeaderHTML();
  var classes;

  Fretboard.FretboardMap.map((x) => x)
    .reverse()
    .forEach((fs) => {
      fretboardHTMLTable += getFretboardStringHTML(fs);
    });
  fretboardHTMLTable += getFretboardFooterHTML();

  if (this.FretboardTable === null) {
    this.FretboardTable = document.getElementById("fretboard-table");
  }
  this.FretboardTable.innerHTML = fretboardHTMLTable;
};

/**
 * (Re)generates the HTML for the chord list.
 */
export var RedrawChordList = function () {
  /**
   * Get HTML fragment chord list header.
   *
   * @returns {string} HTML fragment for chord list header.
   */
  function getChordListHeader() {
    var headerHTML = "<table id='scale-chords'>";
    headerHTML += "<tr class='table-header'>";
    for (var j = 0; j < 7; j++) {
      headerHTML += "<th class='table-header-cell'>" + (j + 1) + "</th>";
    }
    headerHTML += "</tr>";
    return headerHTML;
  }

  /**
   * Get HTML fragment chord list footer.
   *
   * @returns {string} HTML fragment for chord list footer.
   */
  function getChordListFooter() {
    return "</table>";
  }

  /**
   * Get HTML fragment for a single chord.
   *
   * @param {ScaleNote} sn ScaleNote to find chord for
   * @param {int} row Row to find chord for. Corresponds to index of sn.ScaleChords.
   * @returns {string} HTML fragment for a single chord.
   */
  function getChordListChordHTML(sn, row) {
    var chordHTML = "";
    if (sn.ScaleChords[row]) {
      chordHTML +=
        "<td class='scale-chord ' id='" +
        sn.ScaleChords[row].ID +
        "' onclick='FretboardController.HighlightChord(this.id)'>" +
        sn.ScaleChords[row].Display +
        "</td>";
    } else {
      chordHTML += "<td class='scale-chord'></td>";
    }

    return chordHTML;
  }

  /**
   * Get HTML fragment for row of chords
   *
   * @param {int} row
   * @returns {string} HTML fragment corresponding to a row of chords
   */
  function getChordListRowHTML(row) {
    var rowHTML = "<tr>";

    Fretboard.Scale.ScaleNotes.forEach((sn) => {
      rowHTML += getChordListChordHTML(sn, row);
    });
    rowHTML += "</tr>";

    return rowHTML;
  }

  var chordlistHTML = getChordListHeader();

  var scaleNoteLengths = Fretboard.Scale.ScaleNotes.map((sn) => sn.ScaleChords.length);
  // Math.max doesn't allow an array, so using the spread operator (...) to convert it to the individual values
  var numberOfRows = Math.max(...scaleNoteLengths);

  for (var i = 0; i < numberOfRows; i++) {
    chordlistHTML += getChordListRowHTML(i);
  }

  chordlistHTML += getChordListFooter();

  this.HTMLUtils.SetInnerHtmlById("scale-chord-list", chordlistHTML);
};

/**
 * Populate dropdown for tunings.
 */
export var PopulateTunings = function () {
  var tunings = Object.keys(MusicDefs.Tunings).map((t) => MusicDefs.Tunings[t]);
  this.HTMLUtils.PopulateDropdown(this._tuningSelectID, tunings, "Id", "Name");
};

/**
 * Populate dropdown for scale root notes.
 */
export var PopulateScales = function () {
  var notes = MusicDefs.AllNotes.map((f) => {
    if (f.includes("#")) {
      return { id: f, value: f + " / " + Util.GetArrayOffset(MusicDefs.NoteLetters, f.replace("#", ""), 1) + "b" };
    } else {
      return { id: f, value: f };
    }
  });
  this.HTMLUtils.PopulateDropdown(this._scaleSelectID, notes, "id", "value");
};

/**
 * Populate dropdown for scale types.
 */
export var PopulateScaleTypes = function () {
  var scaleTypes = Object.keys(MusicDefs.ScaleTypes).map((t) => MusicDefs.ScaleTypes[t]);
  this.HTMLUtils.PopulateDropdown(this._scaleTypeSelectID, scaleTypes, "Id", "Name");
};

/**
 * Populate dropdown for capo fret.
 */
export var PopulateCapo = function () {
  var capoFrets = [];

  for (var i = -2; i < 10; i++) {
    capoFrets.push({ display: "Capo " + i.toString(), value: i });
  }

  this.HTMLUtils.PopulateDropdown(this._capoSelectID, capoFrets, "value", "display");
  document.getElementById(this._capoSelectID).selectedIndex = 2;
};

/**
 * Sets content of pop-up listing enharmonic scales
 * @param {string[]} scales List of enharmonic scales.
 */
export var SetEnharmonicScales = function (scales) {
  //var text = scales.join("<br>");
  this.HTMLUtils.ClearOptionsFromDropdown("enharmonic-scales");
  this.HTMLUtils.PopulateDropdown("enharmonic-scales", ["Enharmonic Scales"].concat(scales));
};

/**
 * Initialize HTML by populating all dropdowns.
 */
export var Init = function () {
  this.PopulateCapo();
  this.PopulateTunings();
  this.PopulateScales();
  this.PopulateScaleTypes();
};
