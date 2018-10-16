import * as React from 'react';
import './styles/style.css';

import Content from './components/Content';
import Header from './components/Header';
import TopNav from './components/TopNav';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
       <Header/>
       <TopNav/>
       <Content/>
      </div>
    );
  }
}
export default App;
