import React from "react";

export default function Policy() {
  return (
    <section className="bg-[#f9f8ff] min-h-screen py-16 px-4 mt-30">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-10">
        {/* PAGE HEADER */}
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4b2aad]">
            MindSoul Wellness – Policies
          </h1>
          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Please read our policies carefully to understand your rights and
            responsibilities.
          </p>
        </header>

        {/* 1. CANCELLATION & REFUND POLICY */}
        <PolicySection title="1. Cancellation & Refund Policy">
          <PolicySubTitle title="Cancellation" />
          <PolicyList
            items={[
              "Clients may cancel a session at least 24 hours in advance for a full refund or session credit.",
              "Cancellations made within 24 hours are not eligible for a refund.",
              "Refunds are processed within 3–7 business days to the original payment method.",
            ]}
          />

          <PolicySubTitle title="No-Show" />
          <PolicyText>
            Failure to attend a scheduled session without prior notice will be
            treated as a no-show and will not qualify for a refund.
          </PolicyText>

          <PolicySubTitle title="Therapist-Initiated Cancellations" />
          <PolicyList
            items={[
              "If the therapist cancels due to emergency or unavailability, the client may reschedule at no extra charge or claim a full refund.",
            ]}
          />

          <PolicySubTitle title="Package Sessions" />
          <PolicyText>
            Refunds apply only to unused sessions. Used sessions will be billed
            at standard rates.
          </PolicyText>
        </PolicySection>

        {/* 2. SESSION RESCHEDULE POLICY */}
        <PolicySection title="2. Session Reschedule Policy">
          <PolicySubTitle title="Client-Initiated Rescheduling" />
          <PolicyList
            items={[
              "Must be requested at least 24 hours before the session.",
              "Less than 24 hours notice may require booking a new session.",
            ]}
          />

          <PolicySubTitle title="Therapist-Initiated Rescheduling" />
          <PolicyText>
            A new time slot or session credit will be offered.
          </PolicyText>
        </PolicySection>

        {/* 3. SHIPPING / SERVICE FULFILLMENT POLICY */}
        <PolicySection title="3. Shipping / Service Fulfillment Policy">
          <PolicyText>
            Since therapy services are intangible and delivered online, the
            following applies:
          </PolicyText>

          <PolicySubTitle title="Service Delivery" />
          <PolicyList
            items={[
              "Online sessions will be delivered via scheduled virtual platforms.",
              "In-person sessions will be provided at the clinic location.",
            ]}
          />

          <PolicySubTitle title="Technical Issues" />
          <PolicyList
            items={[
              "If technical failure occurs from the provider’s side, a free reschedule will be offered.",
              "Client-side technical issues may not qualify for free rescheduling.",
            ]}
          />
        </PolicySection>

        {/* 4. PRIVACY POLICY */}
        <PolicySection title="4. Privacy Policy">
          <PolicySubTitle title="Data Collected" />
          <PolicyList
            items={[
              "Personal information (name, contact details, age, etc.)",
              "Sensitive personal data including psychological assessments, health-related information, and therapy notes.",
              "Technical data such as IP address and browser type.",
            ]}
          />

          <PolicySubTitle title="Purpose of Data Use" />
          <PolicyList
            items={[
              "Appointment management",
              "Therapy delivery",
              "Legal compliance",
              "Service improvement",
            ]}
          />

          <PolicySubTitle title="Data Sharing" />
          <PolicyList
            items={[
              "We do not sell personal data.",
              "Data may be shared with payment gateways, hosting providers, or law-enforcement if legally required under Indian law.",
            ]}
          />

          <PolicySubTitle title="Data Storage & Protection" />
          <PolicyText>
            We follow ISO-compliant security practices as referenced in the IT
            Rules, 2011. All therapy records are stored securely and
            confidentially.
          </PolicyText>

          <PolicySubTitle title="Your Rights (Under DPDP Act, 2023)" />
          <PolicyList
            items={[
              "Right to Access",
              "Right to Correction",
              "Right to Consent Withdrawal",
              "Right to Data Erasure (subject to legal record-keeping requirements for therapists)",
            ]}
          />
        </PolicySection>

        {/* 5. CONTACT US */}
        <PolicySection title="5. Contact Us / Support">
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:dhotrerutam@gmail.com"
                className="text-[#4b2aad] underline"
              >
                dhotrerutam@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong> +91-8698668886
            </p>
            <p>
              <strong>Office Hours:</strong>
              <br />
              Mon–Fri: 9:00 AM – 6:00 PM
              <br />
              Sat: 9:00 AM – 1:00 PM
              <br />
              Sun: Closed
            </p>
          </div>
        </PolicySection>

        {/* LEGAL FOOTER */}
        <footer className="mt-12 border-t pt-6 text-xs text-gray-500 leading-relaxed">
          <p>
            This Cancellation & Refund Policy is drafted in accordance with the
            Consumer Protection Act, 2019; Consumer Protection (E-Commerce)
            Rules, 2020; Information Technology Act, 2000; Information
            Technology Rules, 2011; and the Digital Personal Data Protection
            Act, 2023.
          </p>
          <p className="mt-2">
            This policy aligns with professional ethics standards under the
            Rehabilitation Council of India (RCI) Code of Conduct.
          </p>
        </footer>
      </div>
    </section>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const PolicySection = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl md:text-2xl font-semibold text-[#4b2aad] mb-4">
      {title}
    </h2>
    <div className="space-y-4 text-gray-700 text-sm md:text-base">
      {children}
    </div>
  </div>
);

const PolicySubTitle = ({ title }) => (
  <h3 className="font-semibold text-gray-900">{title}</h3>
);

const PolicyText = ({ children }) => (
  <p className="leading-relaxed">{children}</p>
);

const PolicyList = ({ items }) => (
  <ul className="list-disc pl-6 space-y-2">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
