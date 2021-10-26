import { Box, Button , Paper, Grid , styled} from '@mui/material';

import { ReactComponent as PlayersButtonIcon } from "./../../assets/bidding-games/PlayersButtonIcon.svg"
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow : 'unset'
}));


const TEMP_TEAM = {
    'TEAM 1' : ['Player 6','Player 7'],
    'TEAM 2' : ['Player 13','Player 14','Player 13','Player 14','Player 13','Player 14',],
    'TEAM 3' : ['Player 13','Player 14','Player 13','Player 14','Player 13','Player 14',],
    'TEAM 4' : ['Player 6','Player 7','Player 7','Player 7','Player 7','Player 7','Player 7'],
}

const TEAM_COLORS = ['rgba(232, 115, 111, 0.5)','rgba(75, 208, 163, 0.47)','#F9E6F8','#FCF4DE']

const GetTeam = ({teamName,index}) =>{
    const [selectedCaptain,setSelectedCaptain] = useState('')
    return ( 
     <div>
        <div className="team-column">
        <div className="team-name">
            <button style={{background:TEAM_COLORS[index]}}>{teamName}</button>
        </div>
        <div className="players-list">
            {
                TEMP_TEAM[teamName].map((players,index)=>{
                    let key = players+index
                    return <button onClick={_=>setSelectedCaptain(key)} key={key} className={selectedCaptain===key ? "selected-team-captain" : ''}><PlayersButtonIcon />{players}</button>
                })
            }
        </div>
      </div>

     </div>
    )
}

function ChooseCaptain({ onStart }) {

    return (
        <div>
            <div className="sub-heading">Choose 1 captain from each team</div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {
                        Object.keys(TEMP_TEAM).map((teamName,index)=>{
                            return <Grid item key={teamName+index}>
                                <Item>
                                    <GetTeam teamName={teamName} index={index} />
                                </Item>
                            </Grid>
                        })
                    }

                </Grid>
            </Box>
            <div className="start-bidding-button">
                <Button onClick={onStart}>Start Bidding</Button>
            </div>

        </div>
    )
}


export default ChooseCaptain