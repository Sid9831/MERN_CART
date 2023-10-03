import { Navigate } from 'react-router-dom';

const RequiresAuth = ({ children }) => {

    // ================= hooks ====================    
    const user = JSON.parse(localStorage.getItem("user"))
  
    
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  
  export default RequiresAuth;