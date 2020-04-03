// -----------------------------------------------------------------------------
// Node Libraries
// -----------------------------------------------------------------------------
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
// -----------------------------------------------------------------------------
// Electron
// -----------------------------------------------------------------------------
// N/A
// -----------------------------------------------------------------------------
// Electron
// -----------------------------------------------------------------------------
// N/A
// -----------------------------------------------------------------------------
// Third-Party Libraries
// -----------------------------------------------------------------------------
import React from 'react';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
import {
    ShinyManagerDispatchContext,
    ShinyManagerReducerActionType,
    ShinyManagerStateContext,
    ShinyManagerStatus
} from './shiny_manager_reducer';
import {
    // RManagerDispatchContext,
    // RManagerReducerActionType,
    RManagerStateContext,
    RManagerStatus
} from '../r_manager';
import {
    getRTopLevelDirectoryPath,
    getRDirectoryPath,
    getStartShinyAppCommand,
    getShinyAppStartScriptFilePath,
    shiny_start_script_name
} from '../../constants/file_paths';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

interface IProps {}
export const ShinyManager = (props: IProps) => {
    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------
    // -----------
    // Props
    // -----------
    // N/A
    // -----------
    // Local State
    // -----------
    const [local_state, setLocalState] = React.useState({
        // was_configuration_executed: false
        was_execution_triggered: false
    });
    // -----------
    // Hooks
    // -----------
    // N/A
    // -----------
    // Context
    // -----------
    const r_manager_state = React.useContext(RManagerStateContext);
    // const rManagerDispatch: any = React.useContext(RManagerDispatchContext);
    // ---
    const shiny_manager_state = React.useContext(ShinyManagerStateContext);
    const shinyManagerDispatch: any = React.useContext(ShinyManagerDispatchContext);
    // -----------
    // Helpers
    // -----------
    // N/A

    // -------------------------------------------------------------------------
    // Logic
    // -------------------------------------------------------------------------
    // N/A

    // -------------------------------------------------------------------------
    // Life Cycle Events
    // -------------------------------------------------------------------------
    // --------------------
    // Start Up
    // --------------------
    React.useEffect(() => {
        if (r_manager_state.status === RManagerStatus.READY && shiny_manager_state.status === ShinyManagerStatus.NEW) {
            console.log('Running shiny!');
            shinyManagerDispatch({
                payload: {},
                type: ShinyManagerReducerActionType.CONFIGURE_SHINY
            });
        }
    }, [r_manager_state.status, shiny_manager_state.status]);

    // --------------------
    // Configuration
    // --------------------
    React.useEffect(() => {
        if (
            r_manager_state.status === RManagerStatus.READY &&
            shiny_manager_state.status === ShinyManagerStatus.REQUEST_SHINY_CONFIGURATION
        ) {
            shinyManagerDispatch({
                payload: { status: ShinyManagerStatus.CONFIGURING_SHINY },
                type: ShinyManagerReducerActionType.SET_STATUS
            });
        }
    }, [shiny_manager_state.status]);
    React.useEffect(() => {
        if (shiny_manager_state.status === ShinyManagerStatus.CONFIGURING_SHINY) {
            shinyManagerDispatch({
                payload: { status: ShinyManagerStatus.READY },
                type: ShinyManagerReducerActionType.SET_STATUS
            });
        }
    }, [r_manager_state.status, shiny_manager_state.status]);

    // --------------------
    // Execution Requested
    // --------------------
    React.useEffect(() => {
        if (
            r_manager_state.status === RManagerStatus.READY &&
            shiny_manager_state.status === ShinyManagerStatus.EXECUTION_REQUESTED &&
            local_state.was_execution_triggered === false
        ) {
            // const r_executable_file_path = getRFilePath();
            // const does_file_exist = fs.existsSync(r_executable_file_path);
            // if (does_file_exist) {
            setLocalState({ ...local_state, was_execution_triggered: true });

            shinyManagerDispatch({
                payload: { status: ShinyManagerStatus.EXECUTION_RUNNING },
                type: ShinyManagerReducerActionType.SET_STATUS
            });

            // BIG WARNING: The R executable REQUIRES this env to point to the
            //              directory containing R. Otherwise it will NOT know
            //              where to execute.
            //              This only works for the `R` entry point
            //              Rscript is broken :'(
            process.env.R_HOME_DIR = getRDirectoryPath();
            process.env.R_HOME = getRDirectoryPath();
            console.log(process.env.R_HOME_DIR);

            // R_HOME_DIR="/Users/lknecht/Repositories/FAUST_Nextflow_Desktop/electron_faust_nextflow_desktop/app/binaries/r/r-mac"
            const start_shiny_app_command = getStartShinyAppCommand();
            // const command = `${r_executable_file_path} --help`;
            console.log('--------------');
            console.log('RUNNING SHINY');
            console.log('command:' + start_shiny_app_command);
            // console.log('commands: ' + command);
            child_process.exec(start_shiny_app_command, function(error: any, standard_out: any, standard_error: any) {
                // WARNING: R Has to be executed with `R CMD BATCH` which outputs
                //          all information to a file matching the script's path/name
                //          AND appends a .Rout suffix to it.
                //          This is placed in the `R_HOME_DIR`
                //          So in order to know what happened we have to read it
                const output_file_name = shiny_start_script_name + '.Rout';
                const output_file_path = path.join(getRTopLevelDirectoryPath(), output_file_name);
                const output_file_contents = fs.readFileSync(output_file_path, 'utf8');
                console.log('---------------------------------\nCommand was run!\n---------------------------------');
                console.log(error);
                console.log(output_file_contents);
                console.log(standard_error);
                shinyManagerDispatch({
                    payload: {
                        command: start_shiny_app_command,
                        error: error,
                        standard_output: output_file_contents,
                        error_output: standard_error
                    },
                    type: ShinyManagerReducerActionType.SET_EXECUTION_COMMAND
                });

                if (error === null) {
                    shinyManagerDispatch({
                        payload: {
                            status: ShinyManagerStatus.EXECUTION_SUCCEEDED
                        },
                        type: ShinyManagerReducerActionType.SET_STATUS
                    });
                } else {
                    // An error happened!
                    console.error('An unexpected error has occurred while trying to run Shiny!');
                    shinyManagerDispatch({
                        payload: {
                            status: ShinyManagerStatus.EXECUTION_FAILED
                        },
                        type: ShinyManagerReducerActionType.SET_STATUS
                    });
                }
            });
            // } else {
            //     console.error('The R binary required was not found!');
            //     console.error('Path: ' + r_executable_file_path);
            //     console.error('Please make sure this is bundled correcty!');
            //     shinyManagerDispatch({
            //         payload: {
            //             status: ShinyManagerStatus.EXECUTION_FAILED
            //         },
            //         type: ShinyManagerReducerActionType.SET_STATUS
            //     });
            // }
        }
    }, [r_manager_state.status, local_state, shiny_manager_state.status]);

    // -------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------
    const r_manager_element = <div />;

    return r_manager_element;
};
