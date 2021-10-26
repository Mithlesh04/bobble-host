import { useState } from "react"
import ChooseCaptain from "./ChooseCaptain"
import './../../scss/bidding-game.scss'
import BiddingResponse from "./BiddingResponse"

function BiddingGame(){
    const [screenType,setScreenType] = useState('ChooseCaptain')
    return(
        <div className="bidding-game body-container">
                <div className="heading-game-type">
                    Bidding Game
                </div>
                {/* <div className="site-map">
                     Game Hub &#62; Bidding Game &#62; 
                    {
                        screenType === 'ChooseCaptain' ? 'captain assigning' : 
                        screenType === 'BiddingResponse' ? 'Bidding Response' : ''
                    }         
                </div> */}
            
            {
               screenType === 'ChooseCaptain'  ? <ChooseCaptain onStart={_=>setScreenType("BiddingResponse")} /> : 
               screenType === 'BiddingResponse'? <BiddingResponse/>: 'Bidding game'
            }
            
        </div>
    )
}

export default BiddingGame