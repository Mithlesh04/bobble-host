import { useState } from "react"
import { CreateGameSession } from "./../api/AjaxApi"
import VotingGame from "./voting-game"
import BiddingGame from "./bidding-game"
import MiniGames from "./MiniGames"

function GamesHandlers(){
    const [screen,setScreen] = useState('') // ''
    const [isLaunchgame,setIsLaunchgame] = useState(false) //false

    const [resCreateGameSession,setResCreateGameSession] = useState({})

    const handleLaunch = async (gameId)=>{
        const res = await CreateGameSession({gameid:gameId})
        if(res && res.status===1){
            setIsLaunchgame(true)
            setScreen('VotingGame')
        }
        console.log("CreateGameSession = ",res)
        
        setResCreateGameSession(res.data[0])

    }
    
    const handleGamePayload = (payload)=>{
        if(payload.id===1){
           handleLaunch(String(payload.id))
        }

        console.log("selected game = ",payload)

    }
    return(
        isLaunchgame ?
            <>
                {
                    screen === 'VotingGame' ? <VotingGame gameData={resCreateGameSession} /> : 
                    screen === 'BiddingGame' ? <BiddingGame gameData={resCreateGameSession} /> : 'game not found'
                }
            </>
        :
        <MiniGames onLaunch={handleGamePayload} />
    )
}

export default GamesHandlers