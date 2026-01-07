import React from "react";

export default function SarabsriCounsellorPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-28 pb-20">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 mb-8">
            <div className="flex items-start gap-6">
              <img
                src="/sarabsri.jpg"
                alt="Sarabsri"
                className="w-28 h-28 object-cover rounded-xl shadow-md"
              />

              <div>
                <h2 className="text-3xl font-semibold">Sarabsri Kaur</h2>
                <p className="text-gray-500 mt-1">Bengaluru, India</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                  <span>⭐ 4+ Years Experience</span>
                  <span>•</span>
                  <span>Hindi | English | Marathi</span>
                </div>
              </div>
            </div>

            {/* SESSION PLANS */}
            <div className="mt-10">
              <h3 className="text-lg font-semibold mb-4">Session Plans</h3>

              <div className="border rounded-xl p-4 w-60 cursor-pointer hover:shadow transition">
                <p className="font-medium text-purple-600">Intro Session</p>
                <p className="text-gray-700 mt-1">₹3,500</p>
              </div>

              <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition">
                Book Appointment
              </button>
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">About Sarabsri</h3>
              <span className="text-yellow-500 text-xl">★ 4.9</span>
            </div>

            <p className="mt-4 leading-relaxed text-gray-700">
              Sarabsri Kaur is an experienced mindfulness and emotional wellness
              practitioner who supports children and families through emotional,
              behavioral, and developmental challenges. Her approach combines
              mindful awareness, compassion practices, and gentle communication
              tools that empower children to express themselves, regulate
              emotions, and build self-confidence.
            </p>

            <p className="mt-4 leading-relaxed text-gray-700">
              With over two decades of exposure to meditation, contemplative
              practices, and wisdom traditions, she blends ancient mindful
              practices with modern emotional needs, creating a safe, warm, and
              grounding environment for every child and parent she works with.
            </p>

            {/* FOCUS AREAS */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Emotional Behavior",
                  "Child Anxiety",
                  "Communication Skills",
                  "Parent Counseling",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* APPROACH */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2">
                Therapeutic Approach
              </h4>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>Mindfulness-based emotional regulation</li>
                <li>Compassion-focused techniques (CMT)</li>
                <li>Conscious communication for children & parents</li>
                <li>Guided awareness, reflection & story-based learning</li>
                <li>Holistic and non-judgmental emotional support</li>
              </ul>
            </div>

            {/* EXPERIENCE */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2">
                Training & Background
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Sarabsri has learned from international teachers, meditation
                mentors, and global wisdom traditions. Her approach is deeply
                rooted in lived experience, consistent practice, and a
                heart-centered understanding of emotional well-being.
              </p>
            </div>

            {/* WHY PARENTS LOVE */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-2">
                Why Parents Appreciate Her
              </h4>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>Warm, calming presence</li>
                <li>Child-friendly communication</li>
                <li>Emotionally safe therapeutic environment</li>
                <li>Helps parents understand children's emotional needs</li>
                <li>Builds confidence & self-awareness in children</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* FREE CHILD ASSESSMENT */}
          <div className="bg-white shadow-md rounded-xl p-6 border">
            <h3 className="text-lg font-semibold">Free Child Assessment</h3>
            <p className="text-gray-600 mt-1">20‑minute exploration session</p>
            <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl font-semibold transition">
              Book Free Session
            </button>
          </div>

          {/* RECOMMENDED WORKSHOPS */}
          <div className="bg-white shadow-md rounded-xl p-6 border">
            <h3 className="text-lg font-semibold mb-3">
              Recommended Workshops
            </h3>
            <div className="space-y-2">
              <div className="border rounded-lg px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 transition">
                Emotional Strength Building • Online
              </div>
              <div className="border rounded-lg px-3 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 transition">
                Parent‑Child Communication Masterclass
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
