import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function OurExpertise() {
  return (
    <section className="relative overflow-hidden gradient-bg py-20 md:py-32 mt-10">
      {/* Curved Shape Background */}
      {/* <div className="absolute top-0 left-0 w-full h-full pt-28">
        <svg
          className="absolute top-0 left-0 w-full h-auto"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#006CA3"
            d="M0,64L60,74.7C120,85,240,107,360,106.7C480,107,600,85,720,106.7C840,128,960,192,1080,213.3C1200,235,1320,213,1380,202.7L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div> */}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 ">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left max-w-xl"
        >
          <p className="text-black font-semibold mb-4 uppercase tracking-widest font-body">
            Our Expertise
          </p>

          <h1 className="text-6xl font-semibold leading-tight mb-6 font-heading text-black">
            Nurturing Minds. Supporting Families. Healing Together.
          </h1>

          <p className="text-lg text-black leading-relaxed font-body">
            At MindSoul Wellness, we specialize in providing compassionate
            mental health support for children, adolescents, and adults who are
            navigating emotional, behavioral, and psychological challenges.
            Whether it’s early developmental concerns or adult mental health
            struggles, our care is rooted in empathy, trust, and evidence-based
            practices.
          </p>

          <p className="text-lg text-black leading-relaxed font-body">
            We work extensively with children and teens facing emotional or
            developmental difficulties, while also supporting adults dealing
            with stress, anxiety, depression, OCD, trauma, and other
            psychological concerns that impact daily life and relationships.
            <br />
            Our multidisciplinary team of psychologists, therapists, and mental
            health professionals collaborates closely to create personalized
            care plans. Through early intervention, emotional regulation
            strategies, and therapeutic guidance, we help individuals and
            families build resilience, restore balance, and move toward lasting
            emotional well-being.
          </p>
        </motion.div>

        {/* Right Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-shrink-0"
        >
          <div className="relative w-[400px] h-[500px] overflow-hidden shadow-2xl ">
            <LazyLoadImage
              src="/rutambara.jpg" // replace with MindSoul clinician / therapy image
              alt="MindSoul Wellness"
              effect="blur"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
