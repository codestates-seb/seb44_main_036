import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
  return (
    <ToastContainer
      position={toast.POSITION.BOTTOM_RIGHT}
      pauseOnHover={false}
      autoClose={3000}
      closeOnClick={false}
      pauseOnFocusLoss={false}
    />
  );
}

export default Toast;
