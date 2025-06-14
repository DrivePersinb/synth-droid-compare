import { ProductDetails } from '@/types/ProductDetails';

export const instrument1000001: ProductDetails = {
  specifications: [
    {
      name: "General",
      specs: {
        "Keys": 61,
        "Key Type": "Semi-weighted",
        "Polyphony": 256,
        "Multitimbrality": "16 parts",
        "Preset Sounds": 3000
      }
    },
    {
      name: "Sound Engine",
      specs: {
        "Technology": "ZEN-Core, Analog Behavior Modeling",
        "Waveforms": "Over 100 waveforms",
        "Filters": "Vintage analog modeling",
        "Effects": "Over 90 types",
        "Arpeggiator": true
      }
    },
    {
      name: "Sequencer",
      specs: {
        "Tracks": 16,
        "Pattern Length": "Up to 32 steps",
        "Song Mode": true,
        "Real-time Recording": true
      }
    },
    {
      name: "Interface",
      specs: {
        "Display": "4.3-inch color LCD",
        "Knobs": 5,
        "Sliders": 4,
        "Buttons": "Multiple function buttons"
      }
    },
    {
      name: "Connectivity",
      specs: {
        "Audio Outputs": "L/MONO, R (1/4 inch)",
        "Headphone Output": "1/4 inch stereo",
        "MIDI": "In, Out, Thru (5-pin DIN)",
        "USB": "Type-A, Type-B",
        "Pedal Inputs": "Damper, Expression"
      }
    },
    {
      name: "Physical",
      specs: {
        "Dimensions": "101.7 x 30.6 x 9.9 cm",
        "Weight": "7.2 kg",
        "Power": "AC adapter or USB bus power"
      }
    }
  ],
  faq: [
    {
      question: "Can I expand the sound library?",
      answer: "Yes, the Jupiter-X supports Model Expansions and Wave Expansions that can be purchased separately to add new sounds and capabilities."
    },
    {
      question: "Is the Jupiter-X compatible with vintage Jupiter sounds?",
      answer: "Absolutely! The Jupiter-X includes authentic recreations of classic Jupiter-8 and Jupiter-4 sounds using Roland's Analog Behavior Modeling technology."
    },
    {
      question: "Can I use it as a MIDI controller?",
      answer: "Yes, the Jupiter-X can function as a sophisticated MIDI controller with its keys, knobs, sliders, and other controls."
    },
    {
      question: "Does it work with my DAW?",
      answer: "Yes, the Jupiter-X integrates seamlessly with all major DAWs via USB MIDI and audio connectivity."
    },
    {
      question: "How many sounds can I layer at once?",
      answer: "You can layer up to 5 tones per part, and with 16 parts available, you can create very complex layered sounds."
    }
  ],
  buyLinks: [
    { store: "Amazon", url: "https://amazon.in/roland-jupiter-x" },
    { store: "Flipkart", url: "https://flipkart.com/roland-jupiter-x" }
  ]
};
