// -----------------------------------------------------------------------------
// Node Libraries
// -----------------------------------------------------------------------------
// N/A
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
// N/A
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

// -----------------------------------------------------------------------------
// Contracts
// -----------------------------------------------------------------------------
export enum NextflowManagerStatus {
    NEW = "NEW",
    CONFIGURING = "CONFIGURING",
    READY = "READY"
}

export interface INextflowManagerState {
    nextflow_executable_file_path: string | null;
    nextflow_work_directory: string | null;
    status: NextflowManagerStatus;
}
export const default_nextflow_manager_state: INextflowManagerState = {
    nextflow_executable_file_path: null,
    nextflow_work_directory: null,
    status: NextflowManagerStatus.NEW
};

export const NextflowManagerStateContext = React.createContext(default_nextflow_manager_state);
export const NextflowManagerDispatchContext = React.createContext({});
// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------
// TODO
export enum NextflowManagerReducerActionType {
    SET_EXECUTABLE_PATH = "SET_EXECUTABLE_PATH",
    SET_NEXTFLOW_WORK_DIRECTORY = "SET_NEXTFLOW_WORK_DIRECTORY",
    SET_STATUS = "SET_STATUS"
}
export interface INextflowManagerReducerAction {
    payload: any;
    type: NextflowManagerReducerActionType;
}

export function NextflowManagerReducer(
    current_state: INextflowManagerState,
    action: INextflowManagerReducerAction
): INextflowManagerState {
    // console.log("------------------------------------------------------------");
    // console.log(current_state);
    // console.log(action);
    switch (action.type) {
        case NextflowManagerReducerActionType.SET_EXECUTABLE_PATH: {
            const new_state = { ...current_state };
            new_state.nextflow_executable_file_path = action.payload.executable_path;
            return new_state;
        }
        case NextflowManagerReducerActionType.SET_NEXTFLOW_WORK_DIRECTORY: {
            const new_state = { ...current_state };
            new_state.nextflow_work_directory = action.payload.nextflow_work_directory;
            return new_state;
        }
        case NextflowManagerReducerActionType.SET_STATUS: {
            const new_state = { ...current_state };
            new_state.status = action.payload.status;
            return new_state;
        }
        default: {
            return { ...current_state };
        }
    }
}

// -----------------------------------------------------------------------------
// Provider
// -----------------------------------------------------------------------------
export function NextflowManagerProvider({ children }: any) {
    const [nextflow_manager_state, nextflow_manager_dispatch] = React.useReducer(
        NextflowManagerReducer,
        default_nextflow_manager_state
    );

    return (
        <NextflowManagerStateContext.Provider value={nextflow_manager_state}>
            <NextflowManagerDispatchContext.Provider value={nextflow_manager_dispatch}>
                {children}
            </NextflowManagerDispatchContext.Provider>
        </NextflowManagerStateContext.Provider>
    );
}
