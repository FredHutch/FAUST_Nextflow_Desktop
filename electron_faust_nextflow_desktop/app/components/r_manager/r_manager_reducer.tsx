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
import React from 'react';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
//
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

// -----------------------------------------------------------------------------
// Contracts
// -----------------------------------------------------------------------------
export enum RManagerStatus {
    NEW = 'NEW',
    // ---
    REQUEST_R_CONFIGURATION = 'REQUEST_R_CONFIGURATION',
    CONFIGURING_R = 'CONFIGURING_R',
    CONFIGURING = 'CONFIGURING',
    // ---
    READY = 'READY',
    // ---
    EXECUTION_REQUESTED = 'EXECUTION_REQUESTED',
    EXECUTION_RUNNING = 'EXECUTION_RUNNING',
    EXECUTION_FAILED = 'EXECUTION_FAILED',
    EXECUTION_SUCCEEDED = 'EXECUTION_SUCCEEDED'
}

export interface IExecutionCommand {
    command: string | null;
    error: string | null;
    standard_output: string | null;
    error_output: string | null;
}
const default_exec_command = {
    command: null,
    error: null,
    standard_output: null,
    error_output: null
};
export interface IRManagerState {
    was_download_triggered: boolean;
    execution_command: IExecutionCommand;
    status: RManagerStatus;
}

export const default_r_manager_state: IRManagerState = {
    was_download_triggered: false,
    execution_command: default_exec_command,
    status: RManagerStatus.NEW
};

export const RManagerStateContext = React.createContext(default_r_manager_state);
export const RManagerDispatchContext = React.createContext({});
// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------
// TODO
export enum RManagerReducerActionType {
    CONFIGURE_R = 'CONFIGURE_R_INSTALLATION',
    SET_EXECUTION_COMMAND = 'SET_EXECUTION_COMMAND',
    SET_STATUS = 'SET_STATUS'
}
export interface IRManagerReducerAction {
    payload: any;
    type: RManagerReducerActionType;
}

export function RManagerReducer(current_state: IRManagerState, action: IRManagerReducerAction): IRManagerState {
    switch (action.type) {
        case RManagerReducerActionType.CONFIGURE_R: {
            const new_state = { ...current_state };
            new_state.status = RManagerStatus.REQUEST_R_CONFIGURATION;
            return new_state;
        }
        case RManagerReducerActionType.SET_EXECUTION_COMMAND: {
            const new_state = { ...current_state };
            new_state.execution_command = { ...action.payload };
            return new_state;
        }
        case RManagerReducerActionType.SET_STATUS: {
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
export function RManagerProvider({ children }: any) {
    const [r_manager_state, r_manager_dispatch] = React.useReducer(RManagerReducer, default_r_manager_state);

    return (
        <RManagerStateContext.Provider value={r_manager_state}>
            <RManagerDispatchContext.Provider value={r_manager_dispatch}>{children}</RManagerDispatchContext.Provider>
        </RManagerStateContext.Provider>
    );
}
