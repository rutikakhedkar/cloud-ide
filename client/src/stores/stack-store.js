import axios from 'axios'
import { create } from 'zustand'
import { toast } from 'react-toastify';

const useStackStore = create((set) => ({
    stackInfo: [],
   
    // In Zustand store
    getStackInfo: async (stack) => {
    try {
    const res = await axios.get(`http://localhost:5000/workspace/load/${stack}`);
    if (res.status === 200) {
      console.log(res)
      set({ stackInfo: res.data.fileTree});
    } else {
        console.log("Something went wrong",)
    //   toast.error(res.data.message);
    }
  } catch (err) {
    console.error("Auth failed:", err);
    return null;
  }
}


}))
export default useStackStore