"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi2";
import Container from "@/components/common/Container";
import SectionHeader from "@/components/common/SectionHeader";

const FAQS = [
  {
    question: "Do you accept dental insurance?",
    answer:
      "Yes, we work with most major dental insurance providers and will verify your benefits before any treatment so you know exactly what's covered.",
  },
  {
    question: "How soon can I get an appointment?",
    answer:
      "Most new patients are seen within the same week. Urgent issues, like sudden pain, are prioritized for same-day or next-day visits.",
  },
  {
    question: "Is teeth whitening safe for sensitive teeth?",
    answer:
      "We offer whitening formulations specifically designed for sensitive teeth, and every treatment plan is adjusted based on your dental history.",
  },
  {
    question: "Do you treat children as well as adults?",
    answer:
      "Yes, our family dentistry program covers every age, from a child's first checkup through adult and senior care.",
  },
  {
    question: "What should I expect at my first visit?",
    answer:
      "Your first visit includes a full exam, digital X-rays if needed, and a conversation about your goals before we recommend any treatment.",
  },
];

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-trigger-${index}`;

  return (
    <div className="glass rounded-2xl">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        >
          <span className="font-display text-base font-medium text-white sm:text-lg">
            {question}
          </span>
          <HiChevronDown
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 text-primary-light transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-24 md:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="FAQ"
          title={<span id="faq-heading">Answers before you ask</span>}
          subtitle="Still have a question? Reach out and our team will get back to you the same day."
        />

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {FAQS.map((faq, index) => (
            <FaqItem key={faq.question} index={index} {...faq} />
          ))}
        </div>
      </Container>
    </section>
  );
}
