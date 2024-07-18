import { Link, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";




const Navbar = () => {
    const {users,logout} = useAuth()
    const navigate = useNavigate()
    const links = <>
           {
              !users?.email && <><Link className="ml-4" to='/login'>Login</Link>
              <Link className="ml-4" to='/signup'>Signup</Link>
              </>  
           },
           {
             users?.email && <>
              <Link className="ml-4" to='/dashboard/wellcome'>Dashboard</Link>
             </>
           }   
    </>
const handlelogout = () => {
    logout()
      .then(() => {
        navigate('/login')
      })
      .catch(() => {
        
      });
  };

    return (
        <div className="navbar bg-base-100">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          {links}
      </ul>
    </div>
    <a className="btn btn-ghost text-xl">Cash Flow</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
       {links}
    </ul>
  </div>
  <div className="navbar-end">
    {users?.email &&  <a onClick={handlelogout} className="btn">Logout</a> }
  </div>
</div>
    );
};

export default Navbar;