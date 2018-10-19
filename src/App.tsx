import * as React from 'react';
import './styles/style.css';

import Header from './components/Header';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Header />
        <TopNav />
        <SideNav />
      </div>
    );
  }
}
export default App;
