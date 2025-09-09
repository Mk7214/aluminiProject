import { useEffect } from "react"
import { useUser } from "../store/userStore"


const setUser = useUser(state => state.setUser);
export const authProvider = async(){
  try{
  const res = await fetch("/user/getUser",{
  credentials:"include",
  })
  if(res.ok){
  const user = res.json(),
  setUser(user);
  }
}catch(err){
  console.log("failed to fetchuser:",err)
}

}
