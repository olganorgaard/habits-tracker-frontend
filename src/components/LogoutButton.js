import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LogoutButton = () => {
  const { logout } = useAuth0();
  const btnRef = useRef(null);

  useEffect(() => {
    gsap.from(btnRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });
  }, []);

  return (
    <button  ref={btnRef} onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export default LogoutButton;
