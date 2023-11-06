import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
// import { MdEmail } from 'react-icons/md';
// import { AiFillUnlock } from "react-icons/ai";
const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { Login } = useAuth();


    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password")

        // login
        console.log(email, password)
        Login(email, password)
            .then(result => {
                console.log(result.user)
                Swal.fire('Success!', 'Login Successful', 'success')
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                console.log(error);
                Swal.fire('Login Failed!', 'Please make sure your  Email and Password is correct', 'error')
            })
    }


    return (
        <div>
            <div className="flex flex-wrap w-full">
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                        <form onSubmit={handleLogin} className="card-body shadow-2xl rounded-xl">
                            <h1 className="text-3xl font-semibold">Login Now!!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className=" form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password" placeholder="password" className="input input-bordered w-full" required />
                                    <span className="absolute  left-[480px] top-[370px] cursor-pointer" onClick={() => { setShowPassword(!showPassword) }} >
                                        {
                                            showPassword ? <AiFillEye className="text-2xl " /> : <AiFillEyeInvisible className="text-2xl " />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div className="my-4 text-center">
                            <p>
                                Don&#x27;t have an account?
                                <Link to={"/register"} className="font-semibold underline text-blue-800">
                                    Register here.
                                </Link>
                            </p>
                        </div>
                        <div className=" divider">Singup with Social Accounts</div>
                        <SocialLogin></SocialLogin>
                    </div>

                </div>
                <div className="w-1/2 shadow-2xl">
                    <img className="hidden object-cover w-full h-screen md:block" src="https://i.ibb.co/ynvfh8v/job-board-software.png" />
                </div>
            </div>
        </div>
    );
};

export default Login;