import { useEffect, useState } from 'react';
import './styles/App.css';
import  {fetchFplStats} from './services/api.js';
import Haaland from './assets/Haaland.png';
import Salah from './assets/Salah.png';
import Watkins from './assets/Watkins.png';
import Saka from './assets/saka.png';
import Mateta from './assets/mateta.png';
import Logo from './assets/Logo.png';
import ReactCountryFlag from "react-country-flag";
import { Bouncy } from 'ldrs/react'
import 'ldrs/react/Bouncy.css'
import { LineChart } from '@mui/x-charts/LineChart';
import { FaArrowLeft } from "react-icons/fa";

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
  const [closing, setClosing] = useState(false);

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
    setRemoveStats(false);
    
    const players = [Haaland, Salah, Watkins, Saka, Mateta];
    const randomPlayer = players[Math.floor(Math.random()* players.length)];
    setSelectedPlayer(randomPlayer);
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
    const players = [Haaland, Salah, Watkins, Saka, Mateta];
    const randomPlayer = players[Math.floor(Math.random()* players.length)];
    setSelectedPlayer(randomPlayer);
  },[]);

  useEffect(() => {
    if (dataLoaded && animationsComplete) {
      setShowStats(true);
    }
  }, [dataLoaded, animationsComplete]);

  const handleBack = () => {
    setShowStats(false);
    setTimeout(()=>{
      setRemoveStats(true);
      setRemoveForm(false);
      setHideForm(false);
      setStats(null);
      setUserId('');
      setDataLoaded(false);
      setAnimationsComplete(false);
      setClosing(true);
    },500);
  }


  const countryCodeMap = {
    EN: 'GB-ENG',
  }

  const getCountryCode = (code) => countryCodeMap[code] || code;

  return (
    <div className='page-center'>
      {!removeForm && (
        <div className='form'>
          <img src={Logo} alt='FPL Analyze Logo'
          className={hideForm ? 'logo-slide-up': 'logo-normal'}
          style={{
            position: 'absolute',
            top: -40,
            left: 0,
            width: '250px',
            height: '250px',
            transition: 'opacity 0.5s ease-in-out',
            opacity: hideForm ? 0 : 1,
            zIndex: 2,
          }}/>
          <div
            className={`background-image ${hideForm ? 'haaland-animate' : 'haaland-normal'}`}
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
                setAnimationsComplete(true);
              } 
            }}
          />
          <form
            onSubmit={handleSubmit}
            className={hideForm ? 'hidden' : 'normal'}
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
          <div 
          className={showStats ? 'background-player-enter' : 'background-player-normal'}
          style={{
            position: 'fixed',
            top: 0,
            right: '-390px',
            height: '100vh',
            width: '50vw',
            backgroundImage: `url(${selectedPlayer})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center',
            opacity: 0.50,
            zIndex: 0,
            pointerEvents: 'none',
          }}/>
        )}
        {!removeStats && showStats && stats && (
          <div className={`stats ${showStats ? 'stats-enter' : 'stats-close'}`}>
            <button className='back-button' 
            style={{
              position: 'absolute',
              bottom: 50,
              left: 24,
              background: "#2c3551ff",
              color:'#fff',
              padding: '10px 18px',
              cursor: 'pointer',
              height: '80px',
              width: '80px',
              zIndex: 2,
              border : 'none',
              borderRadius : '50px',
              opacity: showStats ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
            onClick={handleBack}><FaArrowLeft size={25}/></button>
            <div className='full-head'>
              <div className='stats-head'>
                <h2>{stats.managerName}</h2>
                <ReactCountryFlag
                  countryCode={getCountryCode(stats.codeCountry)}
                  svg
                  style={{ width: '4em', height: '4em' }}
                />
              </div>
              <h1>{stats.teamName}</h1>
            </div>
            <div className='stats-body'>
              <div className="stats-field">
              <h2><span style={{ fontWeight: '600' }}>🌍 Current rank :</span> {customizeRank(stats.currentRank)}</h2>
              <h2><span style={{ fontWeight: '600' }}>📈 Seasons played :</span> {stats.seasonsPlayed} {stats.seasonsPlayed > 1 ? 'seasons' : 'season'}</h2>
              <h2><span style={{ fontWeight: '600' }}>📊 Average rank :</span> {customizeRank(stats.averageRank)}</h2>
              <h2><span style={{ fontWeight: '600' }}>🎯 Best season :</span> {customizeRank(stats.bestSeasonRank)} ({stats.bestSeasonName})</h2>
              </div>
              <div className={showStats ? 'chart-enter' : 'chart-normal'}
              style={{
                position: 'relative',
                top: '-50px',
              }}>
                  <LineChart
                    xAxis={[
                      {
                        data: stats.seasonHistory.map(s => s.seasonName),
                        scaleType: 'band',
                        categoryGapRatio: 0.1,
                        label: 'Seasons',
                        sx: {
                          '.MuiChartsAxis-line': { stroke: '#ffffffff' },
                          '.MuiChartsAxis-tickLabel': { fill: '#ffffff' },
                          '.MuiChartsAxis-label' : {fill: '#ffffff'},
                        },
                      },
                    ]}
                    yAxis={[
                      {
                        label: 'Ranks',
                        labelPlacement: 'left',
                        valueFormatter: customizeRank,
                        sx: {
                          '.MuiChartsAxis-label' : {fill: '#ffffff'},
                          '.MuiChartsAxis-line': { stroke: '#ffffffff' },
                          '.MuiChartsAxis-tickLabel': { fill: '#ffffffff' },
                        },
                      },
                    ]}
                    series={[
                      {
                        data: stats.seasonHistory.map(s => s.rank),
                        color: '#cc9900d8', 
                      },
                    ]}
                    height={300}
                    width={470}/>
                    <LineChart
                    xAxis={[
                      {
                        data: stats.seasonHistory.map(s => s.seasonName),
                        scaleType: 'band',
                        categoryGapRatio: 0.1,
                        label: 'Seasons',
                        sx: {
                          '.MuiChartsAxis-line': { stroke: '#ffffffff' },
                          '.MuiChartsAxis-tickLabel': { fill: '#ffffff' },
                          '.MuiChartsAxis-label' : {fill: '#ffffff'},
                        },
                      },
                    ]}
                    yAxis={[
                      {
                        label: 'Total Points',
                        labelPlacement: 'left',
                        sx: {
                          '.MuiChartsAxis-label' : {fill: '#ffffff'},
                          '.MuiChartsAxis-line': { stroke: '#ffffffff' },
                          '.MuiChartsAxis-tickLabel': { fill: '#ffffffff' },
                        },
                      },
                    ]}
                    series={[
                      {
                        data: stats.seasonHistory.map(s => s.totalPoints),
                        color: '#cc9900d8', 
                      },
                    ]}
                    height={300}
                    width={470}/>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>

    
  );
}

export default App;