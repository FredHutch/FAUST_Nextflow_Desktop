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
            const r_executable_file_path = getRPackageFilePath();
            console.log(r_executable_file_path);

            const command = `${r_executable_file_path} --help`;
            child_process.exec(command, function(
                error: any,
                standard_out: any,
                standard_error: any
            ) {
                console.log(
                    '---------------------------------\nCommand was run!\n---------------------------------'
                );
                console.log(error);
                console.log(standard_out);
                console.log(standard_error);
            });
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
