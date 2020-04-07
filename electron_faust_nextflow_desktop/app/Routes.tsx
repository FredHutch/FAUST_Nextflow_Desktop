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
import { RManager, RManagerProvider } from './components/r_manager';
import { ShinyManager, ShinyManagerProvider } from './components/shiny_manager';

export default function Routes() {
    return (
        <RManagerProvider>
            <ShinyManagerProvider>
                <RManager />
                <ShinyManager />
                <App>
                    <Switch>
                        {/* <Route path={"/"} component={StartUpPage} /> */}
                        <Route path={'/'} exact={true} component={StartUpPage} />
                        <Route path={getStartUpPagePath()} component={StartUpPage} />
                        <Route path={getShinyPagePath()} component={ShinyAppPage} />
                    </Switch>
                </App>
            </ShinyManagerProvider>
        </RManagerProvider>
    );
}
// export default function Routes() {
//     return (
//         <App>
//             <Switch>
//                 <Route path={getStartUpPagePath()} component={StartUpPage} />
//                 <Route path={getShinyPagePath()} component={ShinyAppPage} />
//             </Switch>
//         </App>
//     );
// }
