import React, {useEffect, useState} from 'react'
import api from '../../api'
import {Link} from 'react-router-dom'


export default function Game() {
    const [games, setGames] = useState([])
    const [test, setTest] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')
            // Récuperartion des top games dans data.data
            let dataArray = result.data.data

            // Formatage des imges fourni car ils n'ont pas de tailles prédéfini.
            let finalArray = dataArray.map(el => {
                let newUrl = el.box_art_url.replace("{width}", "250").replace('{height}', "300")
                el.box_art_url = newUrl
                return el
            })
            // on met à jour le state
            setGames(finalArray)
        }
        fetchData()
    }, [])

    return (
        <div>
        <h1 className="titreGames">Jeux les plus populaires</h1>
        <div className="flexAccueil">
            {games.map( (el,i) => (
                <div key={i} className="carteGames">
                        <img src={el.box_art_url} alt="jeu profile pic" className='imgCarte'/>
                        <div className="cardBodyGames">
                            <h5 className="titreCartesGames">{el.name}</h5>
                            <Link
                                className="lien"
                                to={{
                                    pathname: 'game/' + el.name,
                                    state : {
                                        gameID : el.id
                                    }
                                }}
                            >
                                <button className="btnCarte">regarder {el.name}</button>
                            </Link>
                        </div>
                </div>

            ))}
        </div>        
    </div>
    )
}
