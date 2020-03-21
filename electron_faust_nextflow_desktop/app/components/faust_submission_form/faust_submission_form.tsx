// -----------------------------------------------------------------------------
// Node Libraries
// -----------------------------------------------------------------------------
const path = require('path');
// -----------------------------------------------------------------------------
// Electron
// -----------------------------------------------------------------------------
const { shell } = require('electron');
// -----------------------------------------------------------------------------
// Third-Party Libraries
// -----------------------------------------------------------------------------
import React from 'react';
import { useHistory } from 'react-router-dom';
import {
    Alert,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Tooltip
} from 'reactstrap';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
// ./
import {
    FAUSTSubmissionFormDispatchContext,
    FAUSTSubmissionFormReducerActionType,
    FAUSTSubmissionFormStateContext
} from './faust_submission_form_reducer';
import { ProfileSelectorForm } from './profile_selector_form.tsx';
// ../
import {
    NextflowManagerStateContext,
    NextflowManagerStatus
} from '../nextflow_manager';
import {
    FAUSTExecutorDispatchContext,
    FAUSTExecutorStateContext,
    FAUSTExecutorStatus,
    FAUSTExecutorReducerActionType
} from '../faust_executor';
// ../../
import {
    FAUSTCommand,
    FAUSTNextflowProfile,
    generateNextflowRunCommand,
    generateNextflowRunOptions,
    NextflowUserRunOptions
} from '../../constants/constants';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
import {
    getErrorPagePath,
    getProcessingPagePath,
    getResultsPagePath
} from '../../constants/app_paths';

