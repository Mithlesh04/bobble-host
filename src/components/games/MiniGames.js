import { useState, useEffect } from "react";
import { GetAllgames } from './../api/AjaxApi'

const gamesList = [
    {
        "id": 1,
        "name": "Simple Voting Game",
        "final": 1,
        "status": 1
    },
    {
        "id": 2,
        "name": "Simple Bidding Game",
        "final": 1,
        "status": 1
    },
    {
        "id": 3,
        "name": "Memelord Caption Game",
        "final": 1,
        "status": 1
    },
    {
        "id": 4,
        "name": "Scramble Search",
        "final": 1,
        "status": 1
    },
    {
        "id": 5,
        "name": "Crossword Lottery",
        "final": 1,
        "status": 1
    },
    {
        "id": 6,
        "name": "Bobbles Bows",
        "final": 1,
        "status": 1
    }
]; //static data 

const tableStyle = {
    table: {
        borderCollapse: "collapse",
        width: "100%",
    },
};

function MiniGames({ onLaunch }) {
    const [error, setError] = useState('')
    const [gamesList, setGamesList] = useState([])

    useEffect(async () => {
        const games = await GetAllgames()
        if (games.status === 1) {
            setGamesList(games.data)
        } else {
            setError('Something went wrong. Please Reload the page')
        }
    }, [])
    return (
        <>
            {
                error ?
                    <h2>{error}</h2>
                    : null
            }
            <div
                className="border border-2 border-grey px-5 py-4 m-3"
                style={{ borderRadius: 25 }}
            >
                <div style={{ fontWeight: "bold", fontSize: 34, marginBottom: 40 }}>
                    Mini Games <hr />
                </div>

                <div style={{ width: "80%" }}>
                    <table style={tableStyle.table}>
                        <thead>
                            <tr>
                                <th
                                    className="text-center"
                                    style={{
                                        background: "#E9EFFB",
                                        fontSize: 20,
                                        padding: 20,
                                    }}
                                >
                                    No.
                                </th>
                                <th
                                    className="text-center px-5"
                                    style={{
                                        paddingBottom: 20,
                                        background: "#E9EFFB",
                                        paddingTop: 20,
                                        fontSize: 20,
                                    }}
                                >
                                    Game Name
                                </th>
                                <th
                                    className="text-center"
                                    style={{
                                        paddingBottom: 20,
                                        background: "#E9EFFB",
                                        paddingTop: 20,
                                        fontSize: 20,
                                        paddingLeft: 30,
                                        paddingRight: 30,
                                    }}
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {gamesList.map((game, index) => {
                                return (
                                    <tr key={game.name + index}>
                                        <td style={{ paddingTop: 20, textAlign: "center" }}>
                                            {index + 1}
                                        </td>
                                        <td style={{ paddingTop: 20, textAlign: "center" }}>
                                            {game.name}
                                        </td>
                                        <td className="text-center px-5 mx-5">
                                            <button
                                                onClick={() => { onLaunch(game) }}
                                                style={{
                                                    marginTop: 30,
                                                    borderRadius: 25,
                                                    fontSize: 20,
                                                    background: "#6A75CA",
                                                    cursor: "pointer",
                                                    paddingLeft: 35,
                                                    paddingRight: 35,
                                                    alignContent: "content",
                                                    color: "white",
                                                    paddingTop: 5,
                                                    paddingBottom: 5,
                                                    border: "none",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                Launch
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="d-flex mt-3">
                        <button
                            style={{
                                marginTop: 30,
                                borderRadius: 5,
                                padding: 10,
                                fontSize: 20,
                                background: "#E8736F",
                                cursor: "pointer",
                                color: "white",
                                paddingLeft: 35,
                                paddingRight: 35,
                            }}
                        >
                            End Experience
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MiniGames;