
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="loading-container d-flex justify-content-center align-items-center">
      <FaSpinner className="loading-icon" />
      <span className="loading-text ms-2">Loading...</span>
    </div>
  );
};

export default Loading;
