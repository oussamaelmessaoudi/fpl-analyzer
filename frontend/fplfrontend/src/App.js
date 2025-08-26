import { useEffect, useState } from 'react';
import './styles/App.css';
import  {fetchFplStats} from './services/api.js';
import Haaland from './assets/Haaland.png';
import Salah from './assets/Salah.png';
import Watkins from './assets/Watkins.png';
import ReactCountryFlag from "react-country-flag";
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'
import { LineChart } from '@mui/x-charts/LineChart';

function App() {
  const [userId, setUserId] = useState('');
  const [stats, setStats] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState('');
  const [hideForm, setHideForm] = useState(false);
  const [removeForm, setRemoveForm] = useState(false);
  const [removeStats, setRemoveStats] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [loading,setLoading] = useState(false);
  const [animationsComplete, setAnimationsComplete] = useState(false);
  
  const customizeRank = (rank) => {
    if(rank >= 1_000_000) return (rank/ 1_000_000).toFixed(2) + 'M';
    if(rank >= 1_000) return (rank/ 1_000).toFixed(2) + 'k';
    return rank.toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setHideForm(true);
    setLoading(true);
    
    try{
      const data = await fetchFplStats(userId);
      setStats(data);
      setDataLoaded(true);
    }catch (error){
      setError('Failed to fetch the FPL stats, please check your ID');
    }finally{
      setLoading(false);
    }
  }

  useEffect (()=>{
    const players = [Haaland, Salah, Watkins];
    const randomPlayer = players[Math.floor(Math.random()* players.length)];
    setSelectedPlayer(randomPlayer);
  },[]);

  // Show stats only after both data is loaded and animations are complete
  useEffect(() => {
    if (dataLoaded && animationsComplete) {
      setShowStats(true);
    }
  }, [dataLoaded, animationsComplete]);

  

  return (
    <div className='page-center'>
      {!removeForm && (
        <div className='form'>
          <div
            className={`background-image ${hideForm ? 'haaland-animate' : ''}`}
            style={{
              backgroundImage: `url(${selectedPlayer})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.8,
              position: 'absolute',
              top: 156,
              left: 0,
              width: '350px',
              height: '550px',
              padding: '20px',
              zIndex: 0,
            }}
            onAnimationEnd={() => {
              if (hideForm){
                setRemoveForm(true);
                setAnimationsComplete(true); // Mark animations as complete
              } 
            }}
          />
          <form
            onSubmit={handleSubmit}
            className={hideForm ? 'hidden' : ''}
            onAnimationEnd={() => {
              if (hideForm) setRemoveForm(true);
            }}
          >
            <div className='form-row'>
              <input
                type='text'
                placeholder='Enter your FPL ID'
                value={userId}
                className='input'
                onChange={(e) => setUserId(e.target.value)}
              />
              <button type='submit' className='button'>Submit</button>
              
            </div>
          </form>
        </div>
      )}
      {loading && !stats && (
        <div className='loading'>
          <Bouncy
            size="45"
            speed="1.75"
            color="white" 
          />
        </div>
      )}
      <div className='userStats'>
        {!removeStats && showStats && stats && (
          <div className={`stats ${showStats ? 'stats-enter' : ''}`}>
            <div className='full-head'>
              <div className='stats-head'>
                <h2>{stats.managerName}</h2>
                <ReactCountryFlag
                  countryCode={stats.codeCountry}
                  svg
                  style={{ width: '4em', height: '4em' }}
                />
              </div>
              <h1>{stats.teamName}</h1>
            </div>
            <div className="stats-field">
              <h2><span style={{ fontWeight: '600' }}>Current rank :</span> {customizeRank(stats.currentRank)}</h2>
              <h2><span style={{ fontWeight: '600' }}>Seasons played :</span> {stats.seasonsPlayed} {stats.seasonsPlayed > 1 ? 'seasons' : 'season'}</h2>
            </div>
            <div className="charts">
                <LineChart
                  xAxis={[
                    {
                      data: [1, 2, 3, 5, 8, 10],
                      sx: {
                        '.MuiChartsAxis-line': { stroke: '#ffffffff' },       // axis line color
                        '.MuiChartsAxis-tickLabel': { fill: '#ffffffff' },    // label text color
                      },
                    },
                  ]}
                  yAxis={[
                    {
                      sx: {
                        '.MuiChartsAxis-line': { stroke: '#ffffffff' },
                        '.MuiChartsAxis-tickLabel': { fill: '#ffffffff' },
                      },
                    },
                  ]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5]
                    },
                  ]}
                  height={300}/>
            </div>
          </div>
        )}
      </div>
    </div>

    
  );
}

export default App;