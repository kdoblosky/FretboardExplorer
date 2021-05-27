# FretboardExplorer
By Kevin McCalix

## Intro
This is a tool to explore fretboards. For now, it has a number of guitar tunings, a few banjo tunings, and a standard mandolin tuning. I plan on expanding this, so if there is an instrument / tuning you'd find useful, let me know, and I can add it.

You can select a tuning and a scale, and show the notes in the scale. It also shows the chords (both triads and 7ths) contained within the scale. You can optionally highlight the frets containing notes within the selected chord.

This is NOT a database of common chord voicings. When you select a chord, it will highlight all frets on all strings that contain notes from that chord. The objective is to help me (and hopefully others) understand the full fretboard better.

## Why?
There are plenty of tools online that do similar things, but almost all of them are on pages with tons of ads. None worked quite the way I wanted, so I decided to make my own.

## Design considerations
* Written in HTML / CSS / Javascript. For now, there is no backend; everything runs in the browser.
* No frameworks, nor external dependencies. This is written in pure HTML / Javascript / CSS. I did wind up using [Jest](https://jestjs.io/) for unit testing, but the user-facing code has absolutely no dependencies. There are a few reasons for this:
    * The challenge of it.
    * I wanted to understand all the code involved.
    * Loading speed - no need for users to download anything other than this code.
    * Avoid issues like [left-pad](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/).
* Open source. This project is licensed under a GPLv3 license.
* Store no cookies, unless explicitly requested.
* No ads. In the unlikely event this ever gets popular enough that the web hosting charges start adding up, I may add links to PayPal / Patreon / whatever, but will never host ads on this page.

## Future plans
* Improve CSS / HTML to make it look better.
* Add additional stock tunings.
* Add ability to define custom tuning.
* Add additional chord types.
* Add ability to define custom chord, and have it highlighted. 
* Add ability to create / store specific chord / note voicings.
* Add ability to create sequences of specific chords / note voicings, and display changes between them over time. Maybe parse tablature for this?