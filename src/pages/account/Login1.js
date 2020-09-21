import React from "react";
import { Link } from "react-router-dom";
import AuthTemplate from "../../components/auth/AuthTemplate";
import AuthForm from "../../components/auth/AuthForm";

const Login = () => {
  return (
    <AuthTemplate>
      <AuthForm />
    </AuthTemplate>
    // <div className="container mt-5">
    //   <div className="row">
    //     <div
    //       className="col-lg-5 col-xl-4 d-flex justify-content-center align-items-start"
    //       style={{ margin: "0px auto" }}
    //     >
    //       <div className="card mb-3">
    //         <div className="card-body p-4">
    //           <h3>Log In</h3>
    //           <p className="font-weight-light text-secondary">
    //             Welcome! Please login to continue.
    //           </p>
    //           <hr />
    //           <form>
    //             <div className="form-group">
    //               <label className="font-size-sm" for="InputEmail">
    //                 Email address
    //               </label>
    //               <input
    //                 type="email"
    //                 className="form-control bg-gray-200 border-gray-200"
    //                 id="InputEmail"
    //                 placeholder="yourname@yourmail.com"
    //                 autocomplete="off"
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label className="font-size-sm" for="InputPassword">
    //                 Password
    //               </label>
    //               <input
    //                 type="password"
    //                 className="form-control bg-gray-200 border-gray-200"
    //                 id="InputPassword"
    //                 placeholder="Enter your password"
    //               />
    //             </div>
    //             <div className="form-group d-flex justify-content-between align-items-center">
    //               <div className="custom-control custom-checkbox">
    //                 <input
    //                   type="checkbox"
    //                   className="custom-control-input"
    //                   id="remember"
    //                 />
    //                 <label className="custom-control-label" for="remember">
    //                   Remember me
    //                 </label>
    //               </div>
    //               <a
    //                 href="forgot-password.html"
    //                 className="text-primary text-decoration-underline small"
    //               >
    //                 Forgot password ?
    //               </a>
    //             </div>
    //             <button type="button" className="btn btn-primary btn-block">
    //               LOG IN
    //             </button>
    //             <div className="divider-text">or</div>
    //             <button
    //               type="button"
    //               className="btn btn-sm btn-outline-primary btn-block has-icon"
    //             >
    //               <i className="fab fa-facebook"></i> Login with Facebook
    //             </button>
    //             <button
    //               type="button"
    //               className="btn btn-sm btn-outline-info btn-block has-icon"
    //             >
    //               <i className="fab fa-facebook"></i> Login with Twitter
    //             </button>
    //             <div className="small mt-4">
    //               Don't have an account ?
    //               <Link to="register">
    //                 Register
    //                 {/* <a className="text-decoration-underline">Register</a> */}
    //               </Link>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
