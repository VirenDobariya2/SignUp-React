import { useState } from "react";
import { AuthProps } from "./login";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  number: Yup.string()
    .required("Number is required")
    .matches(/^[0-9]+$/, "Number must be a valid number"),
  fields: Yup.string().required("Fields is required"),
});

const SignUp: React.FC<Pick<AuthProps, "switchToLogin">> = ({
  switchToLogin,
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [fields, setFields] = useState<string>("");

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    number?: string;
    fields?: string;
  }>({});
  const navigate = useNavigate();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  const handleFieldsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFields(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate form values
    validationSchema
      .validate(
        { name, email, password, number, fields },
        { abortEarly: false }
      )
      .then(() => {
        // Make API request if validation succeeds
        axios
          .post("http://localhost:3000/signup", {
            name,
            email,
            password,
            number,
            fields,
          })
          .then((result) => {
            toast.success(result.data.message || "Login Successful!");

            setTimeout(() => {
              navigate("/home", { state: { name, email, number, fields } });
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.response?.data.message || "Sign Up Failed");
          });
      })
      .catch((err) => {
        // Handle validation errors
        const validationErrors: {
          name?: string;
          email?: string;
          password?: string;
          number?: string;
          fields?: string;
        } = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          validationErrors[error.path as keyof typeof validationErrors] =
            error.message;
        });
        setErrors(validationErrors);
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
            Sign Up
          </h1>

          <input
            className="box-border border m-2 p-2"
            name="Name"
            type="name"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            required
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}

          <input
            className="box-border border m-2 p-2"
            name="email"
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}

          <input
            className="box-border border m-2 p-2"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {errors.password && (
            <div className="text-red-500">{errors.password}</div>
          )}

          <input
            className="box-border border m-2 p-2"
            name="number"
            type="text"
            placeholder="Number"
            value={number}
            onChange={handleNumberChange}
            required
          />
          {errors.number && <div className="text-red-500">{errors.number}</div>}
          <select
            className="box-border border m-2 p-2"
            name="fields"
            value={fields}
            onChange={handleFieldsChange}
          >
            <option value="" disabled>
              Select your field
            </option>
            <option value="Full Stack Developer">Full Stack Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
          </select>

          {errors.fields && <div className="text-red-500">{errors.fields}</div>}

          <button
            className="block py-3 px-5 bg-indigo-600 text-white text-sm leading-5 font-medium w-full rounded-md uppercase "
            type="submit"
          >
            Sign Up
          </button>
          <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800">
            <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
              Already have an account?{" "}
              <a
                onClick={switchToLogin}
                className="font-medium underline cursor-pointer"
                href="./login"
              >
                Sign In
              </a>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
