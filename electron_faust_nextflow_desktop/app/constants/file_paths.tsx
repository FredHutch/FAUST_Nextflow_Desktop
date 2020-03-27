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

const binaries_directory_name = 'binaries';
const faust_working_directory_name = 'faust_working_directory';

export const getFAUSTWorkingDirectoryPath = () => {
    const faust_working_directory = path.join(
        app.getPath('appData'),
        faust_working_directory_name
    );
    return faust_working_directory;
};

export const getBinariesDirectoryPath = () => {
    const binaries_directory = path.join(
        app.getAppPath(),
        binaries_directory_name
    );
    return binaries_directory;
};

export const getRPackageFilePath = () => {
    // const r_package_file_path = path.join(getBinariesDirectoryPath(), 'r.pkg');
    // TODO: Correct management for os
    const r_package_file_path = path.join(
        getBinariesDirectoryPath(),
        'r',
        'r-mac',
        'R'
    );
    return r_package_file_path;
};
