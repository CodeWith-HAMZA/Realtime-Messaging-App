import React from 'react';

interface UserContactProps {
  name: string;
}

const UserContact: React.FC<UserContactProps> = ({ name }) => {
  return (
    <li className="mb-2 flex items-center">
      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
      <span className="text-gray-800 hover:text-blue-500 cursor-pointer">
        {name}
      </span>
    </li>
  );
};

export default UserContact;