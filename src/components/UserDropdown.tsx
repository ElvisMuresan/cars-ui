import React from 'react';
import { Dropdown } from 'flowbite-react';
import Logout from './Logout';

interface UserDropdownProps {
  username: string;
  fullName: string;
  email: string;
  token: string;
  clearToken: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ username, fullName, email, token, clearToken }) => {
  const initial = username.charAt(0).toUpperCase();

  return (
    <Dropdown
    label={
        <div className="bg-cyan-700 text-white h-14 w-14 flex items-center justify-center font-bold rounded mr-4">
          {initial}
        </div>
      }
      arrowIcon={false}
      inline={true}
    >
      <Dropdown.Header>
        <span className="block text-sm">{fullName}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      <Dropdown.Item >
        <Logout token={token} clearToken={clearToken} />
      </Dropdown.Item>
    </Dropdown>
  );
};

export default UserDropdown;
