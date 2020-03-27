// -----------------------------------------------------------------------------
// Node Libraries
// -----------------------------------------------------------------------------
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const process = require('process');
// -----------------------------------------------------------------------------
// Electron
// -----------------------------------------------------------------------------
const app = require('electron').remote.app;
// -----------------------------------------------------------------------------
// Electron
// -----------------------------------------------------------------------------
// N/A
// -----------------------------------------------------------------------------
// Third-Party Libraries
// -----------------------------------------------------------------------------
const request = require('request');
import React from 'react';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
// ./
// import {
//     FAUSTExecutorDispatchContext,
//     FAUSTExecutorReducerActionType,
//     FAUSTExecutorStateContext,
//     FAUSTExecutorStatus
// } from './faust_executor_reducer';
// // ../
// import {
//     NextflowManagerStateContext,
//     NextflowManagerStatus
// } from '../nextflow_manager';
// import {
//     FAUSTSubmissionFormStateContext,
//     IFAUSTAWSSubmissionFormState
// } from '../faust_submission_form';
// // ../../
// import {
//     default_faust_nextflow_github_tag,
//     default_faust_nextflow_github_url,
//     generateNextflowRunCommand,
//     generateNextflowRunOptions
// } from '../../constants/constants';
import {
    RManagerDispatchContext,
    RManagerReducerActionType,
    RManagerStateContext,
    RManagerStatus
} from './r_manager_reducer';
import { getRPackageFilePath } from '../../constants/file_paths';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

