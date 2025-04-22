import { useState } from "react";
import { registerUserWaiter, registerUserAdmin } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("waiter");

  const [waiterData, setWaiterData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    hotelId: "",
  });

  const [adminData, setAdminData] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    hotelName: "",
    hotelId: "",
  });

  const handleWaiterChange = (e) => {
    setWaiterData({ ...waiterData, [e.target.name]: e.target.value });
  };

  const handleAdminChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleWaiterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUserWaiter({ ...waiterData, role: "Waiter" });
      toast.success(res.data?.message || "Registration successful!", { duration: 2000 });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUserAdmin({ ...adminData, role: "Admin" });
      toast.success(res.data?.message || "Registration successful!", { duration: 2000 });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-white to-gray-100">
      <Toaster position="top-right" />

      {/* Role Toggle Buttons */}
      <div className="fixed top-0 left-0 right-0 flex justify-end gap-4 p-4 bg-white shadow-md">
        <button
          className={`px-4 py-2 rounded-md transition ${role === "waiter" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setRole("waiter")}
        >
          Waiter
        </button>
        <button
          className={`px-4 py-2 rounded-md transition ${role === "admin" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
          onClick={() => setRole("admin")}
        >
          Admin
        </button>
      </div>

      {/* Conditional Rendering of Forms */}
      {role === "waiter" ? (
        <SignUpForm
          title="Register as Waiter"
          formData={waiterData}
          handleChange={handleWaiterChange}
          handleSubmit={handleWaiterSubmit}
          fields={[
            { name: "FirstName", type: "text", placeholder: "Enter your first name" },
            { name: "LastName", type: "text", placeholder: "Enter your last name" },
            { name: "email", type: "email", placeholder: "Enter your email" },
            { name: "password", type: "password", placeholder: "Enter your password" },
            { name: "hotelId", type: "text", placeholder: "Enter your hotel ID" },
          ]}
        />
      ) : (
        <SignUpForm
          title="Register as Admin"
          formData={adminData}
          handleChange={handleAdminChange}
          handleSubmit={handleAdminSubmit}
          fields={[
            { name: "FirstName", type: "text", placeholder: "Enter your first name" },
            { name: "LastName", type: "text", placeholder: "Enter your last name" },
            { name: "email", type: "email", placeholder: "Enter your email" },
            { name: "password", type: "password", placeholder: "Enter your password" },
            { name: "hotelName", type: "text", placeholder: "Enter your hotel name" },
            { name: "hotelId", type: "text", placeholder: "Enter your hotel ID" },
          ]}
        />
      )}
    </div>
  );
};

// Reusable Form Component
const SignUpForm = ({ title, formData, handleChange, handleSubmit, fields }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-xl p-8 w-96 max-w-full mt-8">
      <h3 className="text-2xl font-bold text-blue-500 mb-4">{title}</h3>
      <form onSubmit={handleSubmit}>
        <div className="h-[33vh] overflow-y-auto scrollbar-hide">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="text-gray-600 w-full">{field.name}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                required
                placeholder={field.placeholder}
                onChange={handleChange}
                pattern={field.pattern || undefined}
                maxLength={field.maxLength || undefined}
                className="w-full px-4 py-2 border rounded-md mb-4"
              />
            </div>
          ))}
        </div>

        <div className="mt-2">
          <input type="checkbox" required />
          <span className="text-sm"> I agree to terms & policy</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-2 rounded-md hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
