const userItems = [
  {
    user_id: 1,
    name: 'Anamol Khadka',
    username: 'anamol',
    email: 'anamol@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 2,
    name: 'Manik Gurung',
    username: 'manik',
    email: 'manik@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((item) => item.user_id == id);
};

const addUser = (user) => {
  const newId = userItems.length + 1;

  const newUser = {
    user_id: newId,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    password: user.password,
  };

  userItems.push(newUser);

  return newUser;
};

export {listAllUsers, findUserById, addUser};
