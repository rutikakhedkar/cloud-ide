import  axios  from 'axios'
import { create } from 'zustand'
import {useNavigate } from 'react-router-dom';

const useUserStore = create((set) => ({
  
    userInfo: null,
    getUserInfo: async () => {
          const navigate = useNavigate();
        try {
            const res = await axios.get("http://localhost:5000/authcheck", {
                withCredentials: true,
            });
            if (res.status === 200) {
                set({userInfo:res.data})
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Auth failed:", err);
            navigate("/");
        }
    },
}))
export default useUserStore