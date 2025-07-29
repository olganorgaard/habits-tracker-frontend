import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoginButton = () => {
  const btnRef = useRef(null);
  const { loginWithRedirect } = useAuth0();

 useEffect(() => {
    gsap.from(btnRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: 'back.out(1.7)',
    });
  }, []);


  return <button ref={btnRef} onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;
