
import { useSelector } from "react-redux";
import defaultBioImage from "../assets/download.png"

function UserProfile() {
  const followers = useSelector((state) => state.searchName?.follow || []);
  const userProfileSelector = useSelector((state) => state.auth.user);
  const userProfileInUse = useSelector((state) => state.userProfile.user);
  const test = useSelector((state) => state);

    const uniquename = userProfileSelector?.name || userProfileSelector?.username 
    
console.log("selecterFromUserProfile",userProfileSelector)
console.log("testStateFromUserProfile",test)

console.log(defaultBioImage)
  return (
<div className="max-w-sm mx-auto bg-gray-900 text-white rounded-2xl shadow-xl p-6 mt-5 sm:mt-10 md:mt-14 transition-all duration-300">

  <div className="flex flex-col items-center">
    <img
      src={userProfileInUse?.profilePicture 
        ? "http://localhost:5432" + userProfileInUse.profilePicture 
        : defaultBioImage}
      alt="Profile"
      className="w-24 h-24 rounded-full object-cover border-4 border-[#ff6600] shadow-md hover:scale-105 transition-transform duration-300"
    />
    <h1 className="mt-4 text-2xl font-bold tracking-wide text-gray-100">{uniquename}</h1>
  </div>


  <div className="flex flex-wrap justify-center sm:justify-around gap-4 mt-6 px-4">
  <div className="text-center">
    <p className="text-gray-400 text-xs sm:text-sm uppercase">Followers</p>
    <p className="text-xl sm:text-2xl font-semibold text-[#ff6600]">{followers.length}</p>
  </div>

</div>
</div>

  );
}

export default UserProfile;
