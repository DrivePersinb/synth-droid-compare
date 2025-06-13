
import { ProductDetails } from '../products/roland-jupiter-x';

export const instrument2000001: ProductDetails = {
  specifications: [
    {
      name: "General",
      specs: {
        "Keys": 88,
        "Key Type": "Graded Hammer Action",
        "Polyphony": 128,
        "Multitimbrality": "16 parts",
        "Preset Sounds": 5500
      }
    },
    {
      name: "Sound Engine",
      specs: {
        "Technology": "AWM2 + FM-X",
        "AWM2 Waveforms": "5.67 GB",
        "FM-X Operators": 8,
        "Filters": "18 types",
        "Effects": "Over 60 types"
      }
    },
    {
      name: "Motion Control",
      specs: {
        "Super Knob": true,
        "Motion Sequences": true,
        "Envelope Follower": true,
        "Assignable Knobs": 8
      }
    },
    {
      name: "Interface",
      specs: {
        "Display": "7-inch color touch screen",
        "Knobs": 8,
        "Sliders": 8,
        "Ribbon Controller": 2
      }
    },
    {
      name: "Connectivity",
      specs: {
        "Audio Outputs": "L/MONO, R, A/D Input L/R",
        "Digital Output": "Optical",
        "MIDI": "In, Out, Thru",
        "USB": "To Host, To Device",
        "Ethernet": true
      }
    },
    {
      name: "Physical",
      specs: {
        "Dimensions": "150.2 x 40.7 x 16.9 cm",
        "Weight": "32 kg",
        "Power": "45W"
      }
    }
  ],
  faq: [
    {
      question: "What makes the Motion Control special?",
      answer: "Motion Control allows you to control multiple parameters simultaneously using the Super Knob, creating dynamic, evolving sounds that respond to your performance."
    },
    {
      question: "Can I import my own samples?",
      answer: "Yes, the MONTAGE supports user sampling and can import WAV files for use in the AWM2 sound engine."
    },
    {
      question: "Is it suitable for live performance?",
      answer: "Absolutely! The MONTAGE is designed for live performance with instant recall, seamless sound switching, and robust construction."
    },
    {
      question: "How does the FM-X engine compare to DX7?",
      answer: "FM-X is an advanced evolution of FM synthesis, offering 8 operators (vs DX7's 6) and modern features while maintaining the classic FM character."
    }
  ],
  buyLinks: [
    { store: "Amazon", url: "https://amazon.in/yamaha-montage-8" },
    { store: "Flipkart", url: "https://flipkart.com/yamaha-montage-8" }
  ]
};
