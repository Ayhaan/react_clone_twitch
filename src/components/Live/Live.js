import React, {useState, useEffect} from 'react'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import {useParams} from 'react-router-dom'
import api from '../../api'


export default function Live() {
    // slug vient de react-router-dom. On arrive à recuper le login de la video qu'on click via App.js et topStream
    let {slug} = useParams()

    const [infoStream, setInfoStream] = useState([])
    const [infoGame, setInfoGame] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${slug}`)

            //verfi si le stream est co
            if (result.data.data.length === 0 ) {
                setInfoStream(false)
            } else {

                let gameID = result.data.data.map(el => {
                    return el.game_id
                })
                const resultNomGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameID}`)
                
                let nomJeu = resultNomGame.data.data.map(el => {
                    return el.name
                })
                setInfoGame(nomJeu)
                setInfoStream(result.data.data[0])
            }
        }

        fetchData()
    }, [slug])
// console.log(infoGame);
// console.log(infoStream);

    return (

        infoStream.title ?
        <div className="containerDecale">
            <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}/>
            <div className="contInfo">
                <div className="titreStream">{infoStream.title}</div>
                <div className="viewer">Viewers : {infoStream.viewer_count}</div>
                <div className="infoGame"> Streamer : {infoStream.user_name} &nbsp; Langue : {infoStream.language}</div>
                <div className="nomJeu">Jeu : {infoGame}</div>
            </div>
        </div>
        :
        <div className="containerDecale">
        <ReactTwitchEmbedVideo height="754" width="100%" channel={slug}/>
        <div className="contInfo">
            <div className="titreStream">Le streamer est offline</div>
        </div>
    </div>
    )
}
