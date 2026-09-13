export interface RoadmapLink {
  label: string
  url: string
}

export interface RoadmapItem {
  title: string
  description: string
  /** Short aside shown next to the title, e.g. a suggested WPM range. */
  note?: string
  links?: RoadmapLink[]
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
        links: [
          { label: 'CCIO — Constitution Training/Test Module', url: 'https://adventure.charachorder.io/' },
          { label: 'Keybr', url: 'https://www.keybr.com/' },
        ],
      },
      {
        title: 'Practice trigrams',
        note: 'Suggested WPM: 13–27',
        description: 'Move on to common three-letter sequences.',
        links: [
          { label: 'dot i/o', url: 'https://www.iq-eq.io/#/' },
          { label: 'CharaChorder LaunchPad', url: 'https://launchpad.charachorder.com/#/' },
        ],
      },
      {
        title: 'Practice words',
        note: 'Suggested WPM: 20–40',
        description: 'Put it all together with whole-word drills.',
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
