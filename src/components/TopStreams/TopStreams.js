import React, {useEffect, useState} from 'react'
import api from '../../api'
import {Link} from 'react-router-dom'

export default function TopStreams() {

    const [channel, setChannel] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/streams')
            let dataArray = result.data.data
            // console.log(dataArray);
            
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

                let newUrl = el.thumbnail_url.replace("{width}", "320").replace('{height}', "180")
                el.thumbnail_url = newUrl
                return el
            })
            setChannel(finalArray)

        }
        fetchData()
    }, [])

    return (
        <div>
            <h1 className="titreGames">Stream les plus populaires</h1>
            <div className="flexAccueil">
                {channel.map( (el,i) => (
                    <div key={i} className="carteStream">
                        <img src={el.thumbnail_url} alt="jeu" className="imgCarte"/>
                        <div className="cardBodyStream">
                            <h5 className="titreCartesStream">{el.user_name}</h5>
                            <p className="txtStream"> Jeu : {el.gamesNames}</p>
                            <p className="txtStream viewers">Viewers : {el.viewer_count}</p>
                            <Link
                                className="lien"
                                to={{
                                    // on Envoi le login de l'element cliqué via le slug
                                    pathname:`/live/${el.login}`
                                }}>
                                <div className="btnCarte">Regarder {el.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
