import "./../../scss/navbar.scss"
import TopNavBar from "./TopNavBar"
import LeftNavBar from "./LeftNavBar"
import { useEffect, useState } from "react"
import GamesHandlers from "../../games/GamesHandlers"

import MangeTeams from "../teams"

import { CreatePin, GetAllTeams, GetPlayerprefer } from "../../api/AjaxApi"


function NavBar() {
    const [activeMenu, setActiveMenu] = useState("teams")
    const [PIN, setPIN] = useState({
        pin: window.sessionStorage.getItem('pin'),
        id: ''
    })

    const handlerSetPin = async () => {
        if (!PIN.pin) {
            const pin = await CreatePin()
            if (pin && pin.status === 1) {
                let realPin = pin.data[0].pin
                setPIN({ pin: realPin, id: pin.data[0].id })
                window.sessionStorage.setItem('pin',realPin)
            } else {
                //handle error
            }
        }
        

    }

    return (
        <>
            <nav>
                <TopNavBar PIN={PIN.pin} />
                <LeftNavBar setActiveMenu={setActiveMenu} activeMenu={activeMenu} />
            </nav>

            <main className="main-body">
                {
                    activeMenu === 'teams' ? <MangeTeams setPIN={handlerSetPin} /> :
                        activeMenu === 'games' ? <GamesHandlers gameType="bidding-game" /> :
                            activeMenu === 'score' ? 'score' :
                                activeMenu === 'settings' ? 'settings' : ''
                }
            </main>
        </>
    )
}

export default NavBar