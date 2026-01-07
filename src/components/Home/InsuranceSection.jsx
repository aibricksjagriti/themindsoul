export default function InsuranceSection() {
  return (
    <section className=" pt-12 pb-18 px-6">
      <div className="max-w-[85%] mx-auto bg-accent rounded-xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Text Content */}
        <div className="max-w-lg">
          <p className="uppercase text-lg tracking-wide text-gray-600 font-semibold font-body">
            Accepted Insurance Plans
          </p>

          <h2 className="text-5xl font-semibold text-gray-900 mt-2 font-heading">
            We’ve got you covered
          </h2>

          <p className="mt-3 text-gray-700 text-md leading-relaxed font-body">
            <a href="#" className="underline font-medium hover:text-gray-900">
              Learn more
            </a>{" "}
            about in-network insurance coverage and out-of-network payment
            options.
          </p>
        </div>

        {/* Right Logo Section */}
        <div className="flex items-center gap-10 flex-wrap justify-center md:justify-end">
          <img
            src="/bluecross-logo.avif"
            alt="Blue Cross Blue Shield"
            className="h-20 object-contain"
          />
          <img
            src="/kuber-logo.avif"
            alt="Kaiser Permanente"
            className="h-20 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
