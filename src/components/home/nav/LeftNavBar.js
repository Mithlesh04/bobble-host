import "./../../scss/navbar.scss"
import TeamIcon from './../../assets/nav/icons/teams.svg'
import GameIcon from './../../assets/nav/icons/game.svg'
import ScoreIcon from './../../assets/nav/icons/score.svg'
import SettingIcon from './../../assets/nav/icons/settings.svg'

function LeftNavBar({ activeMenu , setActiveMenu}){
    
    return (
        <div className="LeftNavBar">
            <div className={`menu-icon ${activeMenu==="teams" && "menu-icon-active"}`} onClick={_=>setActiveMenu("teams")}><img src={TeamIcon} alt="teams" /></div>
            <div className={`menu-icon ${activeMenu==="games" && "menu-icon-active"}`} onClick={_=>setActiveMenu("games")}><img src={GameIcon} alt="games" /></div>
            <div className={`menu-icon ${activeMenu==="score" && "menu-icon-active"}`} onClick={_=>setActiveMenu("score")}><img src={ScoreIcon} alt="score" /></div>
            <div className={`menu-icon ${activeMenu==="settings" && "menu-icon-active"}`} onClick={_=>setActiveMenu("settings")}><img src={SettingIcon} alt="settings" /></div>
        </div>
    )

}

export default LeftNavBar