import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What issues/challenges do you address?",
    answer:
      "We address a wide range of challenges including anxiety, depression, behavioral issues, ADHD, and more. Our approach is evidence-based and family-centered.",
  },
  {
    question: "How much do services cost?",
    answer:
      "Costs vary depending on the type and duration of service. We offer transparent pricing and flexible payment options to make care accessible.",
  },
  // {
  //   question: "Do you accept insurance?",
  //   answer:
  //     "Yes, we accept several major insurance providers and offer assistance with insurance claims for others.",
  // },
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule an appointment directly through our website or contact our support team for personalized assistance.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className=" py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-semibold text-[#072B40] font-heading"
        >
          FAQs
        </motion.h2>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="border-b border-gray-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
            >
              <span className="font-semibold text-lg text-[#072B40] font-body">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-[#072B40]" />
              </motion.span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden pb-4"
                >
                  <p className="text-gray-700 leading-relaxed font-body">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* See More Button */}
      {/* <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="flex justify-center mt-10"
      >
        <button className="bg-[#072B40] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#0b3a57] transition-colors duration-300 shadow-md">
          See more
        </button>
      </motion.div> */}
    </section>
  );
}
