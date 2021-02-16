import React, {useState, useEffect} from 'react'
import api from '../../api'
import {Link, useLocation, useParams} from 'react-router-dom'


export default function GameStreams() {
    let {slug} = useParams()
    let location = useLocation()
   


    const [streamData, setStreamData] = useState([])
    const [viewers, setViewers] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameID}`)
            let dataArray = result.data.data
            
            //formatage img
            let finalArray = dataArray.map ( el => {
                let newUrl = el.thumbnail_url.replace('{width}', '320').replace('{height}', '180')
                el.thumbnail_url = newUrl
                return el
            })

            //calcul des viewers
            let totalViewers = finalArray.reduce( (acc, val) => {
                return acc + val.viewer_count
            },0)

            let userIDs = dataArray.map( el => {
                return el.user_id
            })
            let baseUrl = "https://api.twitch.tv/helix/users?"
            let queryParamsUsers = ""

            userIDs.map (el => {
                return (queryParamsUsers = queryParamsUsers + `id=${el}&`)
            })
            let finalUrl = baseUrl + queryParamsUsers
            let getUsersLogin = await api.get(finalUrl)

            let userLoginArray = getUsersLogin.data.data 
            finalArray = dataArray.map(el => {
                el.login = ""; 
                userLoginArray.forEach(login => {
                    if (el.user_id === login.id) {
                        el.login = login.login
                    }
                });
                return el
            })
            setViewers(totalViewers)
            setStreamData(finalArray)
        }
        fetchData()
    }, [location.state.gameID])

    // console.log(viewers);
    // console.log(streamData);
    return (
        <div>
            <h1 className="titreGamesStreams">Streams : {slug}</h1>
            <h3 className="sousTitreGamesStreams">
                <strong className="textColored"> {viewers}</strong> personnes regardent {slug}
            </h3>

            <div className="flexAccueil">
                {streamData.map ( (el,i) => (
                    <div  key={i} className="carteGameStreams">
                        <img src={el.thumbnail_url} alt="jeu" className='imgCarte'/>
                        <div className="cardBodyGameStreams">
                            <h5 className="titreCartesStream">{el.user_name}</h5>
                            <p className="txtStream">Nombre de viewers : {el.viewer_count}</p>

                            <Link
                                className="lien"
                                to={{
                                    pathname: `/live/${el.login}`
                                }}
                            >
                                <div className="btnCarte">Regarder {el.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
