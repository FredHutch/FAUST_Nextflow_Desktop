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

export enum OSType {
    LINUX = 'LINUX',
    OSX = 'OSX',
    WINDOWS = 'WINDOWS'
}

// ------------------------------------------------------------------------------
// FAUST Working Directory
// ------------------------------------------------------------------------------
export const faust_working_directory_name = 'faust_working_directory';
export const getFAUSTWorkingDirectoryPath = () => {
    const faust_working_directory = path.join(app.getPath('appData'), faust_working_directory_name);
    return faust_working_directory;
};

export const binaries_directory_name = 'binaries';
export const shiny_app_directory_name = 'shiny_apps';
export const shiny_start_input_script_name = 'start_shiny_app.r';

// ------------------------------------------------------------------------------
// OS Specific
// ------------------------------------------------------------------------------
export const getOSType = () => {
    return OSType.OSX;
};

export const randomInt = (min: number, max: number) => {
    return Math.round(Math.random() * (max + 1 - min) + min);
};
export const getRandomPort = (): number => {
    // Those forbidden ports are in line with shiny
    // https://github.com/rstudio/shiny/blob/288039162086e183a89523ac0aacab824ef7f016/R/server.R#L734
    const forbiddenPorts = [3659, 4045, 6000, 6665, 6666, 6667, 6668, 6669, 6697];
    while (true) {
        let port = randomInt(3000, 8000);
        if (forbiddenPorts.includes(port)) continue;
        return port;
    }
};

// ------------------------------------------------------------------------------
// Binaries
// ------------------------------------------------------------------------------
export const getBinariesDirectoryPath = () => {
    let app_path: null | string = null;
    // console.log("process.env.NODE_ENV: " + process.env.NODE_ENV);
    // console.log("process.env.DEBUG_PROD: " + process.env.DEBUG_PROD);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        app_path = path.join('app');
    } else {
        app_path = path.join(app.getAppPath(), '..');
    }
    // console.log('APP PATH: ' + app_path);
    const binaries_directory_path = path.join(app_path, binaries_directory_name);
    // console.log('binaries_directory_path: ' + binaries_directory_path);
    return path.resolve(binaries_directory_path);
};

export const getRTopLevelDirectoryPath = () => {
    const r_top_level_directory_path = path.join(getBinariesDirectoryPath(), 'r');
    // console.log('r_top_level_directory_path: ' + r_top_level_directory_path);
    return path.resolve(r_top_level_directory_path);
};

export const getRDirectoryPath = () => {
    const r_version = '4.0.2';
    const r_directory_path = path.join(getRTopLevelDirectoryPath(), 'r-mac', r_version, 'lib', 'R');
    // console.log('r_directory_path: ' + r_directory_path);
    return path.resolve(r_directory_path);
};

export const getRFilePath = (): string => {
    const r_file_path = path.join(getRDirectoryPath(), 'bin', 'R');
    // console.log('r_file_path: ' + r_file_path);
    return path.resolve(r_file_path);
};

export const getRScriptFilePath = () => {
    const r_script_file_path = path.join(getRDirectoryPath(), 'bin', 'Rscript');
    // console.log('r_script_file_path: ' + r_script_file_path);
    return path.resolve(r_script_file_path);
};

export const getRLibraryFilePath = () => {
    // const r_script_file_path = path.join(getRDirectoryPath(), 'library');
    const r_script_file_path = path.join(getRDirectoryPath(), 'library');
    // console.log('r_script_file_path: ' + r_script_file_path);
    return path.resolve(r_script_file_path);
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
    return path.resolve(shiny_app_directory_path);
};

export const getShinyAppStartScriptFilePath = () => {
    const shiny_app_directory_path = getShinyAppDirectoryPath();
    const shiny_app_start_script_file_path = path.join(shiny_app_directory_path, shiny_start_input_script_name);
    return path.resolve(shiny_app_start_script_file_path);
};
export const getShinyAppStartScriptOutputFilePath = () => {
    const shiny_start_script_output_file_path = getShinyAppStartScriptFilePath() + '.R.out';
    return path.resolve(shiny_start_script_output_file_path);
};

export const getStartShinyAppCommand = () => {
    // const r_file_path = getRFilePath();
    // const shiny_start_script_input_file_path = getShinyAppStartScriptFilePath();
    // const shiny_start_script_output_file_path = getShinyAppStartScriptOutputFilePath();

    // const command_to_execute = `${r_file_path} CMD BATCH --verbose ${shiny_start_script_input_file_path} ${shiny_start_script_output_file_path}`;
    // -------------------------------------------------------------------------
    const r_script_file_path = getRScriptFilePath();
    const shiny_start_script_input_file_path = getShinyAppStartScriptFilePath();

    const command_to_execute = `${r_script_file_path} --verbose ${shiny_start_script_input_file_path}`;

    return command_to_execute;
};

// Needed for the start script to know what to target
export const getShinyAppFilePath = (): string => {
    const shiny_app_directory_path = getShinyAppDirectoryPath();
    const shiny_app_file_path = path.join(shiny_app_directory_path, 'faust_tools', 'inst', 'NewFAUSTApp', 'app.R');
    return path.resolve(shiny_app_file_path);
};

export const getShinyAppHost = (): string => {
    return '127.0.0.1';
};

export const getShinyAppPort = (): number => {};

// ------------------------------------------------------------------------------
// Java
// ------------------------------------------------------------------------------
export const getBinariesJavaDirectoryPath = () => {
    const binaries_java_directory_path = path.join(getBinariesDirectoryPath(), 'java');
    return path.resolve(binaries_java_directory_path);
};

export const getJavaHomeDirectoryPath = () => {
    const current_os_type = getOSType();
    switch (current_os_type) {
        case OSType.LINUX:
            console.error('LINUX NOT IMPLEMENTED YET');
            break;
        case OSType.OSX:
            const osx_home_path = path.join(getBinariesJavaDirectoryPath(), 'osx', 'Contents', 'Home');
            return path.resolve(osx_home_path);
        case OSType.WINDOWS:
            console.error('WINDOWS NOT IMPLEMENTED YET');
            break;
    }
};

// ------------------------------------------------------------------------------
// Nextflow
// ------------------------------------------------------------------------------
export const getBinariesNextflowDirectoryPath = () => {
    const binaries_nextflow_directory_path = path.join(getBinariesDirectoryPath(), 'nextflow');
    return path.resolve(binaries_nextflow_directory_path);
};

export const getNextflowExecutableFilePath = () => {
    const current_os_type = getOSType();
    switch (current_os_type) {
        case OSType.LINUX:
            console.error('LINUX NOT IMPLEMENTED YET');
            break;
        case OSType.OSX:
            const osx_home_path = path.join(getBinariesNextflowDirectoryPath(), 'nextflow');
            return path.resolve(osx_home_path);
        case OSType.WINDOWS:
            console.error('WINDOWS NOT IMPLEMENTED YET');
            break;
    }
};
