import React, { useState } from "react";
import HR from "../Login/Images/HR.svg";
import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import Radiobtn from "../Components/RadioBtn/Radiobtn";
import Header from "../Home/Header/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userType, setUserType] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`/api/${userType}/login`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      console.log('Response Data:', responseData); // Add this to check the response

      if (responseData.message !== 'Logged in') {
        setErr(responseData.message);
        return;
      }

      const userId = responseData.data.user._id;

      if (response.ok) {
        console.log('Login successful'); // Add this to confirm login success

        if (responseData.data.user.Isapproved === 'pending') {
          if (responseData.data.user.Teacherdetails || responseData.data.user.Studentdetails) {
            navigate('/pending');
          } else {
            if (userType === 'student') {
              navigate(`/StudentDocument/${userId}`);
            } else if (userType === 'teacher') {
              navigate(`/TeacherDocument/${userId}`);
            }
          }
        } else if (responseData.data.user.Isapproved === 'approved') {
          if (userType === 'student') {
            navigate(`/Student/Dashboard/${userId}/Search`);
          } else if (userType === 'teacher') {
            navigate(`/Teacher/Dashboard/${userId}/Home`);
          }
        } else if (responseData.data.user.Isapproved === 'reupload') {
          navigate(`/rejected/${userType}/${userId}`);
        } else {
          setErr('You are banned from our platform!');
        }
      } else {
        handleErrors(response.status, responseData.message);
      }
    } catch (error) {
      console.error('Error occurred during login:', error); // Add this to log errors
      setErr('An error occurred during login.');
    }
  };

  const handleErrors = (status, message) => {
    if (status === 401) {
      setErrors({ password: message || 'Incorrect password' });
    } else if (status === 403) {
      setErrors({ general: message || 'Login failed' });
    } else if (status === 400) {
      setErrors({ general: message || 'User does not exist' });
    } else if (status === 422) {
      setErrors({ general: message || '"Email" must be a valid email' });
    } else {
      setErrors({ general: 'An unexpected error occurred' });
    }
  };

  return (
    <>
      <Header />
      <section className="main">
        <div className="container">
          <div className="para1">
            <h2>WELCOME BACK!</h2>
          </div>
          <div className="para">
            <h5>Please Log Into Your Account.</h5>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="input-1">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="input-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              <div className="input-2">
                <input
                  type="password"
                  placeholder="Password"
                  className="input-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>
              <div className="radio-btn">
                <Radiobtn userType={userType} setUserType={setUserType} />
              </div>
              <div className="signup-link">
                <span>Don't have an account? </span>
                <NavLink to="/signup" className="link text-yellow-400 text-semibold text-md">
                  signup
                </NavLink>
              </div>
              <div className="text-yellow-400 text-semibold pt-3 cursor-pointer" onClick={() => navigate('/forgetpassword')}>
                Forget Password?
              </div>
              <div className="btns">
                <button type="submit" className="btns-1">
                  Log In
                </button>
              </div>
              {err && <p className="text-red-400 text-sm">{err}</p>}
            </form>
          </div>
        </div>
        <div className="img-3">
          <img src={HR} width={600} alt="" />
        </div>
      </section>
    </>
  );
}
