import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { CreateUser, UpdateProfile } = useAuth();

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log(e.currentTarget);
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password")
        const name = form.get("name")
        const photo = form.get("photo")
        // password validation
        if (!/^(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$/.test(password)) {
            return Swal.fire("Error!", `Password should be At least 8 characters, including at least one uppercase letter and at least one special character`, "error");

        }
        console.log(name, photo);
        // create user
        CreateUser(email, password)
            .then(result => {
                UpdateProfile(name, photo)
                    .then(() => {
                        Swal.fire('Congratulation!', 'Registration Successful!', 'success')
                        navigate('/');
                    })
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
                const message = error.message
                Swal.fire('Error!', `${message.slice(10, 50)}`, 'error')
            })
    }

    return (
        <div >
            <div className="flex flex-wrap w-full">
                <div className="flex flex-col w-full md:w-1/2">
                    <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
                        <form onSubmit={handleRegister} className="card-body shadow-2xl rounded-xl ">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                            </div>
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
                                <div >
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password" placeholder="password" className="input input-bordered w-full" required />
                                    <span className="absolute  left-[480px] top-[420px] cursor-pointer" onClick={() => { setShowPassword(!showPassword) }} >
                                        {
                                            showPassword ? <AiFillEye className="text-2xl " /> : <AiFillEyeInvisible className="text-2xl " />
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered " required />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Register</button>
                            </div>
                            <p className="text-center">Already have an account? <Link to={"/login"} className="font-semibold text-blue-600 underline" >LogIn</Link> </p>
                        </form>
                    </div>
                </div>
                <div className="w-1/2 shadow-2xl">
                    <img className="hidden object-cover w-full h-screen md:block" src="https://i.ibb.co/ynvfh8v/job-board-software.png" />
                </div>
            </div>
        </div>
    );
};

export default Register;
