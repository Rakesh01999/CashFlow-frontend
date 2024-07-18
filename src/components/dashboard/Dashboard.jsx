// --------- nf-dashboard ---------

import { useQuery } from "@tanstack/react-query";
import useAxiosSexure from "../hooks/useAxiosSexure";
import useAuth from "../useAuth";
import { NavLink, Outlet } from "react-router-dom";



const Dashboard = () => {
    const {users} = useAuth()
    const axiosSecure = useAxiosSexure()
    const { data: userx = [], isLoading} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
          try {
            const res = await axiosSecure.get(`/users/${users?.email}`);
            return res.data;
          } catch (err) {
            console.error(err);
            return []; 
          }
        }
      });
    
      if (isLoading) {
        return <div>Loading...</div>; 
      }
      
   
    return (
        <div>
            <div className="flex">
            {/* side bar */}
            <div className="w-64 min-h-screen bg-blue-600 text-white">
            <ul className="menu p-4">
            <li><NavLink to='/dashboard/wellcome'>your profile</NavLink></li>
              {
                 userx?.role ==='user' && <>
                    <li><NavLink to='/dashboard/user'>Send money</NavLink></li>
                    <li><NavLink to='/dashboard/cashout'>Cash out</NavLink></li>
                    <li><NavLink to='/dashboard/cashin'>Cash In</NavLink></li>
                    <li> <NavLink to='/dashboard/checkbalance'>Check balanced</NavLink> </li>
                 </>
              }
            
              {
                userx?.role === 'user' && <>
                <li><NavLink to='/dashboard/balance'>History</NavLink></li>
                </>
              }
              {
                 userx?.role === 'admin' && <>
                   <li><NavLink to='/dashboard/admin'>Transaction detail</NavLink></li>
                   <li><NavLink to='/dashboard/adminpermit'>Admin management</NavLink></li>
                 </>
              }
               {
                 userx?.role === 'agent' && <>
                   <li> <NavLink to='/dashboard/checkbalance'>Check balanced</NavLink> </li>
                   <li> <NavLink to='/dashboard/agentmanage'>Management</NavLink> </li>
                   <li> <NavLink to='/dashboard/agentbalanced'>History</NavLink> </li>
                 </>
              }
             
               <div className="divider divider-neutral"></div>
               <li> <NavLink to='/'>Home</NavLink> </li>
            </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;


