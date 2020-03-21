import React from 'react';
import { Switch, Route } from 'react-router-dom';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
import App from './containers/App';
import { StartUpPage } from './pages/start_up_page';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
import { getStartUpPagePath } from './constants/app_paths';

export default function Routes() {
    return (
        <App>
            <Switch>
                <Route path={getStartUpPagePath()} component={StartUpPage} />
            </Switch>
        </App>
    );
}
