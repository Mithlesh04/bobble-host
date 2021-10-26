
import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import SocketApis from '../../api/sockets/SocketApis'
import GetTeamData from '../../global/GetTeamsData';
import { GetAllTeams , GetPlayerprefer , CreatePlayerfinalprefer } from '../../api/AjaxApi';
import { MdExposurePlus1 } from 'react-icons/md';

const applyDrag = (arr, dragResult,teamsId) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (removedIndex === null && addedIndex === null) return arr;
    const result = [...arr];
    let itemToAdd = payload;
  
    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }
  
    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    if(teamsId && addedIndex!==null && addedIndex!==''){
        console.log('teamsId = ',teamsId,dragResult)
    }
  
    return result;

  };
 

function createTeam(count){
    const teams = {}
    for(let i=0;i<count;++i){
        let teamId = 'teamId'+i
        teams[teamId] = {
            teamName : 'Team'+i,
            teamId : teamId,
            teamColor : '#E8736F',
            players : createPlayers(0)
        }
    }
    return teams
}

function createPlayers(count){
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push({
          name : 'Player-'+i,
          sessionid : 'sessionid'+i,
          teamColor : '#000'
      });
    }
    return result;
}

const groupStyle = {
  marginLeft: '40px',
  flex: 1
};

const teamNameStyle = {
    padding:5,
    margin:10,
    textAlign:'center',
    borderRadius:10,
    color:'#000',
    minWidth : 30
} 
const playersStyle = {
    padding : '4px 2px',
    margin: 5,
    border:'1px solid #000',
    borderRadius : 10,
    textAlign : 'center'
}


var dragEventCheck = false
const PleaseWaitText = 'Please wait...'

