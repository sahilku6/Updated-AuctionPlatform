import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    role === "Auctioneer" &&
      (formData.append("bankAccountName", bankAccountName),
        formData.append("bankAccountNumber", bankAccountNumber),
        formData.append("bankName", bankName),
        formData.append("easypaisaAccountNumber", easypaisaAccountNumber),
        formData.append("paypalEmail", paypalEmail));
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Register
          </h1>
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleRegister}
          >
            <p className="font-semibold text-xl md:text-2xl">
              Personal Details
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Phone</label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                >
                  <option value="">Select Role</option>
                  <option value="Auctioneer">Auctioneer</option>
                  <option value="Bidder">Bidder</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-1">
                <label className="text-[16px] text-stone-600">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-1 gap-2">
              <label className="text-[16px] text-stone-600">
                Profile Image
              </label>
              <div className="flex items-center gap-3">
                <img
                  src={
                    profileImagePreview
                      ? profileImagePreview
                      : "/imageHolder.jpg"
                  }
                  alt="profileImagePreview"
                  className="w-14 h-14 rounded-full"
                />
                <input type="file" onChange={imageHandler} />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-xl md:2xl flex flex-col">
                Payment Method Details{" "}
                <span className="text-[12px] text-stone-500">
                  Fill Payment Details Only If you are registering as an
                  Auctioneer
                </span>
              </label>
              <div className="flex flex-col gap-2">
                <label className="text-[16px] text-stone-500">
                  Bank Details
                </label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  >
                    <option value="">Select Your Bank</option>
                    <option value="Andhra Pradesh Grameena Vikas Bank">Andhra Pradesh Grameena Vikas Bank</option>
                    <option value="AU Small Finance Bank">AU Small Finance Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Bank of India">Bank of India</option>
                    <option value="Baroda UP Bank">Baroda UP Bank</option>
                    <option value="Canara Bank">Canara Bank</option>
                    <option value="Central Bank of India">Central Bank of India</option>
                    <option value="Cosmos Cooperative Bank">Cosmos Cooperative Bank</option>
                    <option value="Equitas Small Finance Bank">Equitas Small Finance Bank</option>
                    <option value="ESAF Small Finance Bank">ESAF Small Finance Bank</option>
                    <option value="Federal Bank">Federal Bank</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="IDFC First Bank">IDFC First Bank</option>
                    <option value="Indian Bank">Indian Bank</option>
                    <option value="Indian Overseas Bank">Indian Overseas Bank</option>
                    <option value="IndusInd Bank">IndusInd Bank</option>
                    <option value="Jana Small Finance Bank">Jana Small Finance Bank</option>
                    <option value="Karnataka Vikas Grameena Bank">Karnataka Vikas Grameena Bank</option>
                    <option value="Kerala Gramin Bank">Kerala Gramin Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Punjab & Sind Bank">Punjab & Sind Bank</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                    <option value="RBL Bank">RBL Bank</option>
                    <option value="Saraswat Cooperative Bank">Saraswat Cooperative Bank</option>
                    <option value="Shamrao Vithal Cooperative Bank">Shamrao Vithal Cooperative Bank</option>
                    <option value="South Indian Bank">South Indian Bank</option>
                    <option value="State Bank of India">State Bank of India</option>
                    <option value="Suryoday Small Finance Bank">Suryoday Small Finance Bank</option>
                    <option value="UCO Bank">UCO Bank</option>
                    <option value="Ujjivan Small Finance Bank">Ujjivan Small Finance Bank</option>
                    <option value="Union Bank of India">Union Bank of India</option>
                    <option value="Yes Bank">Yes Bank</option>

                  </select>
                  <input
                    type="text"
                    value={bankAccountNumber}
                    placeholder="IFSC Code"
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  />
                  <input
                    type="text"
                    value={bankAccountName}
                    placeholder="Name in Bank"
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  />
                </div>
              </div>
              <div>
                <label className="text-[16px] text-stone-600 font-semibold">
                  Easypaisa And Paypal Details
                </label>
                <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <input
                    type="number"
                    value={easypaisaAccountNumber}
                    placeholder="Easypaisa Account Number"
                    onChange={(e) => setEasypaisaAccountNumber(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  />
                  <input
                    type="email"
                    value={paypalEmail}
                    placeholder="Paypal Email"
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                    disabled={role === "Bidder"}
                  />
                </div>
              </div>
            </div>

            <button
              className="bg-[#d6482b] w-[420px] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto lg:w-[640px] my-4"
              type="submit"
              disabled={loading}
            >
              {loading && "Registering..."}
              {!loading && "Register"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
