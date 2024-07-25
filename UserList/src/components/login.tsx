import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface AuthProps {
  switchToSignUp: () => void;
  switchToLogin: () => void;
}

const Login: React.FC<Pick<AuthProps, "switchToSignUp">> = ({
  switchToSignUp,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate()


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", { email, password })
      .then((result) => {
        toast.success(result.data.message || "Login Successful!");
        console.log(result);
        setEmail("");
        setPassword("");
        if (result.data.message === "Login Successfully") {
          const {name, email, number, fields} =result.data.user
          setTimeout(() => {
            navigate("/home",{ state: { name, email, number, fields } });
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.message || "Login Failed");
        } else {
          toast.error("Login Failed");
        }
      });
  };

  return (
    <>
      <div className="flex flex-col gap-20 bg-custom-gradient h-screen">
        <form
          onSubmit={handleSubmit}
          className="place-self-center w-[max(23vw,330px)] text-[#808080] bg-white flex flex-col gap-6 p-[25px_30px]  text-sm  border border-[#c9cec9] rounded-md m-20"
        >
          <h1 className="text-lg leading-7 font-semibold text-black text-center">
            Login
          </h1>
          <input
            className="box-border border m-2 p-2"
            name="email"
            type="email"
            placeholder="Your Email"
            onChange={handleEmailChange}
            value={email}
            required
          />
          <input
            className="box-border border m-2 p-2"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
            required
          />
          <div>
          <button
            className="block py-3 px-5 bg-indigo-600 text-white text-sm leading-5 font-medium w-full rounded-md uppercase "
            type="submit"
            
          > 
            Sign In
            
          </button>
          
          </div>
          <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
            <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
              New account?
              <a
                onClick={switchToSignUp}
                className="font-medium underline"
                href="/"
              >
                Sign up
              </a>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
