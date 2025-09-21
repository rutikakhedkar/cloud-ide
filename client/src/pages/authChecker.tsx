import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthChecker = () => {
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:5000/authcheck", {
        withCredentials: true
      });
      navigate(res.data.redirect);
    } catch (err) {
      console.error(err);
     // fallback if server error or token invalid
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return null; // This component only redirects
};

export default AuthChecker;
