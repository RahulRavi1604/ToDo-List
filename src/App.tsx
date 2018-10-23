import * as React from 'react';
import './styles/style.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Header from './components/Header';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import todoApp from './reducers/reducer';

const store = createStore(todoApp)

class App extends React.Component {
  
  public render() {
    return (
      <div className="App">
        <Header />
        <TopNav />
        <Provider store = {store}>
        <SideNav />
        </Provider>
      </div>
    );
  }
}

export default App;