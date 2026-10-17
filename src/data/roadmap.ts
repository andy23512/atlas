export interface RoadmapLink {
  label: string
  url: string
}

/** One block of the detail panel: an optional heading, then paragraphs and/or bullets. */
export interface RoadmapDetail {
  heading?: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface RoadmapItem {
  title: string
  description: string
  /** Short aside shown next to the title, e.g. a suggested WPM range. */
  note?: string
  links?: RoadmapLink[]
  /** Extra content shown in the side panel; items without it are not clickable. */
  details?: RoadmapDetail[]
}

export interface RoadmapSection {
  title: string
  description: string
  items: RoadmapItem[]
}

export const roadmap: RoadmapSection[] = [
  {
    title: '1. Before You Have a Device',
    description:
      'Get a head start on the layout before your CharaChorder arrives.',
    items: [
      {
        title: 'Memorize the device layout without a device',
        description:
          "Learn key positions as muscle memory before you ever touch the hardware, using flashcards and \"air typing.\"",
        details: [
          {
            paragraphs: [
              'Use the waiting time (shipping, for example) to learn where every key is. The goal is to recall any key position with no visual aid.',
            ],
          },
          {
            heading: 'Flashcards',
            bullets: [
              "Anki deck of the default-layout letter keys. Its Image Occlusion cards hide parts of the official layout image (separate images for CC1/CC2/CCU and Master Forge).",
            ],
          },
          {
            heading: 'Air typing',
            bullets: [
              'Move your fingers in the air, on a table, or on your hand or leg as if typing.',
              'Alnitak\'s air mode advances lessons automatically at a speed you choose.',
              'Alnitak also has an AI-generated layout song to help it stick.',
            ],
          },
        ],
        links: [
          {
            label: 'Anki deck (letter keys, default layout)',
            url: 'https://drive.google.com/drive/folders/1JPRS0mbXw095RJwyFwgCyDRM8DuNusnb?usp=drive_link',
          },
          {
            label: 'Alnitak — Layout song',
            url: 'https://andy23512.github.io/alnitak/layout-song',
          },
        ],
      },
      {
        title: 'Read the official documentation',
        description:
          "Skim the official CharaChorder docs for your device's layout and terminology.",
        links: [{ label: 'CharaChorder Docs', url: 'https://docs.charachorder.com/' }],
      },
    ],
  },
  {
    title: '2. First Guided Tutorial',
    description:
      'Once the device arrives, walk through the basics step by step.',
    items: [
      {
        title: 'Capella',
        description:
          "An unofficial tutorial site that walks through how the hardware works and how to use it, one short chapter at a time.",
        links: [{ label: 'Capella', url: 'https://andy23512.github.io/capella/' }],
      },
    ],
  },
  {
    title: '3. Practice Character Entry',
    description:
      "Build up typing speed one letter at a time, following Tangent's suggested progression.",
    items: [
      {
        title: "Read Tangent's suggestion for character entry",
        description:
          "The full write-up behind this progression: memorizing the layout, then layout, letters, trigrams, and words in turn.",
        links: [
          {
            label: "Blog: Tangent's suggestions for learning character entry",
            url: 'https://andy23512.github.io/blog/tangent-s-suggestions-for-learning-english-character-entry-on-charachorder-3d-input-devices/',
          },
        ],
      },
      {
        title: 'Practice the device layout',
        note: 'Suggested WPM: 0–13',
        description: 'Get comfortable finding every key without looking.',
        details: [
          {
            paragraphs: [
              'Become familiar with key positions until you no longer need visual guides. The devices have no key labels, so touch typing is essential.',
            ],
          },
          {
            heading: 'Goals',
            bullets: [
              '13 WPM on dot i/o Letters or LaunchPad Alphabetic.',
              '100 combos and 100 CPM on Alnitak non-review lessons.',
              'All letters green on Keybr (set the target speed to 15).',
              '13 WPM on the Monkeytype English set.',
            ],
          },
          {
            heading: 'Tips',
            bullets: [
              'In dot i/o, choose "CharaChorder One" under "Show Device" to see the guide. dot i/o and LaunchPad only preview CC1/CCL, but CC2/CCU share the same default layout, so they still work.',
              'Alnitak fades its guide after 20 combos and brings it back after a mistake, so you cannot just follow the guide.',
              'Keybr and Monkeytype have no built-in layout display, but their CC extensions (Keybr CC Extension, Monkeytype CC Extension) can show the layout for you.',
              'In Keybr, use Guided lessons for letters, Source code for symbols, and Numbers for digits.',
              'Monkeytype\'s default English set has only one "j" word and none with q, x, or z; use another set or custom words for those letters.',
            ],
          },
        ],
        links: [
          { label: 'dot i/o', url: 'https://www.iq-eq.io/#/' },
          { label: 'CharaChorder LaunchPad', url: 'https://launchpad.charachorder.com/#/' },
          { label: 'Alnitak', url: 'https://andy23512.github.io/alnitak/' },
          { label: 'Keybr', url: 'https://www.keybr.com/' },
          {
            label: 'Keybr CC Extension (Chrome)',
            url: 'https://chromewebstore.google.com/detail/keybr-cc-extension/fdofhfbipdhkkhhdjlfjnjfnkibpbdpg',
          },
          {
            label: 'Keybr CC Extension (Firefox)',
            url: 'https://addons.mozilla.org/en-US/firefox/addon/keybr-cc-extension/',
          },
          { label: 'Monkeytype', url: 'https://monkeytype.com/' },
          {
            label: 'Monkeytype CC Extension (Chrome)',
            url: 'https://chromewebstore.google.com/detail/monkeytype-cc-extension/mhfjhmegecimjbohhdbflkhdfnaadple',
          },
          {
            label: 'Monkeytype CC Extension (Firefox)',
            url: 'https://addons.mozilla.org/en-US/firefox/addon/monkeytype-cc-extension/',
          },
        ],
      },
      {
        title: 'Practice letters in depth',
        note: 'Suggested WPM: 13–30',
        description: 'Drill individual letters until they stop feeling deliberate.',
        details: [
          {
            paragraphs: ['Build muscle memory for letters, this time without the visual guide.'],
          },
          {
            heading: 'Goals',
            bullets: [
              'S or S+ rank in the Novice class of the CCIO Constitution Test.',
              'All letters green on Keybr Guided Lessons, with the target speed set to 30.',
            ],
          },
          {
            heading: 'Tips',
            bullets: [
              "Start CCIO only after you have learned the layout; its reference doesn't show the current key position.",
              "Keybr's default target is 35 WPM, which can take weeks to unlock the 7th letter and months to finish all of them. Start lower if needed and raise it gradually to 30.",
            ],
          },
        ],
        links: [
          { label: 'CCIO — Constitution Training/Test Module', url: 'https://adventure.charachorder.io/' },
          { label: 'Keybr', url: 'https://www.keybr.com/' },
        ],
      },
      {
        title: 'Practice trigrams',
        note: 'Suggested WPM: 13–27',
        description: 'Move on to common three-letter sequences.',
        details: [
          {
            paragraphs: [
              'Drill common letter groupings. Many words contain these trigrams, so this speeds up your typing in general.',
            ],
          },
          {
            heading: 'Goal',
            bullets: ['27 WPM on the dot i/o Trigram tier and the LaunchPad Amalgamate tier.'],
          },
        ],
        links: [
          { label: 'dot i/o', url: 'https://www.iq-eq.io/#/' },
          { label: 'CharaChorder LaunchPad', url: 'https://launchpad.charachorder.com/#/' },
        ],
      },
      {
        title: 'Practice words',
        note: 'Suggested WPM: 20–40',
        description: 'Put it all together with whole-word drills.',
        details: [
          {
            paragraphs: ['Practice common whole words, putting everything together.'],
          },
          {
            heading: 'Goals',
            bullets: [
              'S or S+ in the Medium class of the CCIO Dexterity Test.',
              '40 WPM on the dot i/o Words tier and the LaunchPad Lexical tier.',
              '40 WPM on the Monkeytype English set.',
            ],
          },
          {
            heading: 'Then use it for real',
            paragraphs: [
              'From about 20 WPM you can start using the device for your own tasks. Begin with small ones, like short articles or small programs, and expect to find keys or settings you want to change.',
            ],
          },
        ],
        links: [
          { label: 'CCIO — Dexterity Module', url: 'https://adventure.charachorder.io/' },
          { label: 'dot i/o', url: 'https://www.iq-eq.io/#/' },
          { label: 'CharaChorder LaunchPad', url: 'https://launchpad.charachorder.com/#/' },
          { label: 'Monkeytype', url: 'https://monkeytype.com/' },
        ],
      },
    ],
  },
  {
    title: '4. Practice Chorded Entry',
    description:
      'Move from single characters to full chords, following the CHARA cycle.',
    items: [
      {
        title: "Read Tangent's suggestion for chorded entry",
        description:
          'The full write-up behind the CHARA cycle (Adapt, Realize, Accumulate) that Chara is built around.',
        details: [
          {
            paragraphs: [
              'Chording means pressing several keys at once to output a word or phrase. A good time to start is around 40 WPM in character entry, or earlier if you want to chord everything and already know your key positions.',
            ],
          },
          {
            heading: 'Set goals first',
            bullets: [
              'Speed goals (such as 60/100/150/250 WPM on Monkeytype) call for broad coverage of a word set and speed-focused drills.',
              'Niche goals (hard words from your own work) call for a custom library and more casual practice.',
            ],
          },
          {
            heading: 'Building your chord library',
            bullets: [
              'Diatonic: take the input keys from the output word (a+n+o for "annotation"). Easier to recall, but conflicts pile up as the library grows.',
              'Chromatic: the input is unrelated to the output. No conflicts, but muscle memory takes longer.',
              'Assign frequent words first so they get the short, good inputs, and try diatonic first, then add unrelated keys if needed.',
              'Keep chords you have already mastered; give the new chord a different input when conflicts arise.',
            ],
          },
        ],
        links: [
          {
            label: "Blog: Tangent's suggestion for learning chorded entry",
            url: 'https://andy23512.github.io/blog/tangent-s-suggestion-for-learning-english-chorded-entry-on-charachorder-devices/',
          },
        ],
      },
      {
        title: 'Chara',
        description:
          'An unofficial chord practice tool built around the CHARA cycle, tracking your chord library through Adapt, Realize, and Accumulate phases.',
        details: [
          {
            paragraphs: [
              'Learn in small batches, because the number of chords is large and keeps growing. CHARA stands for CHoose CHords, Adapt, Realize, Accumulate.',
            ],
          },
          {
            heading: 'CH: Choose chords',
            bullets: [
              'Pick a batch of 3–5 chords, starting with the most frequent words in your library.',
              "Frequency references: Google's top 20k English words and Monkeytype's top 1k English list.",
            ],
          },
          {
            heading: 'A: Adapt (target 30 ChPM)',
            bullets: [
              "Keep a guide showing each chord's input and output (sticky notes or a trainer with a visual guide).",
              'Focus on correct execution and getting comfortable with the finger motions.',
            ],
          },
          {
            heading: 'R: Realize (target 50 ChPM)',
            bullets: [
              'Keep the guide within reach, but peek only when you truly forget.',
              'Focus on tying the word to the finger movement.',
            ],
          },
          {
            heading: 'A: Accumulate (target 60 ChPM or more)',
            bullets: [
              'The final stage every learned chord reaches; run it after roughly 15+ newly realized chords.',
              'Practice all learned chords together, plan the next 1–2 actions, and link chords smoothly.',
              'Collect the weaker chords for focused drills.',
            ],
          },
        ],
        links: [{ label: 'Chara', url: 'https://andy23512.github.io/chara/' }],
      },
    ],
  },
  {
    title: '5. Other Tools',
    description: "Extra unofficial tools worth knowing about once you're up and running.",
    items: [
      {
        title: 'Mira',
        description:
          'An unofficial explorer for the percentile learning curves of CharaChorder devices.',
        links: [{ label: 'Mira', url: 'https://andy23512.github.io/mira/' }],
      },
      {
        title: 'Sirius',
        description:
          'An unofficial cross-platform desktop layout viewer and key tester that lights up the keys you press in real time.',
        links: [{ label: 'Sirius (download)', url: 'https://github.com/andy23512/sirius/releases' }],
      },
      {
        title: 'Alnasl',
        description: 'An unofficial practice tool for the built-in mouse of CharaChorder 3D input devices.',
        links: [{ label: 'Alnasl', url: 'https://andy23512.github.io/alnasl/' }],
      },
      {
        title: 'Arcturus',
        description:
          "An unofficial \"Your Life in Weeks\" style chart highlighting how much of your life you've spent typing with a CharaChorder.",
        links: [{ label: 'Arcturus', url: 'https://andy23512.github.io/arcturus/' }],
      },
    ],
  },
]
