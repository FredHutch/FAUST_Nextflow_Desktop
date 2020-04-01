// -----------------------------------------------------------------------------
// Node Libraries
// -----------------------------------------------------------------------------
const path = require('path');
// -----------------------------------------------------------------------------
// Electron
// -----------------------------------------------------------------------------
const app = require('electron').remote.app;
// -----------------------------------------------------------------------------
// Third-Party Libraries
// -----------------------------------------------------------------------------
// N/A
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
// N/A
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

// ------------------------------------------------------------------------------
// FAUST Working Directory
// ------------------------------------------------------------------------------
const faust_working_directory_name = 'faust_working_directory';
export const getFAUSTWorkingDirectoryPath = () => {
    const faust_working_directory = path.join(app.getPath('appData'), faust_working_directory_name);
    return faust_working_directory;
};

const binaries_directory_name = 'binaries';
const shiny_app_directory_name = 'shiny_app';

// ------------------------------------------------------------------------------
// Binaries
// ------------------------------------------------------------------------------
export const getBinariesDirectoryPath = () => {
    let app_path: null | string = null;
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.DEBUG_PROD);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        app_path = path.join('app');
    } else {
        app_path = path.join(app.getAppPath(), '..');
    }
    // console.log('APP PATH: ' + app_path);
    const binaries_directory_path = path.join(app_path, binaries_directory_name);
    return binaries_directory_path;
};

export const getRPackageFilePath = () => {
    const r_package_file_path = path.join(getBinariesDirectoryPath(), 'r', 'r-mac', 'R');
    // console.log('R_Package_path: ' + r_package_file_path);
    return r_package_file_path;
};

// ------------------------------------------------------------------------------
// Shiny App
// ------------------------------------------------------------------------------
export const getShinyAppDirectoryPath = () => {
    let app_path: null | string = null;
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.DEBUG_PROD);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        app_path = path.join('app');
    } else {
        app_path = path.join(app.getAppPath(), '..');
    }
    // console.log('APP PATH: ' + app_path);
    const shiny_app_directory_path = path.join(app_path, shiny_app_directory_name);
    return shiny_app_directory_path;
};
