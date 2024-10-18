import './App.css';
import { Provider } from 'react-redux';
import { appStore } from './utils/appStore';
import Body from './component/Body';
import RecipeSearch from './component/RecipeSearch';

function App() {
  return (

    <Provider store={appStore}>
      <Body/>
      <RecipeSearch/>
    </Provider>
    
  );
}

export default App;
