import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ } from '@/types/ProductDetails';

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left bg-gray-800/50 hover:bg-gray-800/70 transition-colors flex justify-between items-center"
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-primary" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-700">
                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
