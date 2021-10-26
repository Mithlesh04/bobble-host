
import React, { useState } from 'react';
import ConfirmDialog from '../../global/ConfirmDialog';

function BiddingResponse(){
    const [openModal,setOpenModal] = useState(false)
    const [isWaitingForResponses,setIsWaitingForResponses] = useState(false)
    return(
        <>
            <div className="sub-heading">Bidding Responses</div>
            <div className="bidding-response">
                
                {
                    openModal ? 
                        <ConfirmDialog body="Return to Game Hub and Erase The Data" isOpen={openModal} onClick={status=>setOpenModal(false)} />
                    : null
                }
                <table cellSpacing={0} cellPadding={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Team1</th>
                            <th>Team2</th>
                            <th>Team3</th>
                            <th>Team4</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Lives Left</td>
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Starting Bobbies</td>
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Round 1 Bid</td>
                            <td>3</td>
                            <td className="highlight">2</td>
                            <td>3</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Remaining</td>
                            <td>3</td>
                            <td>2</td>
                            <td>3</td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
                <div className="bidding-handle-buttons">
                    <div><button disabled={isWaitingForResponses}>
                        {
                            isWaitingForResponses 
                            ? 
                                'Waiting for Responses'
                            :  
                                'Start Next Round'
                        }
                        
                      </button></div>
                    <div><button onClick={_=>setOpenModal(true)}>End Game</button></div>
                </div>
            </div>
        </>
    )

}

export default BiddingResponse