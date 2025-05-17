import axios from "axios";

const API_URL = "https://de-6not.vercel.app/api"; 

export const gethotels = async (id) => {
    try {
       
        const response = await axios.get(`${API_URL}/hotels/${id}/connected`);  // Fetch hotels from the API
        // Log the successful fetch
       
        return response.data.connectedHotels;  // Ensure response data is returned
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        return undefined;  // Explicitly return undefined if there's an error
    }
};

export const getorders = async (id) => {
    try {
       
        const response = await axios.get(`${API_URL}/orders/hotel/${id}`);  // Fetch hotels from the API
        console.log("orders fetched successfully:", response.data);  // Log the successful fetch
       
        return response.data.orders;  // Ensure response data is returned
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        return undefined;  // Explicitly return undefined if there's an error
    }
};



export const getinventoryItems = async (hotelId) => {
    try {
         // Log the hotel ID for debugging
       
        const response = await axios.get(`${API_URL}/inventory/${hotelId}`);  // Fetch hotels from the API
         // Log the successful fetch
       
        return response.data;  // Ensure response data is returned
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        return undefined;  // Explicitly return undefined if there's an error
    }
};

export const addInventoryItem  = async (data) => {
    try {
       
        const response = await axios.post(`${API_URL}/inventory`, data);  // Fetch hotels from the API
         // Log the successful fetch
       
        return response.data;  // Ensure response data is returned
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        return undefined;  // Explicitly return undefined if there's an error
    }
};

export const deleteInventoryItem   = async (id) => {
    try {
       
        const response = await axios.delete(`${API_URL}/inventory/${id}`);  // Fetch hotels from the API
         // Log the successful fetch
       
        return response.data;  // Ensure response data is returned
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        return undefined;  // Explicitly return undefined if there's an error
    }
};


export const gettransferRequests = async (id) => {
    try {
        console.log(id);
       
        const response = await axios.get(`${API_URL}/transfers/${id}`);  // Fetch hotels from the API
        // Log the successful fetch
       console.log("transfer requests fetched successfully:", response.data.transfers);  // Log the successful fetch
        return response.data.transfers;  // Ensure response data is returned
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        return undefined;  // Explicitly return undefined if there's an error
    }
};

export const loginUser = async (data) => {
    try {
       
        const response = await axios.post(`${API_URL}/user/loginuser`, data);  // Fetch hotels from the API
        // Log the successful fetch
       
        return response.data;  // Ensure response data is returned
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        return undefined;  // Explicitly return undefined if there's an error
    }
};

export const registerUserWaiter = async (userData) => {
    try {
        // Log the user data for debugging
      const response = await axios.post(`${API_URL}/user/registerW`, userData);
     
      return response.data;
    } catch (error) {
      console.error("Axios Error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

export const registerUserAdmin = async (userData) => {
    try {
     
        const response = await axios.post(`${API_URL}/user/registerA`, userData);
      
        return response.data;  // Ensure response data is returned
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        return undefined;  // Explicitly return undefined if there's an error
    }
};

const userServices = {gethotels, addInventoryItem, deleteInventoryItem,  getorders, getinventoryItems,gettransferRequests, loginUser,registerUserWaiter,registerUserAdmin,  };  // Exporting the functions as an object
export default userServices;
