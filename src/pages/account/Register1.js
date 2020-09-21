import React from "react";
import { Link } from "react-router-dom";
import AuthTemplate from "../../components/auth/AuthTemplate";
import AuthForm from "../../components/auth/AuthForm";

const Register = () => {
  return (
    <AuthTemplate>
      <AuthForm />
    </AuthTemplate>
    // <div>
    //   <div className="container mt-5">
    //     <div className="row">
    //       <div
    //         className="col-lg-5 col-xl-4 d-flex justify-content-center align-items-start"
    //         style={{ margin: "0px auto" }}
    //       >
    //         <div className="card mb-3">
    //           <div className="card-body p-4">
    //             <h3>Create New Account!</h3>
    //             <p className="font-weight-light text-secondary">
    //               회원가입 하시고 서비스를 이용해보세요.
    //             </p>
    //             <hr />
    //             <form>
    //               <div className="form-group">
    //                 <label className="font-size-sm" for="InputLastname">
    //                   Last Name
    //                 </label>
    //                 <input
    //                   type="text"
    //                   className="form-control bg-gray-200 border-gray-200"
    //                   id="InputLastname"
    //                   placeholder="Last Name"
    //                   autocomplete="off"
    //                 />
    //                 <label className="font-size-sm" for="InputFirstname">
    //                   First Name
    //                 </label>
    //                 <input
    //                   type="text"
    //                   className="form-control bg-gray-200 border-gray-200"
    //                   id="InputFirstname"
    //                   placeholder="First Name"
    //                   autocomplete="off"
    //                 />
    //               </div>
    //               <div className="form-group">
    //                 <label className="font-size-sm" for="InputEmail">
    //                   Email address
    //                 </label>
    //                 <input
    //                   type="email"
    //                   className="form-control bg-gray-200 border-gray-200"
    //                   id="InputEmail"
    //                   placeholder="yourname@yourmail.com"
    //                   autocomplete="off"
    //                 />
    //               </div>
    //               <div className="form-group">
    //                 <label className="font-size-sm" for="InputPassword">
    //                   Password
    //                 </label>
    //                 <input
    //                   type="password"
    //                   className="form-control bg-gray-200 border-gray-200"
    //                   id="InputPassword"
    //                   placeholder="Enter your password"
    //                 />
    //               </div>
    //               <div className="form-group">
    //                 <div className="custom-control custom-checkbox">
    //                   <input
    //                     type="checkbox"
    //                     className="custom-control-input"
    //                     id="agreeCheck"
    //                   />
    //                   <label className="custom-control-label" for="agreeCheck">
    //                     I agree with{" "}
    //                   </label>
    //                   <a href="javascript:void(0)">
    //                     <u>terms and conditions</u>
    //                   </a>
    //                 </div>
    //               </div>
    //               <button type="button" className="btn btn-primary btn-block">
    //                 CREATE NEW ACCOUNT
    //               </button>
    //               <div className="divider-text">or register with</div>
    //               <button
    //                 type="button"
    //                 className="btn btn-sm btn-outline-primary btn-block has-icon"
    //               >
    //                 <i className="fab fa-facebook"></i> Facebook
    //               </button>
    //               <button
    //                 type="button"
    //                 className="btn btn-sm btn-outline-info btn-block has-icon"
    //               >
    //                 <i className="fab fa-facebook"></i> Twitter
    //               </button>
    //               <div className="small mt-4">
    //                 Already have an account ?
    //                 <Link to="login">
    //                   <a className="text-decoration-underline">Login</a>
    //                 </Link>
    //               </div>
    //             </form>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Register;
