

import { useQuery } from '@tanstack/react-query';
import useAuth from '../../useAuth';
import useAxiospublic from '../../hooks/useAxiospublic';
import Swal from 'sweetalert2'

const fetchMobileData = async () => {
  const response = await fetch('https://cash-flow-backend-lilac.vercel.app/mobile');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Agentmanagement = () => {
  const {users} = useAuth()
  const axiosPublic = useAxiospublic()
  const fetchUserData = async () => {
    try {
      const res = await axiosPublic.get(`/users/${users?.email}`);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const { data: userx = []} = useQuery({
    queryKey: ['menu',users?.email],
    queryFn:fetchUserData,
  });
  
  let {balanced} = userx
  
  const { data, error, isLoading,refetch } = useQuery({
    queryKey: ['mobileData'],
    queryFn: fetchMobileData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
 
  const handleMakeAdmin = (method,id,email,from,money,charge) =>{
 
    const info = {
       id,customar:email,from,money,method,agent:users?.email,charge
    }

    if(method === 'cashIn'){
      if(balanced > money){
         console.log(balanced,money)
          axiosPublic.patch('/updatemoney',info)
          .then(()=>{
            Swal.fire({
              icon: "success",
              title: "yaa...",
              text: "Cash in",
              footer: 'thank you'
            });
            refetch()
          })
          .catch()
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You not enough money!",
          footer: 'please add taka your account'
        });
        return
      }
  }
  else{
    axiosPublic.patch('/updatemoney1',info)
    .then(()=>{
      Swal.fire({
        icon: "success",
        title: "yaa...",
        text: "Cash Out",
        footer: 'thank you'
      });
      refetch()
    })
    .catch()
  }
     
  };

 



  return (
    <div>
      
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr key={user._id}>
                {
                   user.status == "incomplete" && <>
                   <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                   </>
                }
                <td>
                   {
                     user.status == "incomplete" && <div className="space-x-2 space-y-2">
                      <button onClick={()=>handleMakeAdmin(user.method,user._id,user.email,user.from,user.money,user.charge)} className="btn btn-primary">please accept :
                      {user.method}{user.money}</button>
                     </div>
            
                   }
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default Agentmanagement;


