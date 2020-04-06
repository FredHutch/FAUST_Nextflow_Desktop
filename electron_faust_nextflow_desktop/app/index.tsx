// -----------------------------------------------------------------------------
// Third-Party Components
// -----------------------------------------------------------------------------
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import { RManager, RManagerProvider } from './components/r_manager';
import { ShinyManager, ShinyManagerProvider } from './components/shiny_manager';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
import './app.global.css';

const store = configureStore();
const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

// document.addEventListener('DOMContentLoaded', () =>
//     render(
//         <AppContainer>
//             <RManagerProvider>
//                 <ShinyManagerProvider>
//                     <RManager />
//                     <ShinyManager />
//                     <Root store={store} history={history} />
//                 </ShinyManagerProvider>
//             </RManagerProvider>
//         </AppContainer>,
//         document.getElementById('root')
//     )
// );
document.addEventListener('DOMContentLoaded', () =>
    render(
        <AppContainer>
            <Root store={store} history={history} />
        </AppContainer>,
        document.getElementById('root')
    )
);
