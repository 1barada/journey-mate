import { AboutPageInfo } from '../../components/AboutPageInfo';
import { Profile } from '../../components/Profile';

const ProfilePage = () => {
  return (
    <div>
      <AboutPageInfo info="Your profile" />
      <Profile />
    </div>
  );
};

export default ProfilePage;
