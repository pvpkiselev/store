import { useNavigate } from 'react-router-dom';

function useAppNavigate() {
  const navigate = useNavigate();

  const goBack = () => {
    const stepBack = -1;
    const isWindowHistory = window.history.length > 1;
    isWindowHistory ? navigate(stepBack) : navigate('/');
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return { goBack, goToHome, goToCheckout };
}

export default useAppNavigate;
