
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { SocialIcons } from './SocialIcons';

const Navigation = () => {
  return (
    <>
      <div className="fixed w-full top-0 p-4 md:p-8 flex justify-between items-start z-50">
        <Logo />
        <NavLinks />
      </div>
      <SocialIcons />
    </>
  );
};

export default Navigation;
