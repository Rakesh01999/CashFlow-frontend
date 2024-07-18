import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Authprovider from './components/Authprovider.jsx'
import Main from './components/Main.jsx'
import Home from './components/Home.jsx'
const queryClient = new QueryClient()
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Registration from './components/Registration.jsx'
import Login from './components/Login.jsx'
import Privateroute from './components/Privateroute.jsx'
import Wellcome from './components/dashboard/userdashboard/Wellcome.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import Usersent from './components/dashboard/userdashboard/Usersent.jsx'
import Admin from './components/dashboard/admindashboard/Admin.jsx'
import Agent from './components/dashboard/agentdashboard/Agent.jsx'
import Cashout from './components/dashboard/userdashboard/Cashout.jsx'
import CashIn from './components/dashboard/userdashboard/CashIn.jsx'
import Balance from './components/dashboard/userdashboard/Balance.jsx'
import Checkbalance from './components/dashboard/userdashboard/Checkbalance.jsx'
import Agentbalanced from './components/dashboard/agentdashboard/Agentbalanced.jsx'
import AgentManagement from './components/dashboard/agentdashboard/Agentmanagement.jsx'
import Adminpermit from './components/dashboard/admindashboard/Adminpermit.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signup",
        element:<Registration></Registration>
      },

    ]
  },
  {
    path:'dashboard',
    element: <Privateroute><Dashboard></Dashboard></Privateroute>,
    children:[
       {
         path:'wellcome',
         element:<Wellcome></Wellcome>
       },
       {
         path:'user',
         element:<Usersent></Usersent>,
       },
       {
         path:'cashout',
         element:<Cashout></Cashout>
       },
       {
         path:'cashin',
         element:<CashIn></CashIn>
       },
       {
         path:'balance',
         element: <Balance></Balance>
       },
       {
          path:'checkbalance',
          element:<Checkbalance></Checkbalance>
       },
       {
         path:'admin',
         element:<Admin></Admin>
       },
       {
        path:'agent',
        element:<Agent></Agent>
       },
       {
         path:'agentbalanced',
         element:<Agentbalanced></Agentbalanced>
       },
       {
         path:'agentmanage',
         element:<AgentManagement></AgentManagement>,
         loader:()=>fetch(`https://cash-flow-backend-lilac.vercel.app/mobile`)
       },
       {
         path:'adminpermit',
         element:<Adminpermit></Adminpermit>
       }
    ]
   
 }
 
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Authprovider>
      <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
      </QueryClientProvider>
    </Authprovider>
  </React.StrictMode>,
)
