import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import reducer from './reducer/index';
import configureStore from './store/index';


const store = configureStore(reducer,{});

const render = () => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>,
      document.getElementById('root')
  );
};

store.subscribe(render); //subscribe 메서드로 등록한 리스너 호출(render메서드 호출해 view 갱신)
render();

//reportWebVitals();
