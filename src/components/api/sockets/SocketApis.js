import { io } from "socket.io-client";



function GetPlayerprefer(pin,cb){
  const socket = io(`ws://13.232.184.252:5000/api/v1/socketgetplayerprefer?pin=${pin}`);
    socket.on("socketgetplayerprefer",(data)=>{
        cb(data)
    })
}

var votinggameid = null
function getvotinggame(pin,cb){ /// temp
    if(votinggameid){
        cb(votinggameid)
    }else{
        const socket = io(`ws://13.232.184.252:5000/api/v1/getvotinggame?pin=${pin}`);
          socket.on("getVotinggame",(data)=>{
              if(data.status===1){
                  votinggameid = data.data[0].id
                  cb(votinggameid)
              }
          })
    }
}


function GetVotingGameResult({pin},cb){
    getvotinggame(pin,votingid=>{
        console.log("pin__voting-id = ",pin,votingid)
        let url = `ws://13.232.184.252:5000/api/v1/getvotinggameresult?pin=${pin}&votingid=${votingid}`
        const socket = io(url);
        socket.on("getVotinggameresult",(data)=>{
            cb(data)
        })
    })
  }

const SocketApis = () => {
    
    return {
        GetPlayerprefer,
        GetVotingGameResult,
        PlayerPrefer(){
            const socketServerURL = "ws://13.232.184.252:5000/api/v1/socketgetplayerprefer?pin=NDgqb";
            
            let socket = io(socketServerURL);
                
            socket.emit(`player_prefer`, { id : 1, sessionId :"avcoj8ieRWZ9rewrQsOQEw==" , teamid :2 })
        }

    }
    // socket.on('connect', (e) => {
    //     console.log("Socket Link is connected = ",e);
    // });

    // socket.on("Start_Chat",function(e){
    //     console.log("Socket Link is connected = ",e);
    // })

    // socket.on("checksocket",function(e){

    // })

    // socket.on('disconnect', (e) => {
    //     console.log("Socket Link is disconnect = ",e);
    // });
    
    // socket.on('reconnect', (e) => {
    //     console.log("Socket Link is reconnect = ",e);
    // });

//    socket.on('stats', (e) => {
//         console.log("stats = ",e);
//     });

};

export default SocketApis

