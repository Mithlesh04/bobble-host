import React, { useEffect, useState } from "react"
import ConfirmDialog from "../../global/ConfirmDialog"
import './../../scss/voting-game.scss'
import GetTeamsData from './../../global/GetTeamsData'

import SocketApis from "../../api/sockets/SocketApis"

const Checked = ()=>{
    return(
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.68235 7.58213L0.32586 4.33214C0.124209 4.13688 0.124209 3.8203 0.32586 3.62503L1.05612 2.91792C1.25777 2.72265 1.58475 2.72265 1.7864 2.91792L4.04749 5.10725L8.8905 0.417925C9.09216 0.222671 9.41913 0.222671 9.62078 0.417925L10.351 1.12503C10.5527 1.32029 10.5527 1.63687 10.351 1.83214L4.41263 7.58215C4.21096 7.7774 3.884 7.7774 3.68235 7.58213Z" fill="black"/>
        </svg>

    )
}


var handleGetVotingResultsInterval = null

function Results({ gameData , payload }) {

    const [isGameEnded,setIsGameEnded] = useState(false)

    const [columns, setColumns] = useState(['teamName', 'teamColor', 'playersCount', 'option1', 'option2', 'noVote'])

    const [teamResponse, setTeamResponse] = useState(
        [
            {
                teamName: 'Team 1',
                teamColor: 'red',
                playersCount: 5,
                option1: 1,
                option2: 2,
                noVote: 2
            },
            {
                teamName: 'Team 2',
                teamColor: 'blue',
                playersCount: 5,
                option1: 1,
                option2: 2,
                noVote: 2
            },
            {
                teamName: 'Team 3',
                teamColor: 'green',
                playersCount: 5,
                option1: 1,
                option2: 2,
                noVote: 2
            },
            {
                teamName: 'Team 4',
                teamColor: 'pink',
                playersCount: 5,
                option1: 1,
                option2: 2,
                noVote: 2
            },
        ]
    )

    const [teamList, setTeamList] = useState(['Team1', 'Team2', 'Team3'])//get from prev

    const [teamsColumns,setTeamsColumns] = useState(['playerName','option1','option2','option3','option4','noVote'])//get from prev

    const [teamsData, setTeamsData] = useState({
        team1: [
            {
                playerName : 'Player 1',
                option1 : true,
                option2 : false,
                option3 : false,
                option4 : false,
                noVote : false,
            },
            {
                playerName : 'Player 2',
                option1 : false,
                option2 : true,
                option3 : false,
                option4 : false,
                noVote : false,
            },
            {
                playerName : 'Player 3',
                option1 : false,
                option2 : false,
                option3 : false,
                option4 : false,
                noVote : true,
            },
        ]
    })

    const [selectedTeam,setSelectedTeam] = useState('team1')
    const [selectTeamsPlayerResponse, setSelectTeamsPlayerResponse] = useState([])

    useEffect(()=>{
      setSelectTeamsPlayerResponse(teamsData[selectedTeam] || [])
    },[selectedTeam])

    useEffect(()=>{
        if('object'===typeof payload){
            let teamids = String(payload.teamid).split(',') || []
            let teamNames = [] , teamresp = []
            for(let id of teamids){
                let team = GetTeamsData('id',Number(id))
                teamNames.push(team.name)
                teamresp.push({
                    teamName: team.name,
                    teamColor: team.teamColor,
                    playersCount: null,
                    option1: null,
                    option2: null,
                    noVote: null
                })
            }

            setTeamList(teamNames)
        }
    },[payload])

    useEffect(()=>{
        console.log("result_gameData = ",gameData)
    },[])

    const handleGetVotingResults = async (data)=>{
        // console.log("handleGetVotingResults_______data = ",data)
        // if(data.status===1){
        //     let d = data.data || []
        // }
        let d = [
                    {
                        "id": 277,
                        "votingid": "43",
                        "sessionid": "dpOjQUsDfiV2vmfVRmoVg==",
                        "gamesessionid": 123,
                        "result": "A",
                        "pin": "yaXsT",
                        "date": "2021-10-26T10:02:25.000Z",
                        "teamid": "1"
                    },
                    {
                        "id": 277,
                        "votingid": "43",
                        "sessionid": "dpOjQUsDfiV2vmfVRmoVg==",
                        "gamesessionid": 123,
                        "result": "B",
                        "pin": "yaXsT",
                        "date": "2021-10-26T10:02:25.000Z",
                        "teamid": "2"
                    },
                    {
                        "id": 277,
                        "votingid": "43",
                        "sessionid": "dpOjQUZsDfi2vmfVRmoVg==",
                        "gamesessionid": 123,
                        "result": "B",
                        "pin": "yaXsT",
                        "date": "2021-10-26T10:02:25.000Z",
                        "teamid": "3"
                    },
                    {
                        "id": 277,
                        "votingid": "43",
                        "sessionid": "dpOjQUZsDfiV2vfVRmoVg==",
                        "gamesessionid": 123,
                        "result": "C",
                        "pin": "yaXsT",
                        "date": "2021-10-26T10:02:25.000Z",
                        "teamid": "1"
                    },
                    {
                        "id": 277,
                        "votingid": "43",
                        "sessionid": "dpOjQUZsDfiVvmfVRmoVg==",
                        "gamesessionid": 123,
                        "result": "C",
                        "pin": "yaXsT",
                        "date": "2021-10-26T10:02:25.000Z",
                        "teamid": "1"
                    },
                    {
                        "id": 277,
                        "votingid": "43",
                        "sessionid": "dpOjQUZsfiV2vmfVRmoVg==",
                        "gamesessionid": 123,
                        "result": "C",
                        "pin": "yaXsT",
                        "date": "2021-10-26T10:02:25.000Z",
                        "teamid": "1"
                    },
          ]

        let length = d.length
        
        console.log("payload = ",payload)
        

        console.log("d = ",d)





    }

    useEffect(()=>{
        handleGetVotingResults()
        if(!handleGetVotingResultsInterval){
            // handleGetVotingResultsInterval = setInterval(_=>{
            //     let payload = {pin:gameData.pin,votingid:gameData.id}
            //     console.log("payload = ",payload)
                // SocketApis().GetVotingGameResult(payload,handleGetVotingResults)
            // },2000) 
        }
    },[])

    return (
        <div className="container-fluid border border-gray pb-5 py-3 px-5" style={{ borderRadius: 20, fontFamily: 'Nunito' }}>
            <div className="border border-gray border-top-0 border-left-0 border-right-0" style={{fontSize: 32 }}>
                Simple Voting Game
            </div>

            <div className="pt-5">
                <div style={{ fontSize: 18 }}>Team Response</div>
                <div className="w-75 pt-2" style={{ fontSize: 16 }}>
                    <table style={{ width: '100%' }} className="team-response-table">
                        <thead>
                            <tr>
                                {
                                    columns.map((keys, index) => {
                                        return (
                                            <th key={index + Math.random()}>
                                                {String(keys).replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase()).trim()}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>

                            {
                                teamResponse.map((keys, index) => {
                                    return (
                                        <tr key={index + keys + Math.random()}>
                                            {
                                                columns.map((col, index) => {
                                                    return (
                                                        <td key={index + Math.random()} className={col}>
                                                            {
                                                                col === 'teamColor' ? <div style={{ background: keys[col] }}></div> : keys[col]
                                                            }

                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

            <div className="pt-5">
                <div>Players Response</div>
                <div className="py-2 " style={{width:200}}>
                    <select onChange={e=>setSelectedTeam(String(e.target.value).toLowerCase().replace(' ',''))} class="form-select form-select-sm" aria-label="form-select-sm example">
                        {
                            teamList.map((teamName,index)=>{
                                return(
                                    <option selected={selectedTeam===teamName.toLowerCase().replace(' ','')} key={teamName+index+Math.random()}>{teamName}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="w-75 pt-2" style={{ fontSize: 16 }}>
                    <table style={{ width: '100%' }} className="team-response-table">
                        <thead>
                            <tr>
                                {
                                   teamsColumns.map((col,index)=>{
                                       return(
                                           <th key={index+col+Math.random()}>
                                               {String(col).replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase()).trim()}
                                           </th>
                                       )
                                   }) 
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (selectTeamsPlayerResponse || []).map((keys,index)=>{
                                    return(
                                        <tr key={index+Math.random}>
                                            {teamsColumns.map((col,index)=>{
                                                return(
                                                    <td key={col+Math.random()}>
                                                        {keys[col]===true ? <Checked /> : keys[col]}   
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row justify-content-right pt-5">
              <div className="col-3"><button className="btn p-2 px-4" style={{color:'#fff',background:'#5560AF', borderRadius : 10}}>Ask another Question</button></div>
              <div className="col-3"><button onClick={_=>setIsGameEnded(true)} className="btn p-2 px-4" style={{color:'#fff',background:'#DC7874', borderRadius : 10}}>End Game</button></div>
            </div>

            {
                isGameEnded ? 
                    <ConfirmDialog isOpen={isGameEnded} body="Are you sure do you want to end this game." onClick={status=>{
                        setIsGameEnded(!status)
                        console.log('status = ',status)
                    }} />
                : null
            }
        </div>
    )
}

export default Results