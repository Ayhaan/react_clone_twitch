import React, {useEffect, useState} from 'react'
import api from '../../api'
import {Link} from 'react-router-dom'


export default function Sidebar() {

    const [topStreams, setTopStreams] = useState([])

    // 1er appel pour les récupérer les streams
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/streams')
            let dataArray = result.data.data

            // récuperer id des jeux et des users
            let gameIDs = dataArray.map(el => {
                return el.game_id
            })
            let userIDs = dataArray.map(el => {
                return el.user_id
            })
            //création des URLs personnalisés
            let baseUrlGames = "https://api.twitch.tv/helix/games?"
            let baseUrlUsers = "https://api.twitch.tv/helix/users?"

            let queryParamsGames = "";
            let queryParamsUsers = "";

            gameIDs.map(id => {
                return (queryParamsGames = queryParamsGames + `id=${id}&`)
            })
            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })

            //url final
            let urlFinalGames = baseUrlGames + queryParamsGames
            let urlFinalUsers = baseUrlUsers + queryParamsUsers
            // console.log(urlFinalGames);
            // console.log(urlFinalUsers);


            //Appel 
            let gamesNames = await api.get(urlFinalGames)
            let getUsers = await api.get(urlFinalUsers)
            let arrayGamesUsers = gamesNames.data.data 
            let arrayUsers = getUsers.data.data

            // console.log(arrayGamesUsers);
            // console.log(arrayUsers);

            // CREATION du tableau final 
            let finalArray = dataArray.map(el => {
                el.gamesNames = ""
                el.truePic = ""
                el.login = ""
                arrayGamesUsers.forEach(name => {
                    arrayUsers.forEach(user => {
                        if (el.user_id === user.id && el.game_id === name.id) {
                            el.truePic = user.profile_image_url 
                            el.gamesNames = name.name 
                            el.login = user.login
                        }
                    });
                });
                return el
            })
            setTopStreams(finalArray.slice(0,6))

        }
        fetchData()
    }, [])
// console.log(topStreams);
    return (
        <div className="sidebar">
            <h2 className="titreSidebar">Chaines recommandées</h2>
            <ul className="listeStream">
                {topStreams.map( (el,i) => (
                    <Link
                    key={i}
                    className="lien"
                    to={{
                        pathname: `live/${el.login}`
                    }}
                    
                    >
                        <li key={i} className="containerFlexSidebar">

                            <img src={el.truePic} alt="logo user" className="profilePicRonde"/>

                            <div className="streamUser">{el.user_name}</div>

                            <div className="viewerRight">

                                <div className="pointRouge"></div>

                                <div>{el.viewer_count}</div>

                            </div>

                            <div className="gameNameSider">{el.gamesNames}</div>
                            
                        </li>
                    
                    </Link>
                ))}
            </ul>
        </div>
    )
}
