import { Fetch } from './Ajax'


async function CreatePin() {
    const res = await Fetch('createPin')
    console.log('createPin = ', res)
    return res
}


async function GetAllTeams() {
    const res = await Fetch('getAllTeams')
    console.log('GetAllTeams = ', res)
    return res.data
}


async function GetPlayerprefer(id) {
    const res = await Fetch(`getPlayerprefer/${id}`)
    console.log('getPlayerprefer = ', res)
    return res
}

async function CreatePlayerfinalprefer(data = []) {
    console.log('view_data  = ', data)
    const res = await Fetch({ method: 'POST', data: JSON.stringify(data), timeout: 0, url: 'createPlayerfinalprefer/' })
    console.log("createPlayerfinalprefer = ", res)
    return res
}

async function GetAllgames(){
    const res = await Fetch('getAllgames')
    return res
}

async function CreateGameSession(payload={gameid:''}){
    const res = await Fetch({method:'POST',url:'creategamesession',data: JSON.stringify({...payload,pin:window.sessionStorage.getItem('pin'),status:'1'})})
    return res
}

async function CreateVotingGame(payload={}){
    const res = await Fetch({method:'POST',url:'createVotinggame',data: JSON.stringify(payload)})
    return res
}


export { CreatePin, GetAllTeams, GetPlayerprefer, CreatePlayerfinalprefer , GetAllgames , CreateGameSession , CreateVotingGame}

