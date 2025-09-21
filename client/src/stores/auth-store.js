import axios from 'axios'
import { create } from 'zustand'
import { toast } from 'react-toastify';

const useUserStore = create((set) => ({
    userInfo: null,
    isLoggedIn: false,
    redirect:null,
    // In Zustand store
    getUserInfo: async () => {
  try {
    const res = await axios.get("http://localhost:5000/auth/authcheck", {
      withCredentials: true,
    });

    if (res.status === 200) {
      const user = res.data.data.user;
      const loggedIn = res.data.data.loggedIn;
      const redirect=res.data.redirect;
      console.log(res)

      set({ userInfo: user, isLoggedIn: loggedIn,redirect:redirect });
      return { user, loggedIn, redirect };
    } else {
      toast.error(res.data.message);
      return null;
    }
  } catch (err) {
    // If backend included redirect in the response
    if (err.response) {
      const redirectTo = err.response.data?.redirect;
      toast.error(err.response.data?.message || "Auth failed");

      if (redirectTo) {
        window.location.href = redirectTo; // 🔗 frontend decides redirect
      }
    } else {
      toast.error(err.message || "Auth failed");
    }

    console.error("Auth failed:", err);
    return null;
  }
}


}))
export default useUserStore