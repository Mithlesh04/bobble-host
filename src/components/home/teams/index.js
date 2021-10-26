import { useState , useEffect } from 'react'
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme"
import Experience from "./Experience"
import ManagePlayers from "./ManagePlayers";

function MangeTeams({ setPIN }){
   const [screen,setScreen] = useState("Experience")
   useEffect(()=>{
        if(screen === 'ManagePlayers'){
            if(setPIN){
                setPIN(true)
            }
        }
   },[screen])
   return(
        <>
            {
                screen === 'ManagePlayers' ? <ManagePlayers /> : 
                screen === 'Experience' ? <Experience onClickExperience={_=>setScreen('ManagePlayers')}/> :
                screen === 'ManagePlayers' ? <ManagePlayers /> : ''
            }  
            
        </>
    )
}

export default MangeTeams