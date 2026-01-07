import CounsellorSlider from "../components/Home/CounsellorSlider";
import FaqSection from "../components/Home/FaqSection";
import HeroSection from "../components/Home/HeroSection";
import HowItWorks from "../components/Home/HowItWorks";
import InsuranceSection from "../components/Home/InsuranceSection";
import OurExpertise from "../components/Home/OurExpertise";
import Testimonials from "../components/Home/Testimonials";
import WhoWeServe from "../components/Home/WhoWeServe";
import WhyMindsoul from "../components/Home/WhyMindsoul";

const Home = () => {
  return (
    <div className="relative min-h-screen  bg-[#FAF9F6]">
      <HeroSection />
      {/* <InsuranceSection /> */}
      <WhoWeServe />
      <CounsellorSlider />
      <Testimonials />
      <HowItWorks />
      <WhyMindsoul />
      <OurExpertise />
      <FaqSection />
    </div>
  );
};

export default Home;
