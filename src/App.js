import './App.css';
import Game from './components/Game/Game';
import Header from './components/header/Header'
import Sidebar from './components/Sidebar/Sidebar';
import TopStreams from './components/TopStreams/TopStreams'; 
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Live from './components/Live/Live';
import GameStreams from './components/GameStreams/GameStreams';
import Resultats from './components/Resultats/Resultats';
import Erreur from './components/Erreur/Erreur';

function App() {
  return (
    
    <Router
      forceRefresh={true}
    >
      <div className="App">
        < Header />
        < Sidebar />
          <Switch>
              <Route exact path="/" component={Game} />
              <Route exact path="/top-streams" component={TopStreams} />
              <Route exact path="/live/:slug" component={Live} />
              <Route exact path="/game/:slug" component={GameStreams} />    
              <Route exact path="/resultats/:slug" component={Resultats} />    
              <Route exact path="/resultats/" component={Erreur} />    
          </Switch>
      </div>
    </Router>
  );
}

export default App;
