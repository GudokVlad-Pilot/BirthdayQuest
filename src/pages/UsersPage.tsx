import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface User {
  name: string;
  avatar: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://birthdayquestbackend.onrender.com/users");
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="usersPage">
      <div className="pageTitle">
        This is the users page.
      </div>
      <div className="text">
        Some text here
      </div>
      <div>
        {users.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <CircularProgress />
            <p> Loading...</p>
          </Box>
        ) : (
          users.map((user, index) => (
            <div key={index} className="user">
              <p>{user.name}</p>
              <img src={`https://birthdayquestbackend.onrender.com/avatars/${user.avatar}`} alt={`${user.name}'s avatar`} style={{height: '200px'}}/>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UsersPage;