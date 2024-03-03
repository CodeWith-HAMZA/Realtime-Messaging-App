import { placeHolderImage } from "@/utils/constants";
import React from "react";

interface ProfileProps {
  name: string;
  email: string;
  photoUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ name, email, photoUrl }) => {
  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words bg-white w-full mb-6 rounded-xl mt-4">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative w-full flex justify-center">
              <img
                src={photoUrl || placeHolderImage}
                className="w-40 h-40 hover:opacity-90 transition-all cursor-pointer hover:h-full hover:w-full hover:rounded-lg rounded-full"
                alt="profile"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center my-8">
          <span className="text-2xl text-black font-bold">{name}</span>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
