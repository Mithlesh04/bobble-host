import React, { useEffect, useState } from "react";
import Results from "./Results";
import { GetAllTeams , CreateVotingGame } from './../../api/AjaxApi'

const teams = [
    {
      name: "Birthday",
      checked : false
    },
    {
      name: "Ninjazzy",
      checked : false
    },
    {
      name: "Reptilians",
      checked : false
    },
    {
      name: "Slayyy",
      checked : false
    },
  ] //static data


const templatesList = {
  'abc': [
    {
      name: "A",
      checked: false,
    },
    {
      name: "B",
      checked: false,
    },
    {
      name: "C",
      checked: false,
    },
    {
      name: "D",
      checked: false,
    },
  ],
  '123':[
    {
      name: "1",
      checked: false,
    },
    {
      name: "2",
      checked: false,
    },
    {
      name: "3",
      checked: false,
    },
    {
      name: "4",
      checked: false,
    },
  ],
  't/f/mf': [
    {
      name: "True",
      checked: false,
    },
    {
      name: "False",
      checked: false,
    },
    {
      name: "Mostly True",
      checked: false,
    },
    {
      name: "Mostly False",
      checked: false,
    },
  ]
}


const timersList = ['10s', '15s', '20s']


const defaultTemplate = 'abc'
const pleaseWaitText = 'Please wait...'
const AlphaList = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p']

