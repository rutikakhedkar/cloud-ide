import { Button } from "../../ui/button"
import { Input } from "../../ui/Input"
import { Github } from "lucide-react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from "react"
import { toast } from "react-toastify"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


export function SignupForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


 const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

  const handleGoogleAuth = async () => {
    console.log('clicked google')
    window.location.href = "http://localhost:5000/auth/google";
  }

  const handleGithubAuth = async () => {
    console.log('clicked github')
    window.location.href = "http://localhost:5000/auth/github";
  }
  
    const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/register",{
        email,
        password
      });
      if(res.status===200){
        toast.success("Registered successfully!");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Logo */}
      <div className="flex items-center space-x-2 text-white">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
          <span className="text-white font-bold text-lg">⚡</span>
        </div>
        <span className="text-xl font-semibold">StackBlitz</span>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Get Started</h1>
        <p className="text-gray-400">Create your StackBlitz account.</p>
      </div>

      {/* OAuth Buttons */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700" onClick={handleGithubAuth}>
          <Github className="w-5 h-5 mr-2" />
          Sign up with GitHub
        </Button>

        <Button variant="outline" className="w-full bg-gray-800 border-gray-700 text-white hover:bg-gray-700" onClick={handleGoogleAuth}>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </Button>

      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-900 px-2 text-gray-400">or</span>
        </div>
      </div>
 <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={RegisterSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Logging in with:", values);
        handleRegister();
        setSubmitting(false);
      }}
    >
      {/* Signup Form */}
      <Form  className="space-y-4 flex flex-col border-gray-700">
        
        <Field
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
        />
           <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />


        <Field
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
        /> <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

        <Field
          type="password"
           name="confirmPassword"
           value={confirmPassword}
          placeholder="Password confirmation"
          onchange={(e) => setConfirmPassword(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
        />
        <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm"
            />

        <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white border border-gray-700" type="submit" >Sign Up</Button>
      </Form>
      </Formik>

      {/* Links */}
      <div className="text-sm">
        <Link to="/" className="text-gray-400 hover:text-white underline">
          Have an account? Sign in.
        </Link>
      </div>

    </div>
  )
}