interface IProps {
    debug?: boolean;
}
export const FAUSTSubmissionForm = (props: IProps) => {
    // -------------------------------------------------------------------------
    // State
    // -------------------------------------------------------------------------
    // -----------
    // Props
    // -----------
    // const { debug } = props;
    // -----------
    // Local State
    // -----------
    // FAUST Command - Drop down toggle
    const [local_debug_state, setLocalDebugState] = React.useState({
        was_debug_debug_execution_fired: false,
        was_debug_redirect_fired: false
    });
    const [is_drop_down_open, setDropDownOpen] = React.useState(false);
    const toggle = () => setDropDownOpen(!is_drop_down_open);
    // ----
    const [
        show_submit_button_tooltip,
        setShowSubmitButtonTooltip
    ] = React.useState(false);
    // -----------
    // Hooks
    // -----------
    const history = useHistory();
    // -----------
    // Context
    // -----------
    const faust_submission_form_state = React.useContext(
        FAUSTSubmissionFormStateContext
    );
    const faustSubmissionFormDispatch: any = React.useContext(
        FAUSTSubmissionFormDispatchContext
    );
    // ---
    const nextflow_manager_state = React.useContext(
        NextflowManagerStateContext
    );
    // ---
    const faust_executor_state = React.useContext(FAUSTExecutorStateContext);
    const faustExecutorDispatch: any = React.useContext(
        FAUSTExecutorDispatchContext
    );
    // -----------
    // Helpers
    // -----------
    const nextflow_run_options = generateNextflowRunOptions(
        faust_submission_form_state
    );
    // -----
    // This is just for show
    const example_nextflow_run_command = generateNextflowRunCommand(
        './nextflow',
        nextflow_run_options
    );
    const example_nextflow_run_command_arguments = example_nextflow_run_command.split(
        '\\'
    );
    const example_nextflow_run_command_elements = example_nextflow_run_command_arguments.map(
        (command_line: string, index: number) => {
            const is_last_command =
                index === example_nextflow_run_command_arguments.length - 1;
            if (is_last_command) {
                return <div key={index}>{command_line}</div>;
            } else {
                return <div key={index}>{command_line} \</div>;
            }
        }
    );
    // -----
    const is_faust_submission_form_ready =
        faust_submission_form_state.gating_set_directory_path !== null &&
        faust_submission_form_state.errors.gating_set_directory_path.length ===
            0 &&
        // ----
        faust_submission_form_state.active_channels_file_path !== null &&
        faust_submission_form_state.errors.active_channels_file_path.length ===
            0 &&
        // ----
        faust_submission_form_state.channel_bounds_file_path !== null &&
        faust_submission_form_state.errors.channel_bounds_file_path.length ===
            0 &&
        // ----
        faust_submission_form_state.supervised_list_file_path !== null &&
        faust_submission_form_state.errors.supervised_list_file_path.length ===
            0;
    const is_everything_ready_to_run_faust =
        is_faust_submission_form_ready === true &&
        nextflow_manager_state.nextflow_work_directory !== null &&
        nextflow_manager_state.status === NextflowManagerStatus.READY &&
        faust_executor_state.status === FAUSTExecutorStatus.READY;
    if (is_everything_ready_to_run_faust && show_submit_button_tooltip) {
        setShowSubmitButtonTooltip(false);
    }

    // -------------------------------------------------------------------------
    // For lazy debugging
    // -------------------------------------------------------------------------
    // if (
    //     nextflow_manager_state.nextflow_work_directory !== null &&
    //     nextflow_manager_state.status === NextflowManagerStatus.READY &&
    //     faust_executor_state.status === FAUSTExecutorStatus.READY &&
    //     faust_submission_form_state.gating_set_directory_path === null &&
    //     faust_submission_form_state.active_channels_file_path === null &&
    //     faust_submission_form_state.channel_bounds_file_path === null &&
    //     faust_submission_form_state.supervised_list_file_path === null
    // ) {
    //     faustSubmissionFormDispatch({
    //         payload: {
    //             gating_set_directory_path:
    //                 '/Users/lknecht/Desktop/FAUST/performance_tests/gating_sets/gs_size_001MB',
    //             active_channels_file_path:
    //                 '/Users/lknecht/Desktop/FAUST/performance_tests/helper_files/activeChannels.rds',
    //             channel_bounds_file_path:
    //                 '/Users/lknecht/Desktop/FAUST/performance_tests/helper_files/channelBounds.rds',
    //             supervised_list_file_path:
    //                 '/Users/lknecht/Desktop/FAUST/performance_tests/helper_files/supervisedList.rds',
    //             // AWS
    //             aws_access_key_id: 'REDACTED',
    //             aws_batch_job_queue_name: 'lknecht-nextflow-test',
    //             aws_s3_bucket_name: 'lknecht-nextflow-test',
    //             aws_secret_access_key:
    //                 'REDACTED'
    //         },
    //         type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
    //     });
    // }
    // if (
    //     faust_submission_form_state.gating_set_directory_path !== null &&
    //     faust_submission_form_state.active_channels_file_path !== null &&
    //     faust_submission_form_state.channel_bounds_file_path !== null &&
    //     faust_submission_form_state.supervised_list_file_path !== null &&
    //     local_debug_state.was_debug_debug_execution_fired === false
    // ) {
    //     setLocalDebugState({
    //         ...local_debug_state,
    //         was_debug_debug_execution_fired: true
    //     });
    //     faustExecutorDispatch({
    //         payload: { status: FAUSTExecutorStatus.EXECUTION_REQUESTED },
    //         type: FAUSTExecutorReducerActionType.SET_STATUS
    //     });
    // }
    // if (
    //     faust_executor_state.status ===
    //         FAUSTExecutorStatus.EXECUTION_SUCCEEDED &&
    //     !local_debug_state.was_debug_redirect_fired
    // ) {
    //     setLocalDebugState({
    //         ...local_debug_state,
    //         was_debug_redirect_fired: true
    //     });
    //     history.push(getResultsPagePath());
    // }

    // if (
    //     faust_executor_state.status === FAUSTExecutorStatus.EXECUTION_FAILED &&
    //     !local_debug_state.was_debug_redirect_fired
    // ) {
    //     setLocalDebugState({
    //         ...local_debug_state,
    //         was_debug_redirect_fired: true
    //     });
    //     history.push(getErrorPagePath());
    // }
    // -------------------------------------------------------------------------

    // -------------------------------------------------------------------------
    // Logic
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // AWS
    // -------------------------------------------------------------------------
    const validateAWSAccessKeyID = (aws_access_key_id: string): string[] => {
        const errors: string[] = [];
        if (aws_access_key_id === '') {
            errors.push('An empty key was specified.');
        }
        // TODO - do more
        return errors;
    };
    const handleAWSAccessKeyIDChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const aws_access_key_id_errors = validateAWSAccessKeyID(value);
        faustSubmissionFormDispatch({
            payload: { aws_access_key_id: value },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
        });
        faustSubmissionFormDispatch({
            payload: { aws_access_key_id: aws_access_key_id_errors },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
        });
    };
    // ----------------------------------------
    const validateAWSS3BucketName = (aws_access_key_id: string): string[] => {
        const errors: string[] = [];
        if (aws_access_key_id === '') {
            errors.push('An empty key was specified.');
        }
        // TODO - do more
        return errors;
    };
    const handleAWSS3BucketNameChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const aws_s3_bucket_name_errors = validateAWSS3BucketName(value);
        faustSubmissionFormDispatch({
            payload: { aws_s3_bucket_name: value },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
        });
        faustSubmissionFormDispatch({
            payload: { aws_s3_bucket_name: aws_s3_bucket_name_errors },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
        });
    };
    // ----------------------------------------
    const validateAWSBatchJobQueueName = (
        aws_access_key_id: string
    ): string[] => {
        const errors: string[] = [];
        if (aws_access_key_id === '') {
            errors.push('An empty key was specified.');
        }
        // TODO - do more
        return errors;
    };
    const handleAWSBatchJobQueueNameChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const aws_batch_job_queue_name_errors = validateAWSBatchJobQueueName(
            value
        );
        faustSubmissionFormDispatch({
            payload: { aws_batch_job_queue_name: value },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
        });
        faustSubmissionFormDispatch({
            payload: {
                aws_batch_job_queue_name: aws_batch_job_queue_name_errors
            },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
        });
    };
    // ----------------------------------------
    const validateAWSSecretAccessKey = (
        aws_secret_access_key: string
    ): string[] => {
        const errors: string[] = [];
        if (aws_secret_access_key === '') {
            errors.push('An empty key was specified.');
        }
        // TODO - do more
        return errors;
    };
    const handleAWSSecretAccessKeyChange = (event: any) => {
        const target = event.target;
        const value = target.value;
        const aws_secret_access_key_errors = validateAWSSecretAccessKey(value);
        faustSubmissionFormDispatch({
            payload: { aws_secret_access_key: value },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
        });
        faustSubmissionFormDispatch({
            payload: {
                aws_secret_access_key: aws_secret_access_key_errors
            },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
        });
    };
    // -------------------------------------------------------------------------
    // General
    // -------------------------------------------------------------------------
    const validateInputGatingSetDirectoryPath = (
        directory_path: string
    ): string[] => {
        const errors: string[] = [];
        if (directory_path === '') {
            errors.push('An empty path was specified.');
        }
        // TODO - do more
        return errors;
    };
    const handleInputGatingSetDirectoryPathChange = (event: any) => {
        const target = event.target;
        const do_files_exist = target.files.length > 0;
        if (do_files_exist) {
            const file_path = target.files[0].path;
            const directory_path = path.dirname(file_path);
            // console.log(file_path);
            // console.log(directory_path);
            const input_gating_set_errors = validateInputGatingSetDirectoryPath(
                directory_path
            );
            faustSubmissionFormDispatch({
                payload: { gating_set_directory_path: directory_path },
                type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
            });
            faustSubmissionFormDispatch({
                payload: { gating_set_directory_path: input_gating_set_errors },
                type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
            });
        } else {
            const error_message =
                'The specified directory has no files to use!';
            console.error(error_message);
            faustSubmissionFormDispatch({
                payload: { gating_set_directory_path: [error_message] },
                type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
            });
        }
    };
    // ----------------------------------------
    const validateActiveChannelsFilePath = (file_path: string): string[] => {
        const errors: string[] = [];
        if (file_path === '') {
            errors.push('An empty path was specified.');
        }
        // TODO - do more
        return errors;
    };
    const handleInputActiveChannelsFileChange = (event: React.FormEvent) => {
        const target = event.target;
        const target_files = target.files;
        const selected_file = target_files[0];
        const selected_file_path = selected_file.path;
        const active_channels_file_path_errors = validateActiveChannelsFilePath(
            selected_file_path
        );
        // console.log(event);
        // console.log(target);
        // console.log(target_files);
        // console.log(selected_file);
        // console.log(selected_file_path);
        faustSubmissionFormDispatch({
            payload: { active_channels_file_path: selected_file_path },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
        });
        faustSubmissionFormDispatch({
            payload: {
                active_channels_file_path: active_channels_file_path_errors
            },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
        });
    };
    // ----------------------------------------
    const validateChannelBoundsFilePath = (file_path: string): string[] => {
        const errors: string[] = [];
        if (file_path === '') {
            errors.push('An empty path was specified.');
        }
        // TODO - do more
        return errors;
    };
    const handleInputChannelBoundsFileChange = (event: React.FormEvent) => {
        const target = event.target;
        const target_files = target.files;
        const selected_file = target_files[0];
        const selected_file_path = selected_file.path;
        const channel_bounds_file_path_errors = validateChannelBoundsFilePath(
            selected_file_path
        );
        // console.log(event);
        // console.log(target);
        // console.log(target_files);
        // console.log(selected_file);
        // console.log(selected_file_path);
        faustSubmissionFormDispatch({
            payload: { channel_bounds_file_path: selected_file_path },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
        });
        faustSubmissionFormDispatch({
            payload: {
                channel_bounds_file_path: channel_bounds_file_path_errors
            },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
        });
    };
    // ----------------------------------------
    const validateSupervisedListFilePath = (file_path: string): string[] => {
        const errors: string[] = [];
        if (file_path === '') {
            errors.push('An empty path was specified.');
        }
        // TODO - do more
        return errors;
    };
    const handleInputSupervisedListFileChange = (event: React.FormEvent) => {
        const target = event.target;
        const target_files = target.files;
        const selected_file = target_files[0];
        const selected_file_path = selected_file.path;
        const supervised_list_file_path_errors = validateSupervisedListFilePath(
            selected_file_path
        );
        // console.log(event);
        // console.log(target);
        // console.log(target_files);
        // console.log(selected_file);
        // console.log(selected_file_path);
        faustSubmissionFormDispatch({
            payload: { supervised_list_file_path: selected_file_path },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
        });
        faustSubmissionFormDispatch({
            payload: {
                supervised_list_file_path: supervised_list_file_path_errors
            },
            type: FAUSTSubmissionFormReducerActionType.SET_FORM_ERRORS
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        // console.log("submitting");
        if (is_everything_ready_to_run_faust) {
            faustExecutorDispatch({
                payload: { status: FAUSTExecutorStatus.EXECUTION_REQUESTED },
                type: FAUSTExecutorReducerActionType.SET_STATUS
            });
            // FIRE IT OFF!
            history.push(getProcessingPagePath());
        }
    };

    // -------------------------------------------------------------------------
    // Life Cycle Events
    // -------------------------------------------------------------------------
    // N/A

    // -------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------
    const aws_access_key_id_form_field = (
        <FormGroup>
            <Label style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                AWS Access Key ID
            </Label>
            <br />
            <Input
                type="text"
                onChange={event => handleAWSAccessKeyIDChange(event)}
                valid={
                    faust_submission_form_state.aws_access_key_id !== null &&
                    faust_submission_form_state.aws_access_key_id !== '' &&
                    faust_submission_form_state.errors.aws_access_key_id
                        .length === 0
                }
                invalid={
                    faust_submission_form_state.errors.aws_access_key_id
                        .length > 0
                }
                value={
                    faust_submission_form_state.aws_access_key_id !== null
                        ? faust_submission_form_state.aws_access_key_id
                        : ''
                }
            />
            <FormFeedback
                valid={
                    faust_submission_form_state.errors.aws_access_key_id
                        .length === 0
                }
            >
                {faust_submission_form_state.errors.aws_access_key_id.map(
                    (error: string) => {
                        return error;
                    }
                )}
            </FormFeedback>
        </FormGroup>
    );
    const aws_secret_access_key_form_field = (
        <FormGroup>
            <Label style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                AWS Secret Access Key
            </Label>
            <br />
            <Input
                type="text"
                onChange={event => handleAWSSecretAccessKeyChange(event)}
                valid={
                    faust_submission_form_state.aws_secret_access_key !==
                        null &&
                    faust_submission_form_state.aws_secret_access_key !== '' &&
                    faust_submission_form_state.errors.aws_secret_access_key
                        .length === 0
                }
                invalid={
                    faust_submission_form_state.errors.aws_secret_access_key
                        .length > 0
                }
                value={
                    faust_submission_form_state.aws_secret_access_key !== null
                        ? faust_submission_form_state.aws_secret_access_key
                        : ''
                }
            />
            <FormFeedback
                valid={
                    faust_submission_form_state.errors.aws_secret_access_key
                        .length === 0
                }
            >
                {faust_submission_form_state.errors.aws_secret_access_key.map(
                    (error: string) => {
                        return error;
                    }
                )}
            </FormFeedback>
        </FormGroup>
    );
    const aws_s3_bucket_name_form_fields = (
        <FormGroup>
            <Label style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                AWS S3 Bucket Name
            </Label>
            <br />
            <Input
                type="text"
                onChange={event => handleAWSS3BucketNameChange(event)}
                valid={
                    faust_submission_form_state.aws_s3_bucket_name !== null &&
                    faust_submission_form_state.aws_s3_bucket_name !== '' &&
                    faust_submission_form_state.errors.aws_s3_bucket_name
                        .length === 0
                }
                invalid={
                    faust_submission_form_state.errors.aws_s3_bucket_name
                        .length > 0
                }
                value={
                    faust_submission_form_state.aws_s3_bucket_name !== null
                        ? faust_submission_form_state.aws_s3_bucket_name
                        : ''
                }
            />
            <FormFeedback
                valid={
                    faust_submission_form_state.errors.aws_s3_bucket_name
                        .length === 0
                }
            >
                {faust_submission_form_state.errors.aws_s3_bucket_name.map(
                    (error: string) => {
                        return error;
                    }
                )}
            </FormFeedback>
        </FormGroup>
    );
    const aws_batch_job_queue_form_fields = (
        <FormGroup>
            <Label style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                AWS Batch Job Queue Name
            </Label>
            <br />
            <Input
                type="text"
                onChange={event => handleAWSBatchJobQueueNameChange(event)}
                valid={
                    faust_submission_form_state.aws_batch_job_queue_name !==
                        null &&
                    faust_submission_form_state.aws_batch_job_queue_name !==
                        '' &&
                    faust_submission_form_state.errors.aws_batch_job_queue_name
                        .length === 0
                }
                invalid={
                    faust_submission_form_state.errors.aws_batch_job_queue_name
                        .length > 0
                }
                value={
                    faust_submission_form_state.aws_batch_job_queue_name !==
                    null
                        ? faust_submission_form_state.aws_batch_job_queue_name
                        : ''
                }
            />
            <FormFeedback
                valid={
                    faust_submission_form_state.errors.aws_batch_job_queue_name
                        .length === 0
                }
            >
                {faust_submission_form_state.errors.aws_batch_job_queue_name.map(
                    (error: string) => {
                        return error;
                    }
                )}
            </FormFeedback>
        </FormGroup>
    );

    const aws_form_fields = (
        <div>
            <h2>AWS Credentials</h2>
            Please enter your amazon credentials
            <br />
            <br />
            {aws_access_key_id_form_field}
            {aws_secret_access_key_form_field}
            {aws_s3_bucket_name_form_fields}
            {aws_batch_job_queue_form_fields}
        </div>
    );
    const input_gating_set_form_field = (
        <FormGroup>
            <br />
            <Label>
                <h2>Input Gating Set Directory</h2>
            </Label>
            <br />
            Please see the{' '}
            <a
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    shell.openExternal(
                        'https://github.com/FredHutch/FAUST_Nextflow'
                    );
                }}
            >
                FAUST Nextflow documentation
            </a>{' '}
            for how to prepare this
            <br />
            <br />
            Please select the directory that contains a{' '}
            <a
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    shell.openExternal(
                        'https://github.com/RGLab/flowWorkspace'
                    );
                }}
            >
                Flow Workspace saved Gating Set
            </a>
            <Input
                directory=""
                webkitdirectory=""
                type="file"
                onChange={event =>
                    handleInputGatingSetDirectoryPathChange(event)
                }
                valid={
                    faust_submission_form_state.gating_set_directory_path !==
                        '' &&
                    faust_submission_form_state.errors.gating_set_directory_path
                        .length === 0
                }
                invalid={
                    faust_submission_form_state.errors.gating_set_directory_path
                        .length > 0
                }
            />
            <FormFeedback
                valid={
                    faust_submission_form_state.errors.gating_set_directory_path
                        .length === 0
                }
            >
                {faust_submission_form_state.errors.gating_set_directory_path.map(
                    (error: string) => {
                        return error;
                    }
                )}
            </FormFeedback>
        </FormGroup>
    );
    const active_channels_form_field = (
        <FormGroup>
            <Label>
                <h2>Active Channels File</h2>
            </Label>
            <br />
            Please see the{' '}
            <a
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    shell.openExternal(
                        'https://github.com/FredHutch/FAUST_Nextflow'
                    );
                }}
            >
                FAUST Nextflow documentation
            </a>{' '}
            for how to prepare this
            <br />
            <br />
            Please select the file that specifies what channels to be used
            during the `FAUST` analysis
            <Input
                type="file"
                onChange={event => handleInputActiveChannelsFileChange(event)}
                valid={undefined}
                invalid={undefined}
            />
            <FormFeedback valid={false}>ERRORS GO HERE</FormFeedback>
        </FormGroup>
    );
    const channel_bounds_form_fiels = (
        <FormGroup>
            <Label>
                <h2>Channels Bounds File</h2>
            </Label>
            <br />
            Please see the{' '}
            <a
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    shell.openExternal(
                        'https://github.com/FredHutch/FAUST_Nextflow'
                    );
                }}
            >
                FAUST Nextflow documentation
            </a>{' '}
            for how to prepare this
            <br />
            <br />
            Please select the file that specifies the acceptable boundaries for
            the active channels above.
            <Input
                type="file"
                onChange={event => handleInputChannelBoundsFileChange(event)}
                valid={undefined}
                invalid={undefined}
            />
            <FormFeedback valid={false}>ERRORS GO HERE</FormFeedback>
        </FormGroup>
    );
    const supervised_list_form_field = (
        <FormGroup>
            <Label>
                <h2>Supervised List File</h2>
            </Label>
            <br />
            Please see the{' '}
            <a
                onClick={(event: React.MouseEvent) => {
                    event.preventDefault();
                    shell.openExternal(
                        'https://github.com/FredHutch/FAUST_Nextflow'
                    );
                }}
            >
                FAUST Nextflow documentation
            </a>{' '}
            for how to prepare this
            <br />
            <br />
            Please select the file that specifies manual overrides for the
            `FAUST` analysis
            <Input
                type="file"
                onChange={event => handleInputSupervisedListFileChange(event)}
                valid={undefined}
                invalid={undefined}
            />
            <FormFeedback valid={false}>ERRORS GO HERE</FormFeedback>
        </FormGroup>
    );
    const faust_command_form_field = (
        <FormGroup style={{ display: 'flex', flexDirection: 'column' }}>
            <Label>
                <h2>FAUST Command</h2>
            </Label>
            <ButtonDropdown isOpen={is_drop_down_open} toggle={toggle}>
                <DropdownToggle caret color="primary">
                    {faust_submission_form_state.command}
                </DropdownToggle>
                <DropdownMenu style={{ width: '100%' }}>
                    <DropdownItem
                        onClick={() => {
                            faustSubmissionFormDispatch({
                                payload: {
                                    command: FAUSTCommand.generate_annotations
                                },
                                type:
                                    FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
                            });
                        }}
                        style={{ textAlign: 'center' }}
                    >
                        {FAUSTCommand.generate_annotations}
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => {
                            faustSubmissionFormDispatch({
                                payload: {
                                    command: FAUSTCommand.discover_phenotypes
                                },
                                type:
                                    FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
                            });
                        }}
                        style={{ textAlign: 'center' }}
                    >
                        {FAUSTCommand.discover_phenotypes}
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </FormGroup>
    );
    const local_form_element = (
        <div>
            {input_gating_set_form_field}
            <br />
            {active_channels_form_field}
            <br />
            {channel_bounds_form_fiels}
            <br />
            {supervised_list_form_field}
            <br />
            {faust_command_form_field}
            <br />
        </div>
    );
    const aws_form_element = (
        <div>
            {aws_form_fields}
            <br />
            {input_gating_set_form_field}
            <br />
            {active_channels_form_field}
            <br />
            {channel_bounds_form_fiels}
            <br />
            {supervised_list_form_field}
            <br />
            {faust_command_form_field}
            <br />
        </div>
    );
    const generateFormElement = (form_type: FAUSTNextflowProfile) => {
        switch (form_type) {
            case FAUSTNextflowProfile.AWS:
                return aws_form_element;
            case FAUSTNextflowProfile.LOCAL:
                return local_form_element;
            default:
                console.error('Unexpected form element returned!');
        }
    };
    const form_element = generateFormElement;
    const submission_form = (
        <form>
            <ProfileSelectorForm />
            {generateFormElement(faust_submission_form_state.profile)}
            {/* -------------------------------------------------------------------------------- */}
            {/* Template Example */}
            {/* -------------------------------------------------------------------------------- */}
            <div>
                <h2>Nextflow Run Command</h2>
                <Card style={{ backgroundColor: 'rgba(192,192,192,1)' }}>
                    <CardBody>{example_nextflow_run_command_elements}</CardBody>
                </Card>
            </div>
            <br />
            {/* -------------------------------------------------------------------------------- */}
            {/* Submit Button */}
            {/* -------------------------------------------------------------------------------- */}
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                {/* This has to be done this way with extra padding because React and Reactstrap tooltips are stupid */}
                {/* https://lecstor.com/react-disabled-button-onmouseleave/ */}
                <div
                    onMouseEnter={event => {
                        event.preventDefault();
                        if (is_everything_ready_to_run_faust) {
                            setShowSubmitButtonTooltip(false);
                        } else {
                            setShowSubmitButtonTooltip(true);
                        }
                    }}
                    onMouseLeave={event => {
                        event.preventDefault();
                        // console.log("leaving");
                        setShowSubmitButtonTooltip(false);
                    }}
                    style={{ padding: '5px 5px 5px 5px' }}
                >
                    <Button
                        color="primary"
                        disabled={!is_everything_ready_to_run_faust}
                        id={'faust-submit-button'}
                        onClick={event => handleSubmit(event)}
                    >
                        Submit Job
                    </Button>
                    <Tooltip
                        isOpen={show_submit_button_tooltip}
                        target={'faust-submit-button'}
                        onMouseEnter={event => {
                            event.preventDefault();
                        }}
                        onMouseLeave={event => {
                            event.preventDefault();
                        }}
                    >
                        The submission form needs to be completed in order to
                        run FAUST
                    </Tooltip>
                </div>
            </div>

            <br />
            <Alert color="danger" isOpen={false}>
                Server response section
            </Alert>
        </form>
    );

    return submission_form;
};
