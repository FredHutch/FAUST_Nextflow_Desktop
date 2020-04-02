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
import { IExecutionCommand } from '../../constants/constants';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

// -----------------------------------------------------------------------------
// Contracts
// -----------------------------------------------------------------------------
export enum ShinyManagerStatus {
    NEW = 'NEW',
    // ---
    REQUEST_SHINY_CONFIGURATION = 'REQUEST_SHINY_CONFIGURATION',
    CONFIGURING_SHINY = 'CONFIGURING_SHINY',
    CONFIGURING = 'CONFIGURING',
    // ---
    READY = 'READY',
    // ---
    EXECUTION_REQUESTED = 'EXECUTION_REQUESTED',
    EXECUTION_RUNNING = 'EXECUTION_RUNNING',
    EXECUTION_FAILED = 'EXECUTION_FAILED',
    EXECUTION_SUCCEEDED = 'EXECUTION_SUCCEEDED'
}

const default_exec_command = {
    command: null,
    error: null,
    standard_output: null,
    error_output: null
};
export interface IShinyManagerState {
    was_download_triggered: boolean;
    execution_command: IExecutionCommand;
    status: ShinyManagerStatus;
}

export const default_shiny_manager_state: IShinyManagerState = {
    was_download_triggered: false,
    execution_command: default_exec_command,
    status: ShinyManagerStatus.NEW
};

export const ShinyManagerStateContext = React.createContext(default_shiny_manager_state);
export const ShinyManagerDispatchContext = React.createContext({});
// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------
// TODO
export enum ShinyManagerReducerActionType {
    CONFIGURE_SHINY = 'CONFIGURE_SHINY_INSTALLATION',
    LAUNCH_SHINY = 'LAUNCH_SHINY',
    SET_EXECUTION_COMMAND = 'SET_EXECUTION_COMMAND',
    SET_STATUS = 'SET_STATUS'
}
export interface IShinyManagerReducerAction {
    payload: any;
    type: ShinyManagerReducerActionType;
}

export function ShinyManagerReducer(
    current_state: IShinyManagerState,
    action: IShinyManagerReducerAction
): IShinyManagerState {
    switch (action.type) {
        case ShinyManagerReducerActionType.CONFIGURE_SHINY: {
            const new_state = { ...current_state };
            new_state.status = ShinyManagerStatus.REQUEST_SHINY_CONFIGURATION;
            return new_state;
        }
        case ShinyManagerReducerActionType.LAUNCH_SHINY: {
            const new_state = { ...current_state };
            new_state.status = ShinyManagerStatus.EXECUTION_REQUESTED;
            return new_state;
        }
        case ShinyManagerReducerActionType.SET_EXECUTION_COMMAND: {
            const new_state = { ...current_state };
            new_state.execution_command = { ...action.payload };
            return new_state;
        }
        case ShinyManagerReducerActionType.SET_STATUS: {
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
export function ShinyManagerProvider({ children }: any) {
    const [shiny_manager_state, shiny_manager_dispatch] = React.useReducer(
        ShinyManagerReducer,
        default_shiny_manager_state
    );

    return (
        <ShinyManagerStateContext.Provider value={shiny_manager_state}>
            <ShinyManagerDispatchContext.Provider value={shiny_manager_dispatch}>
                {children}
            </ShinyManagerDispatchContext.Provider>
        </ShinyManagerStateContext.Provider>
    );
}
