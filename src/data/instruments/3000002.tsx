
import { ProductDetails } from '@/types/ProductDetails';

export const instrument3000002: ProductDetails = {
  specifications: [
    {
      name: "General",
      specs: {
        "Keys": 73,
        "Key Type": "Natural Touch Semi-Weighted",
        "Polyphony": 120,
        "Multitimbrality": "16 timbers",
        "Preset Sounds": 1000
      }
    },
    {
      name: "Sound Engine",
      specs: {
        "Technology": "HD-1, EDS-X, SGX-2",
        "Sampling": "120-voice polyphonic",
        "Effects": "12 Insert + 2 Master + 1 Total",
        "Arpeggiator": true
      }
    },
    {
      name: "Sequencer",
      specs: {
        "Tracks": 16,
        "Songs": 200,
        "Patterns": 671,
        "Recording": "Real-time/Step"
      }
    },
    {
      name: "Interface",
      specs: {
        "Display": "TouchView color display",
        "Knobs": 4,
        "Sliders": 9
      }
    },
    {
      name: "Connectivity",
      specs: {
        "Audio Outputs": "L/MONO, R, Headphones",
        "MIDI": "In, Out, Thru",
        "USB": "To Host, To Device",
        "SD Card": "SDHC compatible"
      }
    },
    {
      name: "Physical",
      specs: {
        "Dimensions": "132.6 x 36.7 x 12.4 cm",
        "Weight": "18.5 kg",
        "Power": "30W"
      }
    }
  ],
  faq: [
    {
      question: "What makes Kronos special?",
      answer: "Kronos combines 9 different sound engines in one instrument, including HD-1 piano sampling, analog modeling, and FM synthesis."
    },
    {
      question: "Can I expand the sounds?",
      answer: "Yes, Kronos supports EXs (expansion libraries) and KSC (Kronos Sound Collections) for additional sounds and instruments."
    },
    {
      question: "Is it good for live performance?",
      answer: "Absolutely! Kronos is designed for live use with Set Lists, smooth sound transitions, and dedicated performance controls."
    },
    {
      question: "Can I sample with it?",
      answer: "Yes, Kronos has extensive sampling capabilities with the Open Sampling System, allowing you to record and manipulate audio."
    }
  ],
  buyLinks: [
    { store: "Amazon", url: "https://amazon.in/korg-kronos-2" },
    { store: "Flipkart", url: "https://flipkart.com/korg-kronos-2" }
  ]
};
