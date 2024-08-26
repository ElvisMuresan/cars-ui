import React from 'react';
import { Dropdown, Avatar } from 'flowbite-react';
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
      label={<Avatar placeholderInitials={initial} rounded={true} />}
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
