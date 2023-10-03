import { Navigate } from 'react-router-dom';

const RequiresUnAuth = ({ children }) => {

    // ================= hooks ====================    
    const user = JSON.parse(localStorage.getItem("user"))
  
    
    if (user) {
      return <Navigate to="/" />;
    }
  
    return children;
  };
  
  export default RequiresUnAuth;