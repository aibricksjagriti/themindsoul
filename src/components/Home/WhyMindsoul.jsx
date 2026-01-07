import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const data = [
  {
    title: "Personalized Mindfulness",
    desc: "Every mind is unique — our programs are personalized to your emotional and mental wellness goals using science-backed mindfulness techniques.",
  },
  {
    title: "Expert-Led Sessions",
    desc: "Our certified wellness coaches, therapists, and meditation experts bring years of experience in emotional balance, stress relief, and personal growth.",
  },
  {
    title: "Seamless Digital Experience",
    desc: "Attend live sessions or practice at your own pace with guided audio, video, and journaling tools — all accessible from any device, anytime.",
  },
  {
    title: "Real Progress Tracking",
    desc: "MindSoul helps you track your mental health journey with mood insights, progress reports, and personalized feedback designed to help you grow.",
  },
  {
    title: "Holistic Healing Approach",
    desc: "We blend mindfulness, psychology, and emotional intelligence to help you nurture both your mind and soul — creating balance from within.",
  },
];

export default function WhyMindsoul() {
  return (
    <section className="py-16 px-6 sm:px-12 md:px-20 lg:px-32">
      <h4 className="text-primary font-semibold tracking-wider text-sm uppercase mb-2 font-body">
        Why MindSoul
      </h4>
      <h2 className="text-[#1E1B4B] text-3xl sm:text-4xl md:text-5xl font-bold mb-10 leading-tight font-heading">
        What makes MindSoul different
      </h2>

      <div className="space-y-10">
        {data.map((item, index) => (
          <FadeInSection key={index} title={item.title} desc={item.desc} />
        ))}
      </div>
    </section>
  );
}

function FadeInSection({ title, desc }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-gray-300 pt-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <h3 className="text-[#1E1B4B] text-2xl  font-semibold font-body">
          {title}
        </h3>
        <p className="text-gray-700 md:col-span-2 leading-relaxed font-body text-base sm:text-lg">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
