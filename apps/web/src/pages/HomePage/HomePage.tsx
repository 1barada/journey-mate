import React from 'react';

import { trpc } from '../../services/trpc';

export const HomePage = () => {
  trpc.user.getUsers.query().then((data) => console.log(data));

  return <div>HomePage</div>;
};
