import React, { useState , useEffect } from 'react'
import axios from 'axios'
import { ArrowUpRight, MoonStar } from "lucide-react";


const App = () => {

const [userName, setuserName] = useState('');
const [userData, setuserData] = useState(null);
const [darkMode, setdarkMode] = useState(true);


useEffect(() => {

  const savedTheme = localStorage.getItem("theme")
  const savedUser = localStorage.getItem("githubUser")

  if(savedTheme !== null){
    setdarkMode(JSON.parse(savedTheme))
  }

  if(savedUser){
    setuserData(JSON.parse(savedUser))
  }

}, [])


useEffect(() => {
  localStorage.setItem("theme", JSON.stringify(darkMode))
}, [darkMode])



const searchUser = async ()=>{
   if(userName === "") {
   alert("Enter username")
   return
   }

try{
  const response   = await axios.get(`https://api.github.com/users/${userName}`)
 setuserData(response.data)

  localStorage.setItem("githubUser", JSON.stringify(response.data))


}
catch(error){
  alert("User Not Found")
}
}


const submitHandler=(e)=>{
  e.preventDefault()
  setuserName('')
}

const deleteData = ()=>{
  localStorage.removeItem("githubUser")
  setuserData(null)
}



  return (
    <div className={`h-screen w-full bg-black flex flex-col items-center  text-white p-5  ${
    darkMode ? "bg-black text-white" : "bg-white text-black"
  }`}>
     
      <form className={`w-full max-w-[700px]  rounded-[50px] py-2 px-2 flex md:flex-row justify-between  ${
    darkMode ? "bg-white " : "bg-black"
  }` }onSubmit={submitHandler}>
       <input className={`border-none px-9 rounded-3xl py-3 outline-none w-full md:w-[300px] ${darkMode ? "bg-black text-white" : "bg-white text-black"}`} type="text" placeholder='Enter Profile Name' value={userName} onChange={(e)=>
        setuserName(e.target.value)
       } />

<button className={` px-3 py-1.5 rounded-full active:shadow-[1px_1px_10px_black]  shadow-[1px_1px_20px_black] active:scale-90 ${darkMode ? "bg-black text-white" : "bg-white text-black"}`} onClick={()=>setdarkMode(!darkMode)}><MoonStar /></button>

      <button className={`px-6.5 py-2.5 rounded-4xl ${darkMode ? "bg-black text-white" : "bg-white text-black"}`} onClick={searchUser}>Search</button>
     
</form>




 {userData && (
<div className='flex items-center justify-center mt-16'>
<div
  className={` w-[230px] p-5 m-4 flex items-center flex-col gap-1.5 rounded-[20px]  ${
    darkMode ? "bg-white text-black shadow-[1px_1px_18px_blue]" : "bg-black text-white shadow-[1px_1px_18px_black]"
  }`}
>

<img className='h-[90px] w-[90px] rounded-full' src={userData.avatar_url} width="150"/>

<h2 className='text-[20px] mt-1.5 font-semibold'>{userData.name}</h2>
<p className='font-semibold'>Followers: {userData.followers}</p>
<p className='font-semibold'>Following: {userData.following}</p>
 <button
  onClick={() => window.open(userData.html_url, "_blank")}
  className={` bg-transparent border-2 px-2.5 py-1 text-[10px] mt-1.5 font-medium  rounded-xl whitespace-nowrap flex items-center gap-3 ${darkMode? "text-black  border-black" : "text-white  border-white"}`}
>
  View Profile <ArrowUpRight className={` p-1 rounded-full ${darkMode? "bg-black text-white" : "bg-white text-black"}`} size={25} />
</button>

<button
onClick={deleteData}
className='mt-3 text-[10px] bg-red-500 text-white px-3 py-1.5 rounded-lg'
>

Delete

</button>


</div>
</div>
 )}
    </div>
  )
}

export default App

