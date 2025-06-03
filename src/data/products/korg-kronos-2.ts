
export interface BuyLink {
  retailer: string;
  url: string;
  price?: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SpecificationCategory {
  name: string;
  specs: Record<string, any>;
}

export interface ProductDetails {
  specifications: SpecificationCategory[];
  buyLinks: BuyLink[];
  faq: FAQ[];
}

export const korgKronos2: ProductDetails = {
  specifications: [
    {
      name: "Sound Engine",
      specs: {
        "Sound Generation": "9 Sound Engines (SGX-2, EP-1, CX-3, STR-1, AL-1, MOD-7, MS-20EX, PolysixEX, MonopolyEX)",
        "Max Polyphony": "140 voices",
        "Oscillators": "Multiple types per engine",
        "Filter Types": "Multi-mode filters per engine",
        "Effects": "Insert, Master, Total effects"
      }
    },
    {
      name: "Keyboard & Controls",
      specs: {
        "Keys": "88 weighted keys",
        "Key Type": "Natural Weighted Hammer Action",
        "Aftertouch": "Channel aftertouch",
        "Velocity": "4 curves + fixed",
        "Controls": "TouchView display, joystick, ribbon controller"
      }
    },
    {
      name: "Memory & Storage",
      specs: {
        "Programs": "1,664 programs",
        "Combinations": "1,536 combinations",
        "Set Lists": "128 set lists",
        "Internal Memory": "62 GB SSD",
        "Sampling Memory": "Up to 62 GB",
        "Sample Formats": "AIFF, WAV, SoundFont 2.0"
      }
    },
    {
      name: "Sequencer",
      specs: {
        "Tracks": "16 MIDI tracks + 16 audio tracks",
        "Recording": "Realtime/Step recording",
        "Tempo Range": "40-300 BPM",
        "Resolution": "480 ticks per quarter note",
        "Pattern Length": "Up to 256 measures"
      }
    },
    {
      name: "Audio Features",
      specs: {
        "Sampling": "48 kHz/16-bit, 24-bit",
        "Audio Tracks": "16 audio tracks",
        "Audio Inputs": "2 analog inputs",
        "USB Audio": "44.1/48/88.2/96 kHz",
        "Audio Outputs": "L/Mono, R, Individual 1-4"
      }
    },
    {
      name: "Connectivity",
      specs: {
        "MIDI": "In, Out, Thru",
        "USB": "USB-B (MIDI/Audio), USB-A (storage)",
        "Audio I/O": "1/4\" TRS outputs, 1/4\" TRS inputs",
        "Headphones": "1/4\" stereo output",
        "Pedals": "Damper, switch, expression pedal inputs"
      }
    },
    {
      name: "Physical",
      specs: {
        "Dimensions": "1,421 × 406 × 147 mm",
        "Weight": "22 kg",
        "Display": "8-inch TouchView color display",
        "Power": "AC adapter included",
        "Finish": "Black"
      }
    }
  ],
  buyLinks: [
    {
      retailer: "Sweetwater",
      url: "https://www.sweetwater.com/store/detail/Kronos288",
      price: 329999
    },
    {
      retailer: "Guitar Center",
      url: "https://www.guitarcenter.com/Korg/Kronos-88-Key-Music-Workstation.gc",
      price: 329999
    },
    {
      retailer: "Sam Ash",
      url: "https://www.samash.com/korg-kronos-88-key-workstation",
      price: 329999
    }
  ],
  faq: [
    {
      question: "What makes the Kronos 2 different from the original Kronos?",
      answer: "The Kronos 2 features updated sound engines, increased polyphony, more internal storage (62GB SSD), improved operating system, and enhanced TouchView display functionality."
    },
    {
      question: "Can I expand the sample memory?",
      answer: "The Kronos 2 comes with 62GB of internal SSD storage for samples. You can also use external USB storage devices for additional sample libraries and data."
    },
    {
      question: "Does it support external audio recording?",
      answer: "Yes, the Kronos 2 has 2 analog audio inputs and can record up to 16 audio tracks simultaneously in its built-in sequencer."
    },
    {
      question: "What sound engines are included?",
      answer: "The Kronos 2 includes 9 sound engines: SGX-2 (sample playback), EP-1 (electric pianos), CX-3 (tonewheel organ), STR-1 (physical modeling), AL-1 (analog modeling), MOD-7 (FM synthesis), and vintage Korg recreations (MS-20EX, PolysixEX, MonopolyEX)."
    },
    {
      question: "Is it suitable for live performance?",
      answer: "Absolutely! The Kronos 2 features Set List mode for organizing sounds for live performance, smooth sound transitions, and a rugged build quality designed for touring musicians."
    },
    {
      question: "Can I use it as an audio interface?",
      answer: "Yes, the Kronos 2 can function as a USB audio interface with support for multiple sample rates (44.1/48/88.2/96 kHz) and multiple audio outputs."
    }
  ]
};
