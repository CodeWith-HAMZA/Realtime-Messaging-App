import React from "react";
import UserContact from "./cards/UserCard";
interface Contact {
  id: number;
  name: string;
}

const Sidebar = () => {
  const contacts: Contact[] = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'Shaikh shaikh' },
    { id: 3, name: 'User 3' },
    // Add more contacts as needed
  ];

  return (
    <aside className="bg-gray-200 w-1/4 p-4">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <ul>
        {contacts.map((contact) => (
          <UserContact key={contact.id} name={contact.name} />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
