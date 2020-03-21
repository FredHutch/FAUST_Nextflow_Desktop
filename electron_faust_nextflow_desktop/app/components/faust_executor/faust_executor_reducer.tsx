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
//
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

// -----------------------------------------------------------------------------
// Contracts
// -----------------------------------------------------------------------------
export enum FAUSTExecutorStatus {
    NEW = "NEW",
    CONFIGURING = "CONFIGURING",
    READY = "READY",
    EXECUTION_REQUESTED = "EXECUTION_REQUESTED",
    EXECUTION_RUNNING = "EXECUTION_RUNNING",
    EXECUTION_FAILED = "EXECUTION_FAILED",
    EXECUTION_SUCCEEDED = "EXECUTION_SUCCEEDED"
}

export interface IFAUSTExecutionOutput {
    command: string | null;
    command_error: string | null;
    error: string | null;
    standard_output: string | null;
    error_output: string | null;
}
export interface IFAUSTExecutorState {
    execution_output: FAUSTExecutorStatus;
    status: FAUSTExecutorStatus;
}

export const default_faust_executor_state: IFAUSTExecutorState = {
    status: FAUSTExecutorStatus.NEW
};

export const FAUSTExecutorStateContext = React.createContext(default_faust_executor_state);
export const FAUSTExecutorDispatchContext = React.createContext({});
// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------
// TODO
export enum FAUSTExecutorReducerActionType {
    SET_COMMAND = "SET_COMMAND",
    SET_COMMAND_ERROR = "SET_COMMAND_ERROR",
    SET_ERROR_OUPUT = "SET_ERROR_OUPUT",
    SET_STANDARD_OUPUT = "SET_STANDARD_OUPUT",
    SET_STATUS = "SET_STATUS"
}
export interface IFAUSTExecutorReducerAction {
    payload: any;
    type: FAUSTExecutorReducerActionType;
}

export function FAUSTExecutorReducer(
    current_state: IFAUSTExecutorState,
    action: IFAUSTExecutorReducerAction
): IFAUSTExecutorState {
    switch (action.type) {
        case FAUSTExecutorReducerActionType.SET_COMMAND: {
            const new_state = { ...current_state };
            new_state.command = action.payload.command;
            return new_state;
        }
        case FAUSTExecutorReducerActionType.SET_COMMAND_ERROR: {
            const new_state = { ...current_state };
            new_state.command_error = action.payload.command_error;
            return new_state;
        }
        case FAUSTExecutorReducerActionType.SET_ERROR_OUPUT: {
            const new_state = { ...current_state };
            new_state.error_output = action.payload.error_output;
            return new_state;
        }
        case FAUSTExecutorReducerActionType.SET_STANDARD_OUPUT: {
            const new_state = { ...current_state };
            new_state.standard_output = action.payload.standard_output;
            return new_state;
        }
        case FAUSTExecutorReducerActionType.SET_STATUS: {
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
export function FAUSTExecutorProvider({ children }: any) {
    const [faust_executor_state, faust_executor_dispatch] = React.useReducer(
        FAUSTExecutorReducer,
        default_faust_executor_state
    );

    return (
        <FAUSTExecutorStateContext.Provider value={faust_executor_state}>
            <FAUSTExecutorDispatchContext.Provider value={faust_executor_dispatch}>
                {children}
            </FAUSTExecutorDispatchContext.Provider>
        </FAUSTExecutorStateContext.Provider>
    );
}
