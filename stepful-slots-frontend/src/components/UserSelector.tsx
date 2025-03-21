import { Box, Select, MenuItem, Typography } from '@mui/material';
import { User } from '../types';

interface UserSelectorProps {
  currentUser: User | null;
  handleOnChange: (user: User) => void;
  users: User[]
}

const UserSelector: React.FC<UserSelectorProps> = ({ users, currentUser, handleOnChange }) => {
  return (
<Box mx={2} my={4}>
    <Typography>Select Current User</Typography>
      <Select
        key={currentUser?.id}
        value={currentUser?.id}
        onChange={(e) => {
          const user = users.find(u => u.id === e.target.value);
          if (user) handleOnChange(user);
        }}
      >
        {users.map(user => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default UserSelector;