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
    REQUEST_R_DOWNLOAD = 'REQUEST_R_DOWNLOAD',
    DOWNLOADING_R = 'DOWNLOADING_R',
    // ---
    CONFIGURING = 'CONFIGURING',
    READY = 'READY',
    EXECUTION_REQUESTED = 'EXECUTION_REQUESTED',
    EXECUTION_RUNNING = 'EXECUTION_RUNNING',
    EXECUTION_FAILED = 'EXECUTION_FAILED',
    EXECUTION_SUCCEEDED = 'EXECUTION_SUCCEEDED'
}

export interface IExecCommand {
    command: string | null;
    command_error: string | null;
    error: string | null;
    standard_output: string | null;
    error_output: string | null;
}
export interface IFAUSTExecutionOutput {
    //
}
export interface IRManagerState {
    status: RManagerStatus;
}

export const default_r_manager_state: IRManagerState = {
    status: RManagerStatus.NEW
};

export const RManagerStateContext = React.createContext(
    default_r_manager_state
);
export const RManagerDispatchContext = React.createContext({});
// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------
// TODO
export enum RManagerReducerActionType {
    CONFIGURE_R_INSTALLATION = 'CONFIGURE_R_INSTALLATION',
    DOWNLOAD_R = 'DOWNLOAD_R',
    SET_STATUS = 'SET_STATUS'
}
export interface IRManagerReducerAction {
    payload: any;
    type: RManagerReducerActionType;
}

export function RManagerReducer(
    current_state: IRManagerState,
    action: IRManagerReducerAction
): IRManagerState {
    switch (action.type) {
        case RManagerReducerActionType.DOWNLOAD_R: {
            const new_state = { ...current_state };
            new_state.status = RManagerStatus.REQUEST_R_DOWNLOAD;
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
    const [r_manager_state, r_manager_dispatch] = React.useReducer(
        RManagerReducer,
        default_r_manager_state
    );

    return (
        <RManagerStateContext.Provider value={r_manager_state}>
            <RManagerDispatchContext.Provider value={r_manager_dispatch}>
                {children}
            </RManagerDispatchContext.Provider>
        </RManagerStateContext.Provider>
    );
}
