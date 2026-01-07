import { motion } from "framer-motion";
import {
  Brain,
  Users,
  Building2,
  Sparkles,
  HeartHandshake,
  Palette,
} from "lucide-react";
import { ProgramGallery } from "../components/Corporate-Wellness/ProgramGallery";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

export default function CorporateWellness() {
  return (
    <div className="text-gray-800 overflow-hidden mt-30">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-primary via-accent to-[#5d799d] text-white">
        <div className="absolute inset-0 bg-black/20" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.9 }}
          className="relative max-w-7xl mx-auto px-6 py-28 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Corporate Wellness &
            <span className="block text-textDark">
              Human Development Training
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Building emotionally intelligent, resilient & high-performing teams
          </p>

          {/* <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="inline-block mt-10 bg-white text-textDark px-8 py-4 rounded-full font-semibold shadow-xl"
          >
            Explore Programs
          </motion.a> */}
        </motion.div>
      </section>

      {/* FACILITATORS */}
      <section className="py-20 px-6 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold text-center mb-16 font-heading"
          >
            Meet the Facilitators
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                img: "/counselors/1.png",
                name: "Rutambara Dhotre",
                desc: "UNESCO Certified Arts Therapist, Clinical Counsellor & Psychologist with 5+ years experience",
              },
              {
                img: "/counselors/2.png",
                name: "Ridhi Sachdeva",
                desc: "Psychologist & Therapist with 3+ years across corporates, hospitals & academia",
              },
            ].map((person, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="backdrop-blur-xl bg-white/70 border border-white rounded-2xl p-8 shadow-lg"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="h-auto w-full"
                />
                <h3 className="text-2xl font-semibold mb-3 mt-6 font-body">
                  {person.name}
                </h3>
                <p className="text-gray-600 font-body text-lg">{person.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* VISION */}
      {/* <section className="py-24 px-6 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto text-center"
        >
          <Sparkles className="mx-auto mb-6 text-indigo-600" size={40} />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-lg text-gray-600">
            To build emotionally intelligent and connected workplaces where
            people perform with purpose, creativity, and compassion.
          </p>
        </motion.div>
      </section> */}

      {/* FRAMEWORK */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary to-accent text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold text-center mb-16 font-heading text-textDark"
          >
            Our Training Framework
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Brain,
                title: "Self Level",
                focus: "Emotional Regulation",
                outcome: "Self-aware individuals who respond, not react.",
              },
              {
                icon: Users,
                title: "Interpersonal Level",
                focus: "Communication & Connection",
                outcome: "Stronger collaboration & authentic dialogue.",
              },
              {
                icon: Building2,
                title: "Workplace Level",
                focus: "Culture & Wellbeing",
                outcome: "Empathetic, high-performing organizations.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <item.icon className="text-primary mb-4" size={36} />
                <h3 className="text-xl font-semibold mb-1 font-body text-gray-800">
                  {item.title}
                </h3>
                <p className="text-black font-md mb-2 font-body">
                  {item.focus}
                </p>
                <p className="text-gray-600 font-body">{item.outcome}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MODULES */}
      <section className="py-24 px-6 bg-gray-50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-6xl font-bold text-center mb-16 font-heading"
          >
            Signature Workshops
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Confidence & Connection",
              "Leadership through EI",
              "Recharge & Reconnect",
              "Creative Mindset Lab",
            ].map((module, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <Palette className="mx-auto mb-4 text-primary" />
                <h4 className="font-semibold text-lg font-body">{module}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <ProgramGallery />

      {/* CTA */}
      <section
        id="contact"
        className="py-24 px-6 bg-gradient-to-r from-primary to-accent text-white"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto text-center"
        >
          <HeartHandshake className="mx-auto mb-6" size={40} />
          <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading text-textDark">
            Let’s Build Emotionally Intelligent Teams
          </h2>
          <p className="mb-8 text-black text-lg">
            📧 rutambara123@gmail.com | thepillowtalkswithrs@gmail.com <br />
            📞 +91 8698668886
          </p>

          <motion.a
            whileHover={{ scale: 1.08 }}
            href="mailto:rutambara123@gmail.com"
            className="inline-block bg-white text-textDark px-10 py-4 rounded-full font-semibold shadow-xl text-lg"
          >
            Start the Conversation
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
