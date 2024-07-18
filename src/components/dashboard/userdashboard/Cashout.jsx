

import useAuth from "../../useAuth";
import { useEffect, useState } from "react";
import useAxiospublic from "../../hooks/useAxiospublic";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2'

const Cashout = () => {
    const {users} = useAuth()
  const [flag,setFlag] = useState(false)
  const axiosPublic = useAxiospublic()
  let [taka,setTaka] = useState(0);
  const [count,setCount] = useState(0)
    const { data: userx = [], isLoading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
          try {
            const res = await axiosPublic.get(`/users/${users?.email}`);
            return res.data;
          } catch (err) {
            console.error(err);
            return []; 
          }
        }
      });

      let {phone} = userx 
     
    
      if (isLoading) {
        return <div>Loading...</div>; 
      }
      useEffect(() => {
        if (userx && userx.balanced !== undefined) {
          setTaka(parseInt(userx.balanced));
          setCount(count + 1)
        }
      }, [taka])
      
   

  const sentmoney = (event)=>{
    event.preventDefault();
    const form = event.target;
    const phones = form.phone.value;
    const password = form.password.value;
    const money = parseInt(form.money.value )
    const email = users?.email
    const info = {
      email : email,
      pin: password
    }

    
    async function loginUser(info) {
      try {
        const res = await axiosPublic.post('/loginuser', info);
        setFlag(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
       loginUser(info)

       if(!flag){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Pin is wrong!",
            footer: 'please give correct pin'
          });
          return
    }
    
        if(money > taka){
        
            Swal.fire({
                icon: "error",
                title: "You have not allow",
                text: "not enough money to send",
                footer: 'Again try'
              });
              return
        }
        else{
            
            let charge = 0;
            charge = parseFloat((money * 1.5) / 100)
            // console.log(charge) 
            if(charge + money > taka){
                Swal.fire({
                    icon: "error",
                    title: "You have not allow",
                    text: "not enough money to cashout",
                    footer: 'thank you'
                  });
                return
            }
             
             const info1 = {
                 to:phones,
                 from: phone,
                 email:email,
                 method:"cashout",
                 charge: charge,
                 money: money,
                 status:"incomplete"
             }
            axiosPublic.post('/cash',info1)
            .then(res=>{
                console.log(res)
                Swal.fire({
                    icon: "sucess",
                    title: "when aganet parmet cashout",
                    text: "please wait",
                    footer: 'thank you'
                  });
            })
            .catch(err=>{
                console.log(err)
            })
            axiosPublic.post('/transfer',info1)
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
  }
    return (
        <div className="hero min-h-screen bg-base-200  bg-[url('')] ">
        <div className="hero-content flex-col lg:flex-row">
          {<div className="mr-12 w-1/2">
            {/* <img src="https://i.ibb.co/T2cpBd5/888.jpg" alt="" /> */}
          </div> }
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form  onSubmit={sentmoney} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  placeholder="phone number"
                  className="input input-bordered"
                  name="phone"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Money</span>
                </label>
                <input
                  type="number"
                  placeholder="sent amount"
                  className="input input-bordered"
                  name="money"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">pin</span>
                </label>
                <input
                  type="tel"
                  placeholder="pin number"
                  className="input input-bordered"
                  name="password"
                  required
                />
                
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Cashout</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    );
};

export default Cashout;