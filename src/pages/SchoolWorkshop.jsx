import React from "react";

const SectionTitle = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    <h2 className="text-5xl  font-bold text-gray-800 font-heading">{title}</h2>
    {subtitle && (
      <p className="mt-3 text-gray-600 max-w-2xl mx-auto font-body text-lg font-semibold">
        {subtitle}
      </p>
    )}
  </div>
);

const WorkshopCard = ({ title, items }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
    <h3 className="text-xl font-semibold text-primary mb-4">{title}</h3>
    <ul className="space-y-2 text-gray-600 text-md leading-relaxed">
      {items.map((item, index) => (
        <li key={index} className="flex gap-2">
          <span className="text-primary">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function SchoolWorkshop() {
  return (
    <div className="bg-gray-50 mt-30">
      {/* HERO */}
      <section className="bg-gradient-to-r from-primary to-blue-100 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-800 font-heading">
            School & Corporate Wellness Workshops
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto font-body text-xl">
            Age-appropriate emotional wellness programs designed to nurture
            confidence, resilience, empathy, and mental well-being.
          </p>
        </div>
      </section>

      {/* PRIMARY SCHOOL */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <SectionTitle
          title="Primary School Workshops"
          subtitle="Classes 1–5 | Ages 6–10"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WorkshopCard
            title="Emotional Regulation through Stories & Art"
            items={[
              "Understanding basic emotions (Happy, Sad, Angry, Scared)",
              "Using drawing, movement, and playful expression to feel calmer",
              "Creating personalized emotion tools (like feeling cards or mood charts)",
            ]}
          />
          <WorkshopCard
            title="Kindness, Manners & Social Behavior"
            items={[
              "The magic of “Thank You” & “Sorry” in friendships",
              "How to say “No” politely – developing healthy boundaries",
              "Practicing small everyday acts of kindness and inclusion",
            ]}
          />
          <WorkshopCard
            title="Knowing My Space: Personal Boundaries for Kids"
            items={[
              "Understanding personal space (mine vs. others’)",
              "Good touch, Bad touch",
              "How to speak up if something feels uncomfortable",
              "Encouraging respect for one’s own body and others’ comfort",
            ]}
          />
        </div>
      </section>

      {/* MIDDLE SCHOOL */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Middle School Workshops"
            subtitle="Classes 6–8 | Ages 11–13"
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <WorkshopCard
              title="Emotions, Confidence & Self-Awareness"
              items={[
                "Identifying emotions and their signals",
                "How emotions influence thoughts and actions",
                "Building positive self-talk and self-esteem",
                "Dealing with low days and self-doubt",
                "Staying motivated through mini-goals and affirmations",
              ]}
            />
            <WorkshopCard
              title="Anger, Stress & Self-Regulation"
              items={[
                "Understanding triggers and body responses",
                "Dealing with frustration and outbursts",
                "Quick calming tools (movement, breath, sensory breaks)",
                "Turning pressure into action",
              ]}
            />
            <WorkshopCard
              title="Peer Pressure, Bullying & Assertiveness"
              items={[
                "Why we change to “fit in”",
                "Recognizing subtle bullying and group dynamics",
                "Assertive communication vs. aggression",
                "Basics of empathy and social responsibility",
              ]}
            />
            <WorkshopCard
              title="Friendship & Social Boundaries"
              items={[
                "Defining healthy vs. unhealthy interactions",
                "Setting boundaries and saying “no” kindly and firmly",
                "Seeking adult support when needed",
                "Basic consent and personal space",
              ]}
            />
          </div>
        </div>
      </section>

      {/* SENIOR SCHOOL */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <SectionTitle
          title="Senior School Workshops"
          subtitle="Classes 9–12 | Ages 14–17"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <WorkshopCard
            title="Mental Health & Emotional Well-being"
            items={[
              "Understanding anxiety, stress & exam pressure",
              "Coping tools for heavy thoughts",
              "Grounding through body-mind connection",
            ]}
          />
          <WorkshopCard
            title="Breaking Thought Loops: Managing Inner Critic & Performance Pressure"
            items={[
              "Self-doubt, fear of failure, and inner criticism",
              "Perfectionism and pressure to perform",
              "Tools to reframe negative thoughts",
            ]}
          />
          <WorkshopCard
            title="Identity, Self-Awareness & Emotional Growth"
            items={[
              "Self-exploration through reflection and art",
              "Identity beyond marks, popularity, or roles",
              "Personal values and strengths for self",
            ]}
          />
          <WorkshopCard
            title="Interpersonal Awareness & Emotional Boundaries in Teen Years"
            items={[
              "Friendship boundaries & peer dynamics",
              "Power of vulnerability and open communication",
              "Seeking support without shame & emotional safety",
            ]}
          />
        </div>
      </section>

      {/* CORPORATE */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Corporate Wellness Workshops" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <WorkshopCard
              title="Emotional & Mental Wellbeing at Work"
              items={[
                "Stress Management & Burnout Recovery",
                "Coping Skills for High-Pressure Roles",
                "Coping Skills for High-Pressure Roles",
                "Work-Life Integration",
              ]}
            />
            <WorkshopCard
              title="Leadership & Self-Development"
              items={[
                "Self-Awareness for Better Leadership",
                "Confidence & Self-Expression",
                "Inner Alignment for Outer Success",
              ]}
            />
            <WorkshopCard
              title="Team Building & Communication Mastery"
              items={[
                "Team Dynamics & Trust-Building",
                "Conflict Resolution & Difficult Conversations",
                "The Psychology of Communication",
              ]}
            />
            <WorkshopCard
              title="Creativity, Innovation & Problem-Solving"
              items={[
                "Creative Confidence & Problem-Solving",
                "Unblocking Creative Thinking",
              ]}
            />
            <WorkshopCard
              title="Emotional Intelligence & Inclusive Culture"
              items={[
                "Emotional Intelligence at Work",
                "Empathy & Diversity Training",
              ]}
            />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-semibold text-gray-800 font-heading">
            Custom Workshop Packages
          </h2>

          <div className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3 text-left font-body">
            {[
              "One-Time Workshops (60–90 mins) – Topic-focused, interactive",
              "Monthly Series – 1 theme per month to build consistent growth",
              "Quarterly Development Programs – Deep-dive leadership or wellbeing journeys",
              "Team Offsites – Immersive sessions for team bonding or leadership retreats",
              "Custom Solutions – Based on department/role-specific needs (sales, design, HR etc.)",
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          {/* <button className="mt-12 bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition">
            Book a Workshop
          </button> */}
        </div>
      </section>
    </div>
  );
}