class ManagePlayers extends Component {
  constructor() {
    super();

    this.state = {
      notAssigned : [],// createPlayers(8), 
      teamData : {}, //{ ...createTeam(4) },
      totalPlayers : 0,
      AllPlayers : [],
      dragStart : [],
      isStartBtnDisabled : false,
      message : ''
    };

    this.handleGetAllTeam = this.handleGetAllTeam.bind(this)
    this.handleGetPlayerprefer = this.handleGetPlayerprefer.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.fetchPlayers = this.fetchPlayers.bind(this)
    
}


async handleGetAllTeam(){
    const teams = await GetAllTeams()
    if(teams){
        console.log('teams = ',teams)
        let teamsObj = {}
        for(let i=0;i<teams.length;++i){
            let teamId = teams[i].id
            const getTeamColor = GetTeamData('name',teams[i].team_name)
            teamsObj[teamId] = {
                teamName : teams[i].team_name,
                teamId : teamId,
                teamColor : getTeamColor.color,
                players : createPlayers(0)
            }
        }

        this.setState({
            ...this.state,
            teamData:teamsObj
        })
    }
    
}


async handleGetPlayerprefer(result){
    // const result = await GetPlayerprefer(pin)
    // console.log("result_GetPlayerprefer = ",result)
    if(result.status===1){

        const findSessionIdInAllPlayers = (sessionid)=>{
            var index = -1 , i = 0
            for(let players of this.state.AllPlayers){
                if(players.sessionid === sessionid ){
                    index = i
                    break
                }
                ++i
            }
            return index
        }
       
        let AllPlayers = [] , l = result.data.length 
        
        for(let i=0;i<l;++i){
            let sd = result.data[i]
            if(findSessionIdInAllPlayers(sd.sessionid) === -1){                
                let td = GetTeamData('id',Number(sd.teamid))
                let data = {
                    teamColor : td.color,
                    teamId : sd.teamid,
                    pin : sd.pin,
                    sessionid : sd.sessionid,
                    name : String(sd.sessionid).slice(0,6)
                }
                AllPlayers.push(data)
                // notAssigned.push(data)
            }
        }

        //  = []

        // for(let player of AllPlayers){
        //     let p1id = false
        //     for(let players of this.state.notAssigned){
        //         if(player.sessionid===players.sessionid){
        //             p1id = true
        //         }
        //     }

        //     if(!p1id){
        //         notAssignedAllPlayers.push(player)
        //     }
        // }
        console.log("AllPlayers = ",AllPlayers)
        if(AllPlayers.length){

            var notAssignedAllPlayers = [...new Map([...this.state.notAssigned,...AllPlayers].map(item => [item.sessionid, item])).values()];

            console.log('notAssignedAllPlayers = ',notAssignedAllPlayers)

            const totalAllPlayers = [...this.state.AllPlayers,...AllPlayers]

            this.setState({ 
                AllPlayers : totalAllPlayers , 
                notAssigned : notAssignedAllPlayers , 
                totalPlayers : totalAllPlayers.length  
            })

        }

    }
}

async handleStart(){
    this.setState({isStartBtnDisabled : true,message:PleaseWaitText})
    let data = []
    Object.keys(this.state.teamData || {}).map((teamId,index)=>{
        let d = (this.state.teamData[teamId]||{})
        d.players.map((key,i)=>{
            data.push({
                sessionid : key.sessionid,
                teamid :  String(teamId),
                pin : key.pin
            })
        })
    })
    if(data.length){
        const res = await CreatePlayerfinalprefer(data)
        if(res.status===1){
            this.setState({isStartBtnDisabled : false,message:'Manged Players Successfully'})
        }else{
            this.setState({isStartBtnDisabled : false,message:'Something went wrong. Try again'})
        }
        console.log("CreatePlayerfinalprefer = ",res)
    }else{
      this.setState({isStartBtnDisabled : false,message:`You haven't assigned a player`})
    }
    
}

fetchPlayers(){
    let pin = window.sessionStorage.getItem("pin")
    SocketApis().GetPlayerprefer(pin,data=>{
        console.log("all_players = ",data)
        if(data.status===1){
            this.handleGetPlayerprefer(data)
        }
    })
}

componentDidMount(){
    this.handleGetAllTeam()
    this.fetchPlayers()

    setInterval(_=>{
        console.log('interval')
        if(!dragEventCheck){
            console.log("request sended to GetPlayerprefer")
            this.fetchPlayers()
        }
    },2000)

}


render() {
    if(this.state.message && this.state.message !== PleaseWaitText){
        setTimeout(_=>{
            this.setState({message : ''})
        },5000)
    }
    return (
        <>
            <div>
                <h2>Mange Players</h2>
                <div style={{marginTop : 10}}>Players Count : <span style={{fontWeight:'bold'}}>{this.state.totalPlayers}</span></div>
            </div>
                <div style={{ display: 'flex', justifyContent: 'stretch', marginTop: '30px', marginRight: '50px', userSelect:'unset' }}>
                    <div style={groupStyle} >
                                <div style={{...teamNameStyle,background:"#DEE0FC"}}>Not Assigned</div>
                                <Container groupName="1" getChildPayload={i =>this.state.notAssigned[i]} 
                                onDragStart={e=>{
                                    dragEventCheck = true
                                    console.log('dragStart = ',this.state.notAssigned)
                                }}
                                onDragEnd = {e=>{
                                    console.log('dragend = ',e)
                                    dragEventCheck = false
                                    return e
                                }}
                                // setDraggables = {true}
                                onDrop={e => this.setState({ notAssigned: applyDrag(this.state.notAssigned, e) })}  
                                >
                                    {
                                    this.state.notAssigned.map(p => {
                                        return (
                                        <Draggable key={p.sessionid+Math.random()} style={{padding:8,}}>
                                            <div className="draggable-item" style={{display:'inline'}} >
                                                <div style={{...playersStyle,display:'block',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                                                    {p.name} <span style={{float:'right',marginRight:10,marginTop:4,width:12,height:12,background:p.teamColor,display:'flex'}}></span>
                                                </div>
                                            </div>
                                        </Draggable>
                                        );
                                    })
                                    }
                                </Container>
                            </div>
                
            
                {
                    Object.keys(this.state.teamData).map((teamId,teamsIndex)=>{
                        const team = this.state.teamData[teamId]
                        return (
                            <div style={groupStyle} key={teamsIndex+teamId+Math.random()}>
                                <div style={{...teamNameStyle,background:team.teamColor,textTransform:'capitalize'}}>{team.teamName}</div>
                                <Container groupName="1" getChildPayload={i =>this.state.teamData[teamId].players[i] } onDrop={e =>{
                                    this.setState({ 
                                        teamData : {
                                        ...this.state.teamData,
                                        [teamId] : {
                                                ...team,
                                                players : applyDrag(this.state.teamData[teamId].players, e,teamId) }
                                            }
                                        }
                                        )
                                    }}  style={{minHeight:500}}>
                                    {
                                    team.players.map(p => {
                                        return (
                                        <Draggable key={p.sessionid+Math.random()} style={{padding:8}}>
                                            <div className="draggable-item" style={{...playersStyle}}>
                                                {p.name} <span style={{float:'right',marginRight:10,marginTop:4,width:12,height:12,background:p.teamColor,display:'flex'}}></span>
                                            </div>
                                        </Draggable>
                                        );
                                    })
                                    }
                                </Container>
                            </div>
                        )
                    })
                }

        </div>
        
        <div style={{display:'inline',position:'absolute',right:0,bottom:0,marginBottom:100}}>
            <div style={{marginTop:'15rem'}}>
                {this.state.message}
            </div>
            <button disabled={this.state.isStartBtnDisabled} onClick={this.handleStart} style={{marginTop:5,marginRight:100,borderRadius:15,cursor: this.state.isStartBtnDisabled ? 'not-allowed' : 'pointer',fontSize:22, background:'#45C779',color:'#fff',width:200,height:50,textAlign:'center',float:'right'}}>Start</button>
        </div>
        </>
    );
  }
}


export default ManagePlayers;