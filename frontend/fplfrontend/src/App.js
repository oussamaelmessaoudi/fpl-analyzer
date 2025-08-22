import { useState } from 'react';
import './styles/App.css';
import  {fetchFplStats} from './services/api.js';
import Haaland from './assets/Haaland.png';

function App() {
  const [userId, setUserId] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [hideForm, setHideForm] = useState(false);
  const [removeForm, setRemoveForm] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setHideForm(true);
    try{
      const data = await fetchFplStats(userId);
      setStats(data);
      
    }catch (error){
      setError('Failed to fetch the FPL stats, please check your ID');
    }
  }

  return (
    <div className='page-center'>
      {!removeForm && (
        <div className='form'>
          <div
            className={`background-image ${hideForm ? 'haaland-animate' : ''}`}
            style={{
              backgroundImage: `url(${Haaland})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.8,
              position: 'absolute',
              top: 155,
              left: 0,
              width: '350px',
              height: '550px',
              padding: '20px',
              zIndex: 0,
            }}
            onAnimationEnd={() => {
              if (hideForm) setRemoveForm(true);
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
    </div>

    
  );
}

export default App;