function VotingGame({ gameData }) {
  const [screenType, setScreenType] = useState('');

  const [isAddOption, setAddOption] = useState(false);
  const [templates, setTemplates] = useState(defaultTemplate)
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState()
  const [teams,setTeams] = useState([])
  const [sendNowData,setSendNowData] = useState()
  const [message,setMessage] = useState('')
  const inputAddOptionRef = React.useRef()
 
  const handleAddOption = ()=>{
    let v = inputAddOptionRef?.current?.value
    if(isAddOption){
      if(v){
        let newData = {
          name : v,
          isChecked : false
        }
        setOptions([...options,newData])
        templatesList[templates]?.push(newData)
      }  
      setAddOption(false)
    }else setAddOption(true)

  }

  const handleOptionCheck = (e,index)=>{
    let checked = e.target.checked
    templatesList[templates][index].checked = checked
    setOptions((options)=>{
      let opt = [] , i= 0
      for(let o of options){
        if(i===index){
          o.checked = checked
        }
        opt.push(o)
        ++i
      }
      return opt
    })

  }

  const handleTeamsSelect = (e)=>{
    let checked = e.target.checked , index = Number(e.target.dataset.index)
    console.log("checked = ",checked)
    console.log("index = ",index)

    setTeams((teams)=>{
      let opt = [] , i= 0
      for(let o of teams){
        if(i===index){
          o.checked = checked
        }
        opt.push(o)
        ++i
      }
      return opt
    })

    
  }

  const handleSendNow = async ()=>{
    setMessage(pleaseWaitText)
    if(sendNowData && 'object'===typeof sendNowData){
        const res = await CreateVotingGame(sendNowData)

        console.log("res__sendNowData = ",res)

        if(res.status===1){
          setMessage('Game Started')
          setScreenType('result')
        }else{
          setMessage("Unabe to start game. Please try again")
        }

    }else{
      setMessage("Select data....")
    }
  }

  useEffect(() => {
    setOptions(templatesList[templates])
  }, [templates])

  useEffect(async ()=>{
    const team = await GetAllTeams()
    if(team && Array.isArray(team)){ 
        setTeams(team.map((t)=>{
            let d = {
                id: t.id,
                name : t.team_name,
                checked : false
            } 
            return d
        }))
    }
  },[])

  useEffect(()=>{
    var isOptions = false , isTeams = false

    const sendData = {
        timer : timer ? String(parseInt(timer)) : null,
        teamid : [],
        pin : window.sessionStorage.getItem('pin'),
        gamesessionid : gameData?.id,
        option_values : [],
    }

    let i = 0
    for(let opt of options){
        if(opt?.checked){
            let r = {} , s = String(opt.name)
            r[AlphaList[i]] = s
            sendData.option_values.push(r)
            if(!isOptions){
                isOptions = true
            }
        }
      ++i
    }

    for(let tms of teams){
        if(tms.checked){
            sendData.teamid.push(tms.id)
            if(!isTeams){
                isTeams = true
            }
        }
    }
    sendData.teamid = sendData.teamid.join(',')

    if(isOptions && isTeams && sendData.timer){
        setSendNowData(sendData)
    }else{
        setSendNowData('')
    }

  },[options,timer,teams])

  useEffect(()=>{
    if(message){
      if(message !== pleaseWaitText){
        setTimeout(()=>{
          setMessage('')
        },5000)
      }
    }
  },[message])

  return (
    screenType === 'result' ? 
      <Results gameData={gameData} payload={sendNowData} />
    :
    <>
      <div className="body-container">
        <div className="heading-game-type">Simple Voting Game</div>
        <div className="mt-3">Game Hub - Simple Voting Game</div>
        <div style={{ display: "flex", clear: "both" }}>
          <div style={{ float: "left", width: "40%", marginTop: 30 }}>
            <h3>Options</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }} onChange={e => { setTemplates(e.target.value) }}>
              {
                Object.keys(templatesList).map((key, index) => {
                  return (
                    <div className="form-check form-check-inline" key={index + key + Math.random()}>
                      <input type="radio" value={key} checked={key === templates} className="form-check-input" name="select-template" />
                      <label className="fw-bold form-check-label text-uppercase">
                        {key}
                      </label>
                    </div>
                  )
                })
              }

            </div>
            <table
              style={{
                marginTop: 20,
                borderCollapse: "collapse",
                width: "100%",
              }}
              className="round"
            >
              <thead>
                <tr>
                  <th
                    className="text-center"
                    style={{
                      paddingBottom: 20,
                      background: "#E9EFFB",
                      paddingTop: 20,
                      paddingLeft: 30,
                      paddingRight: 30,
                    }}
                  >
                    Name
                  </th>
                  <th
                    className="text-center"
                    style={{
                      paddingBottom: 20,
                      background: "#E9EFFB",
                      paddingTop: 20,
                      paddingLeft: 30,
                      paddingRight: 30,
                    }}
                  >
                    Display
                  </th>
                </tr>
              </thead>
              <tbody>
                {options.map((option, index) => {
                  return (
                    <tr key={option.name + index}>
                      <td
                        className="text-center"
                        style={{
                          paddingTop: 20,
                          textAlign: "left",
                        }}
                      >
                        {option.name}
                      </td>
                      <td
                        className="text-center"
                        style={{
                          paddingTop: 20,
                          textAlign: "left",
                        }}
                      >
                        <input type="checkbox" checked={option?.checked || false} onChange={e=>handleOptionCheck(e,index)} />
                      </td>
                    </tr>
                  );
                })}
                <tr>
                <td style={{ textAlign: "left", paddingTop: 30 }}>
                  {isAddOption ? (
                    <div style={{display:'flex',justifyContent:'center'}}>
                      <input
                        type="text"
                        style={{
                          height: 30,
                          padding:5,
                          margin:5,
                          borderTop: "unset",
                          borderLeft: "unset",
                          borderRight: "unset",
                        }}
                        ref={inputAddOptionRef}
                      />
                    </div>
                  ) : null}
                </td>
                <td style={{ textAlign: "left", paddingTop: 30 }}>
                  <div
                    onClick={handleAddOption}
                    className="text-center pb-5"
                    style={{
                      cursor: "pointer",
                      fontSize: 13,
                      background: "transparent",
                      color: "#000",
                    }}
                  >
                    {isAddOption ? "Save option" : "Add option"}
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div style={{ width: "30%" , marginLeft : 30 }}>
            <div className=" mx-4 px-3">
              <h3 className="fs-5 mt-4 pt-4 pb-3">Timer</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around' }} onChange={e=>setTimer(e.target.value)}>
                {
                  timersList.map((time, index) => {
                    return (
                      <div className="form-check form-check-inline">
                        <input type="radio" value={time} checked={time===timer} className="form-check-input" name="select-timer" />
                        <label className="fw-bold form-check-label">
                          {time}
                        </label>
                      </div>
                    )
                  })
                }

              </div>



              <div className="pt-2 mt-4 fs-5">Send to Teams : </div>
              <div className="pt-4" onChange={handleTeamsSelect}>
                {teams.map((obj, index) => {
                  return (
                      <div className="d-flex flex-column" key={index+obj.name}>
                        <div className="py-2">
                          <input type="checkbox" value={obj.name} data-index={index} checked={obj.checked} className="mx-3" />
                          <label htmlFor={obj.name} className="text-capitalize">{obj.name}</label>
                        </div>
                      </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">{message}</div>
        <div className="mt-2 d-flex">
          {/* <button
            className="px-5 py-2 rounded-pill fs-5 text-white border-0"
            style={{ backgroundColor: "#6A75CA" , display:'none' }}
          >
            Back
          </button> */}
          <button
            disabled={sendNowData ? false : true}
            className="px-5 py-2 rounded-pill fs-5 btn btn-primary border-0"
            onClick={handleSendNow}
            >
            Send Now
          </button>
        </div>
      </div>
    </>
  );
}

export default VotingGame;
