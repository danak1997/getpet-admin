import React from 'react';
import { useContext } from 'react';
import UserContext from '../context/user';
import DefaultLayout from '../layouts/DefaultLayout';

const HomePage = () => {
  const [user] = useContext(UserContext);
  return (
    <DefaultLayout>
      <div>שלום, {user.name}!</div>
    </DefaultLayout>
  );
};

export default HomePage;
