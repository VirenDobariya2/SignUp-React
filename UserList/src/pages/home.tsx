import { useLocation } from "react-router-dom";
import profile from "../assets/user.png";

const Home = () => {
  const location = useLocation();
  const { name, email, number, fields } = location.state || {};

  return (
    
    <div className="bg-blue-500  w-auto h-auto border-custom-yellow">
    
      <form className="flex items-center justify-center p-24">
        <div className="profile-card mb-72 w-[500px] h-[500px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 bg-blue-200 flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
          <div className="flex flex-col items-center justify-center mb-52">
            <div className="m-10">
            <img
              src={profile}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white group-hover:border-8 transition-all duration-300"
            />
            </div>
            <div className="space-x-1 space-y-5 headings *:text-center *:leading-4">
              <p className="text-xl font-serif font-semibold text-[#434955]">
                {name?.toUpperCase() || "NAME"}
              </p>
              <p className="text-sm font-semibold text-[#434955]">
                {fields?.toUpperCase() || "FIELDS"}
              </p>
              <p className="text-sm font-semibold text-[#434955]">
                {email}
              </p>
              <p className="text-sm font-semibold text-[#434955]">
                {number}
              </p>
            </div>
          </div>
        </div>
      </form>
      
      </div>
    
  );
};

export default Home;
