import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import UserRoutes from './UserRoutes';

import { store, persistor } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/goit-react-hw-06-phonebook">
          <UserRoutes />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
