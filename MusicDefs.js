export const NoteLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
export const AllNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
export const Intervals = {
		HalfStep: 1,
		WholeStep: 2,
		MinorThird: 3,
		MajorThird: 4,
		PerfectFourth: 5,
		DiminishedFifth: 6,
		PerfectFifth: 7,
		MinorSixth: 8,
		MajorSixth: 9,
		MinorSeventh: 10,
		MajorSeventh: 11
	};
export var Tunings = {
		Standard: {
			Key: 'Standard',
			Name: 'Standard Tuning',
			Strings: ['E', 'A', 'D', 'G', 'B', 'E']
		},
		OpenDMinor: {
			Key: 'OpenDMinor',
			Name: 'Open D Minor',
			Strings: ['D', 'A', 'D', 'F', 'A', 'D']
		},
		OpenD: {
			Key: 'OpenD',
			Name: 'Open D',
			Strings: ['D', 'A', 'D', 'F#', 'A', 'D']
		},
		DADGAD: {
			Key: 'DADGAD',
			Name: 'DADGAD',
			Strings: ['D', 'A', 'D', 'G', 'A', 'D']
		},
		OpenG: {
			Key: 'OpenG',
			Name: 'Open G',
			Strings: ['D', 'G', 'D', 'G', 'B', 'D']
		},
		OpenA: {
			Key: 'OpenA',
			Name: 'Open A',
			Strings: ['E', 'A', 'C#', 'E', 'A', 'E']
		},
		OpenC: {
			Key: 'OpenC',
			Name: 'Open C',
			Strings: ['C', 'G', 'C', 'G', 'C', 'E']
		},
		OpenE: {
			Key: 'OpenE',
			Name: 'Open E',
			Strings: ['E', 'B', 'E', 'G#', 'B', 'E']
		},
		MandolinStandard: {
			Key: 'MandolinStandard',
			Name: 'Mandolin - Standard',
			Strings: ['G', 'D', 'A', 'E']
		},
		BanjoStandard: {
			Key: 'BanjoStandard',
			Name: 'Banjo - Standard',
			Strings: [{Note: 'G', Start: 6}, 'D', 'G', 'B', 'D']
		},
		BanjoGMinor: {
			Key: 'BanjoGMinor',
			Name: 'Banjo - GMinor',
			Strings: [{Note: 'G', Start: 6}, 'D', 'G', 'Bb', 'D']
		}
	};
export var NashvilleNumbers = [
		{Position: 1, Major: "I", Minor: 'i'},
		{Position: 2, Major: "II", Minor: 'ii'},
		{Position: 3, Major: "III", Minor: 'iii'},
		{Position: 4, Major: "IV", Minor: 'iv'},
		{Position: 5, Major: "V", Minor: 'v'},
		{Position: 6, Major: "VI", Minor: 'vi'},
		{Position: 7, Major: "VII", Minor: 'vii'}
	];
export const ScaleTypes = {
			Major: {
				Key: 'Major',
				Name: 'Major',
				Intervals: [Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.WholeStep]
			},
			Minor: {
				Key: 'Minor',
				Name: 'Minor',
				Intervals: [Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep]
			},
			Dorian: {
				Key: 'Dorian',
				Name: 'Dorian',
				Intervals: [Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep]
			},
			Phrygian: {
				Key: 'Phrygian',
				Name: 'Phrygian',
				Intervals: [Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep]
			},
			Lydian: {
				Key: 'Lydian',
				Name: 'Lydian',
				Intervals: [Intervals.WholeStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep]
			},
			Mixolydian: {
				Key: 'Mixolydian',
				Name: 'Mixolydian',
				Intervals: [Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep]
			},
			Aolian: {
				Key: 'Aolian',
				Name: 'Aolian',
				Intervals: [Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep]
			},
			Locrian: {
				Key: 'Locrian',
				Name: 'Locrian',
				Intervals: [Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep, Intervals.HalfStep, Intervals.WholeStep, Intervals.WholeStep]
			}
		};
		
export var ChordTypes = {
			Major: {
				Name: 'Major',
				NumberOfNotes: 3,
				Display: '',
				Intervals: [Intervals.MajorThird, Intervals.PerfectFifth]
			},
			Minor: {
				Name: 'Minor',
				NumberOfNotes: 3,
				Display: 'min',
				Intervals: [Intervals.MinorThird, Intervals.PerfectFifth]
			},
			Diminished: {
				Name: 'Diminished',
				NumberOfNotes: 3,
				Display: 'dim',
				Intervals: [Intervals.MinorThird, Intervals.DiminishedFifth]
			},
			Seventh: {
				Name: 'Seventh',
				NumberOfNotes: 4,
				Display: '7',
				Intervals: [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]
			},
			MinorSeventh: {
				Name: 'MinorSeventh',
				NumberOfNotes: 4,
				Display: 'm7',
				Intervals: [Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]
			},
			MajorSeventh: {
				Name: 'MajorSeventh',
				NumberOfNotes: 4,
				Display: 'Maj7',
				Intervals: [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSeventh]
			}
		};
			
	