interface IProps {}
export const RManager = (props: IProps) => {
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
    // const [local_state, setLocalState] = React.useState({
    //     was_execution_triggered: false
    // });
    // -----------
    // Hooks
    // -----------
    // N/A
    // -----------
    // Context
    // -----------
    const r_manager_state = React.useContext(RManagerStateContext);
    const rManagerDispatch: any = React.useContext(RManagerDispatchContext);
    // const faust_executor_state = React.useContext(FAUSTExecutorStateContext);
    // const faustExecutorDispatch: any = React.useContext(
    //     FAUSTExecutorDispatchContext
    // );
    // // ---
    // const nextflow_manager_state = React.useContext(
    //     NextflowManagerStateContext
    // );
    // // ---
    // const faust_submission_form_state = React.useContext(
    //     FAUSTSubmissionFormStateContext
    // );
    // -----------
    // Helpers
    // -----------
    // N/A
    const r_download_url = 'https://cloud.r-project.org/bin/macosx/R-3.5.1.pkg';

    // -------------------------------------------------------------------------
    // Logic
    // -------------------------------------------------------------------------
    // N/A

    // -------------------------------------------------------------------------
    // Life Cycle Events
    // -------------------------------------------------------------------------
    // N/A
    // --------------------
    // Start-up
    // --------------------
    React.useEffect(() => {
        if (r_manager_state.status === RManagerStatus.NEW) {
            rManagerDispatch({
                payload: {},
                type: RManagerReducerActionType.DOWNLOAD_R
            });
        }
    });
    React.useEffect(() => {
        if (r_manager_state.status === RManagerStatus.REQUEST_R_DOWNLOAD) {
            rManagerDispatch({
                payload: { status: RManagerStatus.DOWNLOADING_R },
                type: RManagerReducerActionType.SET_STATUS
            });
            // const child_process = require('child_process');
            // const path = require('path');
            // const app = require('electron').remote.app;
            // const binaries_directory = path.join(
            //     app.getPath(),
            //     "binaries"
            // );
            // const executable_file_path = path.join(
            //     binaries_directory,
            //     "executable.exe"
            // );
            // const command = `${executable_file_path} doTheThing`
            // child_process.exec(command, function(
            //     error: any,
            //     standard_out: any,
            //     standard_error: any
            // ) {
            //     console.log(
            //         '---------------------------------\nCommand was run!\n---------------------------------'
            //     );
            //     console.log(error);
            //     console.log(standard_out);
            //     console.log(standard_error);
            // });

            // console.log()
            // // Generated by https://curl.trillworks.com/#node
            // var options = {
            //     url: r_download_url
            // };
            // function callback(error: any, response: any, body: any) {
            //     console.log('Download attempt completed');
            //     if (!error && response.statusCode == 200) {
            //         // console.log(body);
            //         const r_package_file_path = getRPackageFilePath();
            //         response.pipe(fs.createWriteStream(r_package_file_path));
            //     } else {
            //         console.log('An error was encountered!');
            //     }
            // }
            // console.log('Downloading R from: ' + r_download_url);
            // request(options, callback);

            // const nextflow_executable_filepath =
            //     nextflow_manager_state.nextflow_executable_file_path;
            // const update_faust_nextflow_repo_command = `\"${nextflow_executable_filepath}\" pull ${default_faust_nextflow_github_url} -revision ${default_faust_nextflow_github_tag}`;
            // // ./nextflow pull https://github.com/FredHutch/FAUST_Nextflow/
            // // ./nextflow pull https://github.com/FredHutch/FAUST_Nextflow/ -revision development
            // faustExecutorDispatch({
            //     payload: { status: FAUSTExecutorStatus.CONFIGURING },
            //     type: FAUSTExecutorReducerActionType.SET_STATUS
            // });
            // // console.log("RUNNING COMMAND");
            // // console.log(update_faust_nextflow_repo_command);
            // const download_r_mac_script_file_path = 'testing';
            // child_process.exec(download_r_mac_script_file_path, function(
            //     error: any,
            //     standard_out: any,
            //     standard_error: any
            // ) {
            //     faustExecutorDispatch({
            //         payload: { status: FAUSTExecutorStatus.READY },
            //         type: FAUSTExecutorReducerActionType.SET_STATUS
            //     });
            //     console.log(
            //         '---------------------------------\nFAUST has been updated!\n---------------------------------'
            //     );
            //     console.log(error);
            //     console.log(standard_out);
            //     console.log(standard_error);
            // });
        }
    }, [r_manager_state.status]);

    // --------------------
    // Execution Requested
    // --------------------
    // React.useEffect(() => {
    //     if (
    //         nextflow_manager_state.status === NextflowManagerStatus.READY &&
    //         faust_executor_state.status ===
    //             FAUSTExecutorStatus.EXECUTION_REQUESTED &&
    //         local_state.was_execution_triggered === false
    //     ) {
    //         const nextflow_run_options = generateNextflowRunOptions(
    //             faust_submission_form_state
    //         );
    //         const nextflow_executable_file_path =
    //             nextflow_manager_state.nextflow_executable_file_path !== null
    //                 ? nextflow_manager_state.nextflow_executable_file_path
    //                 : 'NEXTFLOW_EXECUTABLE_NOT_FOUND';
    //         const nextflow_run_command = generateNextflowRunCommand(
    //             nextflow_executable_file_path,
    //             nextflow_run_options
    //         );
    //         // This MUST be done in order to execute nextflow because for some reason
    //         // it eats poop when a `\` character exists
    //         const stripped_nextflow_run_command = nextflow_run_command.replace(
    //             /\\/g,
    //             ''
    //         );

    //         // ---------
    //         setLocalState({ ...local_state, was_execution_triggered: true });
    //         faustExecutorDispatch({
    //             payload: { command: stripped_nextflow_run_command },
    //             type: FAUSTExecutorReducerActionType.SET_COMMAND
    //         });
    //         faustExecutorDispatch({
    //             payload: { status: FAUSTExecutorStatus.EXECUTION_RUNNING },
    //             type: FAUSTExecutorReducerActionType.SET_STATUS
    //         });
    //         // This MUST be performed so that the command is executed in the
    //         // correct directory
    //         // If not it will generate the output and work in a random location
    //         process.chdir(
    //             nextflow_manager_state.nextflow_work_directory as string
    //         );

    //         const faust_aws_submission_form_state = faust_submission_form_state as IFAUSTAWSSubmissionFormState;
    //         if (faust_aws_submission_form_state.aws_access_key_id !== null) {
    //             process.env.AWS_ACCESS_KEY_ID =
    //                 faust_aws_submission_form_state.aws_access_key_id;
    //         }
    //         if (
    //             faust_aws_submission_form_state.aws_secret_access_key !== null
    //         ) {
    //             process.env.AWS_SECRET_ACCESS_KEY =
    //                 faust_aws_submission_form_state.aws_secret_access_key;
    //         }
    //         // child_process.exec(
    //         //     'env',
    //         //     (error: any, standard_out: any, standard_error: any) => {
    //         //         console.log(error);
    //         //         console.log(standard_out);
    //         //         console.log(standard_error);
    //         //     }
    //         // );
    //         console.log(
    //             '---------------------------------\nNextflow is starting!\n---------------------------------'
    //         );
    //         console.log('Command Used: ' + stripped_nextflow_run_command);
    //         child_process.exec(
    //             stripped_nextflow_run_command,
    //             (error: any, standard_out: any, standard_error: any) => {
    //                 console.log(
    //                     '---------------------------------\nNextflow run has been completed!\n---------------------------------'
    //                 );
    //                 console.log(error);
    //                 console.log(standard_out);
    //                 console.log(standard_error);
    //                 faustExecutorDispatch({
    //                     payload: {
    //                         command_error: JSON.stringify(error, null, 4)
    //                     },
    //                     type: FAUSTExecutorReducerActionType.SET_COMMAND_ERROR
    //                 });
    //                 faustExecutorDispatch({
    //                     payload: { error_output: standard_error },
    //                     type: FAUSTExecutorReducerActionType.SET_ERROR_OUPUT
    //                 });
    //                 faustExecutorDispatch({
    //                     payload: { standard_output: standard_out },
    //                     type: FAUSTExecutorReducerActionType.SET_STANDARD_OUPUT
    //                 });
    //                 const did_execution_succeed = error === null;
    //                 if (did_execution_succeed) {
    //                     // Route to results page
    //                     faustExecutorDispatch({
    //                         payload: {
    //                             status: FAUSTExecutorStatus.EXECUTION_SUCCEEDED
    //                         },
    //                         type: FAUSTExecutorReducerActionType.SET_STATUS
    //                     });
    //                 } else {
    //                     // Route to failure page
    //                     faustExecutorDispatch({
    //                         payload: {
    //                             status: FAUSTExecutorStatus.EXECUTION_FAILED
    //                         },
    //                         type: FAUSTExecutorReducerActionType.SET_STATUS
    //                     });
    //                 }
    //             }
    //         );
    //     }
    // }, [
    //     faust_executor_state.status,
    //     faust_submission_form_state,
    //     local_state.was_execution_triggered,
    //     nextflow_manager_state.status
    // ]);

    // -------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------
    const r_manager_element = <div />;

    return r_manager_element;
};
