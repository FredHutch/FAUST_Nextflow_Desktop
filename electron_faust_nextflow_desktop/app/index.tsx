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
import { FAUSTSubmissionFormProvider } from './components/faust_submission_form';
import {
    NextflowManager,
    NextflowManagerProvider
} from './components/nextflow_manager';
import {
    FAUSTExecutor,
    FAUSTExecutorProvider
} from './components/faust_executor';
import { RManager, RManagerProvider } from './components/r_manager';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
import './app.global.css';

// const store = configureStore();

// const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

// document.addEventListener('DOMContentLoaded', () =>
//     render(
//         <AppContainer>
//             <Root store={store} history={history} />
//         </AppContainer>,
//         document.getElementById('root')
//     )
// );

const store = configureStore();
const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () =>
    render(
        <AppContainer>
            <RManagerProvider>
                <NextflowManagerProvider>
                    <FAUSTExecutorProvider>
                        <FAUSTSubmissionFormProvider>
                            <RManager />
                            <NextflowManager />
                            <FAUSTExecutor />
                            <Root store={store} history={history} />
                        </FAUSTSubmissionFormProvider>
                    </FAUSTExecutorProvider>
                </NextflowManagerProvider>
            </RManagerProvider>
        </AppContainer>,
        document.getElementById('root')
    )
);
