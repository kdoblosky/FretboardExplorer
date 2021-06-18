var urlParams = new URLSearchParams(window.location.search);

export var tuning = urlParams.get("tuning");
export var scale = urlParams.get("scale");
export var scaleType = urlParams.get("scale-type");
export var capo = urlParams.get("capo");

export function SetTuning(Tuning) {
  tuning = Tuning;
}

export function SetScale(Scale) {
  scale = Scale;
}

export function SetScaleType(ScaleType) {
  scaleType = ScaleType;
}

export function SetCapo(Capo) {
  capo = Capo;
}

export function SetQueryString() {
  if (history.pushState) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?tuning=" +
      this.tuning +
      "&scale=" +
      this.scale +
      "&scale-type=" +
      this.scaleType +
      "&capo=" +
      this.capo;
    window.history.pushState({ path: newurl }, "", newurl);

    var title = "Fretboard Explorer " + this.tuning + " " + this.scale + " " + this.scaleType;
    if (this.capo && this.capo != 0) {
      title += " Capo " + this.capo;
    }
    window.document.title = title;
  }
}
