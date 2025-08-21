import logo from './logo.svg';
import './styles/App.css';
import { useState } from 'react';
import { fetchFplStats } from './services/api';

function App() {
  const [stats,setStats] = useState(null);
  const [userId,setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError('');
    try{
      const data = await fetchFplStats(userId);
      setStats(data);
      console.log(data.managerName);
    }catch(error){
      setError('Failed to fetch data');
    }
  }

  return (<div>
  <form onSubmit={handleSubmit}>
    <input type="text" 
    value={userId}
    placeholder='Enter User ID'
    onChange={(e) => setUserId(e.target.value)}
    />
    <button type='submit'>Get Stats</button>
  </form>    
  </div>
  );
}

export default App;
