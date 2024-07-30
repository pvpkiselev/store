import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import { useState } from 'react';

function Auth() {
  const [isHasAccount, setIsHasAccount] = useState(false);

  function handleClickOnQuestion() {
    !isHasAccount ? setIsHasAccount(true) : setIsHasAccount(false);
  }

  return (
    <>
      <SignUp toggleModal={handleClickOnQuestion} isHasAccount={!isHasAccount} />
      <SignIn toggleModal={handleClickOnQuestion} isHasAccount={isHasAccount} />
    </>
  );
}

export default Auth;
