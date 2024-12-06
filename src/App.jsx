import React from 'react';
import ReactDOM from 'react-dom';
import ActivityFeed from './components/ActivityFeed.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className='container main-container'>
      <div className="container-view">
        <ActivityFeed />
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
