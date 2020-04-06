import React from 'react';
import { Switch, Route } from 'react-router-dom';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
import App from './containers/App';
import { ShinyAppPage } from './pages/shiny_app_page';
import { StartUpPage } from './pages/start_up_page';

// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
import { getShinyPagePath, getStartUpPagePath } from './constants/app_paths';

export default function Routes() {
    return (
        <App>
            <Switch>
                <Route path={getStartUpPagePath()} component={StartUpPage} />
                <Route path={getShinyPagePath()} component={ShinyAppPage} />
            </Switch>
        </App>
    );
}
