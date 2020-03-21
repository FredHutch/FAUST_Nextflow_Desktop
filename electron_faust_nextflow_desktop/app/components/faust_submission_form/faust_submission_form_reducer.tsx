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
import { FAUSTCommand, FAUSTNextflowProfile } from '../../constants/constants';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

// -----------------------------------------------------------------------------
// Contracts
// -----------------------------------------------------------------------------
export interface IFAUSTSubmissionFormErrors {
    // Required Input
    gating_set_directory_path: string[];
    // Optional Input
    active_channels_file_path: string[];
    channel_bounds_file_path: string[];
    supervised_list_file_path: string[];
    // Optional Execution
    // TODO
}
export interface IFAUSTLocalSubmissionFormErrors
    extends IFAUSTSubmissionFormErrors {
    // TODO
}
export interface IFAUSTAWSSubmissionFormErrors
    extends IFAUSTSubmissionFormErrors {
    aws_access_key_id: string[];
    aws_batch_job_queue_name: string[];
    aws_s3_bucket_name: string[];
    aws_secret_access_key: string[];
}
export type FAUSTSubmissionFormErrors =
    | IFAUSTLocalSubmissionFormErrors
    | IFAUSTAWSSubmissionFormErrors;
// ------------------------------------------
export interface IFAUSTSubmissionFormState {
    // Required Input
    command: FAUSTCommand;
    profile: FAUSTNextflowProfile;
    gating_set_directory_path: string | null;
    // Optional Input
    active_channels_file_path: string | null;
    channel_bounds_file_path: string | null;
    supervised_list_file_path: string | null;
    // Optional Execution
    // Form Logic
    errors: IFAUSTSubmissionFormErrors;
}
export interface IFAUSTLocalSubmissionFormState
    extends IFAUSTSubmissionFormState {
    // TODO
}
export interface IFAUSTAWSSubmissionFormState
    extends IFAUSTSubmissionFormState {
    // Required Input
    aws_access_key_id: string | null;
    aws_batch_job_queue_name: string | null;
    aws_s3_bucket_name: string | null;
    aws_secret_access_key: string | null;
    // Optional
    // N/A
}
export type FAUSTSubmissionFormState =
    | IFAUSTLocalSubmissionFormState
    | IFAUSTAWSSubmissionFormState;
// -----------------------------------------------------------------------------
export const default_faust_submission_form_state: FAUSTSubmissionFormState = {
    // AWS
    aws_access_key_id: null,
    aws_batch_job_queue_name: null,
    aws_s3_bucket_name: null,
    aws_secret_access_key: null,
    // Everything
    command: FAUSTCommand.generate_annotations,
    profile: FAUSTNextflowProfile.AWS,
    gating_set_directory_path: null,
    active_channels_file_path: null,
    channel_bounds_file_path: null,
    supervised_list_file_path: null,
    errors: {
        gating_set_directory_path: [],
        active_channels_file_path: [],
        channel_bounds_file_path: [],
        supervised_list_file_path: [],
        // aws
        aws_access_key_id: [],
        aws_batch_job_queue_name: [],
        aws_s3_bucket_name: [],
        aws_secret_access_key: []
    }
};

export const FAUSTSubmissionFormStateContext = React.createContext(
    default_faust_submission_form_state
);
export const FAUSTSubmissionFormDispatchContext = React.createContext({});
// -----------------------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------------------
// TODO
export enum FAUSTSubmissionFormReducerActionType {
    SET_FORM_DATA = 'SET_FORM_DATA',
    SET_FORM_ERRORS = 'SET_FORM_ERRORS'
}
export interface IFAUSTSubmissionFormReducerAction {
    payload: any;
    type: FAUSTSubmissionFormReducerActionType;
}

export function FAUSTSubmissionFormReducer(
    current_state: IFAUSTSubmissionFormState,
    action: IFAUSTSubmissionFormReducerAction
): IFAUSTSubmissionFormState {
    switch (action.type) {
        case FAUSTSubmissionFormReducerActionType.SET_FORM_DATA: {
            // This is to preserve the errors just in case someone tries to overwite them
            const new_state = { ...current_state, ...action.payload };
            return new_state;
        }
        case FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS: {
            // This is to preserve the errors just in case someone tries to overwite them
            const new_errors = { ...current_state.errors, ...action.payload };
            const new_state = { ...current_state, errors: new_errors };
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
export function FAUSTSubmissionFormProvider({ children }: any) {
    const [
        faust_submission_form_state,
        faust_submission_form_dispatch
    ] = React.useReducer(
        FAUSTSubmissionFormReducer,
        default_faust_submission_form_state
    );

    return (
        <FAUSTSubmissionFormStateContext.Provider
            value={faust_submission_form_state}
        >
            <FAUSTSubmissionFormDispatchContext.Provider
                value={faust_submission_form_dispatch}
            >
                {children}
            </FAUSTSubmissionFormDispatchContext.Provider>
        </FAUSTSubmissionFormStateContext.Provider>
    );
}
