import React, {useEffect, useState} from 'react'
import logo from './IconeTwitch.svg'
import search from './Search.svg'
import menuIco from './MenuIco.svg'
import {Link} from 'react-router-dom'
import croix from './Croix.svg'

export default function Header() {
    
    const [menu, setMenu] = useState(false)
    const [smallScreen, setSmallScreen] = useState(window.innerWidth)
    const [searchInput, setSearchInput] = useState('')

    // Navar respon
    const toggleNavRes = () => {
        setMenu(!menu)
    }
    useEffect(() => {
        const changeTaille = () => {
            setSmallScreen(window.innerWidth)
            if (window.innerWidth > 900) {
                setMenu(false)
            }
        }
        window.addEventListener('resize', changeTaille)
    }, [])

    //navbar se femre quand on ouvre un autre lien
    const hideMenu = () => {
        if( menu === true){
            setMenu(false)
        }
    }

    // search nav
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleKeyPress = (e) => {
        setSearchInput(e.target.value)
        console.log(e.target.value);
    }
    // console.log(setSearchInput);


    return (
        <div>
            <nav className="headerTop">
                {(smallScreen > 900 || menu) && (
                    <ul className="listeMenu">
                        <li onClick={hideMenu} className="liensNav">
                            <Link className="lien" to="/">
                                <img src={logo} alt="logo twitch" className="logo"/>
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="liensNav">
                            <Link className="lien" to="/">
                                Top Games
                            </Link>
                        </li>
                        <li onClick={hideMenu} className="liensNav">
                            <Link className="lien" to="top-streams">
                                Top Streams
                            </Link>                    
                        </li>
                        <li className="liensNav">
                            <form className="formSubmit" onSubmit={handleSubmit}>
                                <input required value={searchInput} onChange={(e) => handleKeyPress(e)} type="text" className="inputRecherche"/>
                                <Link
                                    className="lien"
                                    to={{
                                        pathname: `/resultats/${searchInput}`
                                    }}
                                >
                                    <button types="submit">
                                        <img src={search} alt="icone loupe" className="logoLoupe"/>
                                    </button>
                                </Link>
                            </form>
                        </li>
                    </ul>
                 )} 
            </nav>


            <div className="menuResBtn">
                {/* condition ternai pour afficher la croix et menu en respo */}
                <img onClick={toggleNavRes} src={!menu ? menuIco : croix} alt="icone menu responsive" className="menuIco"/>
            </div>
        </div>
    )
}
