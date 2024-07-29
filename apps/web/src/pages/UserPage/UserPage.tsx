import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Backdrop, CircularProgress } from '@mui/material';

import { AboutPageInfo } from '../../components/common/AboutPageInfo';
import { User } from '../../components/User';
import { UserProps } from '../../components/User/types';
import { trpcClient } from '../../services/trpc';

import styles from './UserPage.module.scss';

const UserPage = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      setIsloading(true);
      try {
        if (id) {
          const user: UserProps = await trpcClient.user.getUser.query({ id: Number(id) });
          setUser(user);
        }
      } catch (error) {
        toast.error((error as Error).message);
      } finally {
        setIsloading(false);
      }
    };

    getUser();
  }, [id]);

  return (
    <div>
      <AboutPageInfo info="Your profile" />
      {user && <User {...user} />}

      <Backdrop className={styles.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default UserPage;
