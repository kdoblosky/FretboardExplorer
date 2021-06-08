import { FretAttribute } from "./FretAttribute.js";

export var CssUtils = {
  GetFretAttributeCssClass: function (fretAttribute) {
    var cssClass;

    switch (fretAttribute) {
      case FretAttribute.ScaleNote:
        cssClass = this.HighlightClasses.scale;
        // "scale";
        break;
      case FretAttribute.ScaleRoot:
        cssClass = this.HighlightClasses.scaleRoot;
        //"scale-root";
        break;
      case FretAttribute.ScaleSecond:
        cssClass = this.HighlightClasses.scaleSecond;
        //"scale-second";
        break;
      case FretAttribute.ScaleThird:
        cssClass = this.HighlightClasses.scaleThird;
        //"scale-third";
        break;
      case FretAttribute.ScaleFourth:
        cssClass = this.HighlightClasses.scaleFourth;
        //"scale-fourth";
        break;
      case FretAttribute.ScaleFifth:
        cssClass = this.HighlightClasses.scaleFifth;
        //"scale-fifth";
        break;
      case FretAttribute.ScaleSixth:
        cssClass = this.HighlightClasses.scaleSixth;
        //"scale-sixth";
        break;
      case FretAttribute.ScaleSeventh:
        cssClass = this.HighlightClasses.scaleSeventh;
        //"scale-seventh";
        break;
      case FretAttribute.NonScale:
        cssClass = this.HighlightClasses.nonScale;
        //"non-scale";
        break;
      case FretAttribute.ChordNote:
        cssClass = this.ChordHighlightClasses.chordNote;
        //"chord-note";
        break;
      case FretAttribute.ChordRoot:
        cssClass = this.ChordHighlightClasses.chordRoot;
        //"chord-root";
        break;
      case FretAttribute.ChordSecond:
        cssClass = this.ChordHighlightClasses.chordSecond;
        //"chord-second";
        break;
      case FretAttribute.ChordThird:
        cssClass = this.ChordHighlightClasses.chordThird;
        //"chord-third";
        break;
      case FretAttribute.ChordFourth:
        cssClass = this.ChordHighlightClasses.ChordFourth;
        //"chord-fourth";
        break;
      case FretAttribute.ChordFifth:
        cssClass = this.ChordHighlightClasses.chordFifth;
        //"chord-fifth";
        break;
      case FretAttribute.ChordSixth:
        cssClass = this.ChordHighlightClasses.ChordSixth;
        //"chord-sixth";
        break;
      case FretAttribute.ChordSeventh:
        cssClass = this.ChordHighlightClasses.chordSeventh;
        //"chord-seventh";
        break;
      default:
        cssClass = "";
    }

    return cssClass;
  },
  FretMarkerClasses: {
    fret: "fret",
    open: "open",
    fret3: "fret-3",
    fret5: "fret-5",
    fret7: "fret-7",
    fret12: "fret-12",
  },
  ChordHighlightClasses: {
    chordNote: "chord-note",
    chordRoot: "chord-root",
    chordSecond: "chord-second",
    chordThird: "chord-third",
    chordFifth: "chord-fifth",
    chordSeventh: "chord-seventh",
    chordHighlight: "scale-chord-highlight",
  },
  HighlightClasses: {
    scale: "scale",
    scaleRoot: "scale-root",
    scaleSecond: "scale-second",
    scaleThird: "scale-third",
    scaleFourth: "scale-fourth",
    scaleFifth: "scale-fifth",
    scaleSixth: "scale-sixth",
    scaleSeventh: "scale-seventh",
    nonScale: "non-scale",
    nonScaleHide: "non-scale-hide",
  },
};
