// -----------------------------------------------------------------------------
// Node Libraries
// -----------------------------------------------------------------------------
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const process = require("process");
// -----------------------------------------------------------------------------
// Electron
// -----------------------------------------------------------------------------
const app = require("electron").remote.app;
// -----------------------------------------------------------------------------
// Electron
// -----------------------------------------------------------------------------
// N/A
// -----------------------------------------------------------------------------
// Third-Party Libraries
// -----------------------------------------------------------------------------
import React from "react";
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
import {
    NextflowManagerDispatchContext,
    NextflowManagerReducerActionType,
    NextflowManagerStateContext,
    NextflowManagerStatus
} from "./nextflow_manager_reducer";
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

interface IProps {}
export const NextflowManager = (props: IProps) => {
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
    // N/A
    // -----------
    // Context
    // -----------
    const nextflow_manager_state = React.useContext(NextflowManagerStateContext);
    const nextflowManagerDispatch: any = React.useContext(NextflowManagerDispatchContext);
    // -----------
    // Helpers
    // -----------
    // N/A

    // -------------------------------------------------------------------------
    // Logic
    // -------------------------------------------------------------------------
    // On Start-up
    React.useEffect(() => {
        if (
            nextflow_manager_state.nextflow_executable_file_path === null &&
            nextflow_manager_state.status === NextflowManagerStatus.NEW
        ) {
            // console.log("------------------------------------------------------------");
            // console.log("Running");
            // console.log(app.getAppPath());
            // const faust_working_directory = path.join(app.getAppPath(), "faust_working_directory");
            const faust_working_directory = path.join(app.getPath("appData"), "faust_working_directory");

            const faust_nextflow_directory = path.join(faust_working_directory, "faust_nextflow");
            const nextflow_executable_filepath = path.join(faust_nextflow_directory, "nextflow");
            if (!fs.existsSync(faust_nextflow_directory)) {
                fs.mkdirSync(faust_nextflow_directory, { recursive: true });
            }
            let does_nextflow_executable_already_exist = false;
            try {
                does_nextflow_executable_already_exist = fs.existsSync(nextflow_executable_filepath);
            } catch (err) {
                // Do nothing if it doesn't exist
            }

            nextflowManagerDispatch({
                payload: { nextflow_work_directory: faust_nextflow_directory },
                type: NextflowManagerReducerActionType.SET_NEXTFLOW_WORK_DIRECTORY
            });

            // console.log("nextflow_executable_filepath: " + nextflow_executable_filepath);
            // console.log("does_nextflow_executable_already_exist: " + does_nextflow_executable_already_exist);
            if (does_nextflow_executable_already_exist) {
                // console.log("Nextflow executable already exists");
                nextflowManagerDispatch({
                    payload: { executable_path: nextflow_executable_filepath },
                    type: NextflowManagerReducerActionType.SET_EXECUTABLE_PATH
                });
            } else {
                process.chdir(faust_nextflow_directory);
                // console.log("Nextflow does NOT exists");
                const retrieve_nextflow_command = "curl -s https://get.nextflow.io | bash";
                child_process.exec(retrieve_nextflow_command, function(
                    error: any,
                    standard_out: any,
                    standard_error: any
                ) {
                    nextflowManagerDispatch({
                        payload: { executable_path: nextflow_executable_filepath },
                        type: NextflowManagerReducerActionType.SET_EXECUTABLE_PATH
                    });
                    // Node.js will invoke this callback when process terminates.
                    // console.log(
                    //     "---------------------------------\nNextflow has been download!\n---------------------------------"
                    // );
                    // console.log(error);
                    // console.log(standard_out);
                    // console.log(standard_error);
                });
            }

            nextflowManagerDispatch({
                payload: { status: NextflowManagerStatus.CONFIGURING },
                type: NextflowManagerReducerActionType.SET_STATUS
            });
        }
    }, [nextflow_manager_state.nextflow_executable_file_path]);

    React.useEffect(() => {
        if (
            nextflow_manager_state.nextflow_executable_file_path !== null &&
            nextflow_manager_state.status === NextflowManagerStatus.CONFIGURING
        ) {
            nextflowManagerDispatch({
                payload: { status: NextflowManagerStatus.READY },
                type: NextflowManagerReducerActionType.SET_STATUS
            });
        }
    }, [nextflow_manager_state.nextflow_executable_file_path, nextflow_manager_state.status]);
    // -------------------------------------------------------------------------
    // Life Cycle Events
    // -------------------------------------------------------------------------
    // N/A

    // -------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------
    const nextflow_manager_element = <div />;

    return nextflow_manager_element;
};
