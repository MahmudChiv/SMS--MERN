import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between text-white p-4  md:p-15 gap-7">
      <div className="text-start md:w-1/2">
        <h1 className="text-3xl md:text-6xl font-bold mb-5  md:text-left">
          School <br /> Management with <span className="text-blue-400">SoftEdu</span>
        </h1>
        <p className="text-lg md:text-xl mb-5">
          Comprehensive school management system that streamlines
          administration, enhances learning, and connects your educational
          community.
        </p>
        <button className="text-white px-3 py-2 rounded bg-blue-700 text-xl">Get Started</button>
      </div>
      <div>
        <img src={assets.headerImg} alt="SoftEdu Logo" className="rounded" />
      </div>
    </div>
  );
};

export default Header;
