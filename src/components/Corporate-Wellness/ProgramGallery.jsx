import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const galleryImages = [
  "/gallery/gallery-1.jpeg",
  "/gallery/gallery-2.jpeg",
  "/gallery/gallery-3.jpeg",
  "/gallery/gallery-4.jpeg",
  "/gallery/gallery-5.jpeg",
  "/gallery/gallery-6.jpeg",
];

export function ProgramGallery() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-indigo-50">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
        className="max-w-7xl mx-auto"
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-heading">
            Program Highlights
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-body text-lg">
            A glimpse into our experiential workshops, expressive arts sessions,
            and team engagement programs.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group"
              onClick={() => setActiveImage(img)}
            >
              <img
                src={img}
                alt="Corporate wellness program"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-white text-lg font-semibold">View Moment</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-10 right-0 text-white"
              >
                <X size={32} />
              </button>

              <img
                src={activeImage}
                alt="Program preview"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
