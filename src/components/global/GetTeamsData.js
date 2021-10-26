import G8 from './../assets/Bobbles/G8.png'
import O7 from './../assets/Bobbles/O7.png'
import B1 from './../assets/Bobbles/B1.png'
import P10 from './../assets/Bobbles/P10.png'


import BobbleOrange from './../assets/png-icons/Bobble-Orange.png'
import BobbleGreen from './../assets/png-icons/Bobble-Green.png'
import BobbleBlue from './../assets/png-icons/Bobble-Blue.png'
import BobblePurple from './../assets/png-icons/Bobble-Purple.png'


const TeamConfig = [
    {
        id : 1,
        name : 'birthday',
        color : '#7cc243',
        icon  : G8,
        colorIcon : BobbleGreen
    },
    {
        id : 2,
        name : 'ninjazzy',
        color : '#E57934',
        icon  : O7,
        colorIcon : BobbleOrange
    },
    {
        id : 3,
        name : 'reptilians',
        color : '#31AEE4',
        icon  : B1,
        colorIcon : BobbleBlue
    },
    {
        id : 4,
        name : 'slayyy',
        color : '#9d53a0',
        icon  : P10,
        colorIcon : BobblePurple
    },
]




function GetTeamData(key,value){
    var data = {}
    if(key && value){
        for(let obj of TeamConfig){
            if(obj[key]===value){
                data = obj
                break;
            }
        }
    }else{
        return TeamConfig
    }
    return data
}

export default GetTeamData