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
// N/A
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
// N/A
import { FAUSTSubmissionFormState } from '../components/faust_submission_form';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

export interface IExecutionCommand {
    command: string | null;
    error: string | null;
    standard_output: string | null;
    error_output: string | null;
}

export enum FAUSTNextflowProfile {
    AWS = 'aws',
    LOCAL = 'local'
}
export enum FAUSTCommand {
    generate_annotations = 'generate_annotations',
    discover_phenotypes = 'discover_phenotypes'
}

export interface INextflowUserRunOptions {
    // Required
    command: string;
    gating_set_directory_path: string;
    // Optional?
    active_channels_file_path: string;
    channel_bounds_file_path: string;
    supervised_list_file_path: string;
    // Definitely Optional
    imputation_heirarchy?: string;
    experimental_unit?: string;
    starting_cell_population?: string;
    depth_score_threshold?: number;
    selection_quantile?: number;
    plotting_device?: string;
    name_occurrence_number?: number;
    // FAUST - Optional Execution Management Parameters
    project_path?: string;
    debug_flag?: string;
    thread_number?: number;
    seed_value?: number;
}
export interface INextflowLocalUserRunOptions extends INextflowUserRunOptions {
    // TODO
}
export interface INextflowAWSUserRunOptions extends INextflowUserRunOptions {
    aws_batch_job_queue_name: string;
    aws_s3_bucket_name: string;
}
export type NextflowUserRunOptions = INextflowLocalUserRunOptions | INextflowAWSUserRunOptions;
export const default_faust_nextflow_github_url = 'https://github.com/FredHutch/FAUST_Nextflow/';
export const default_faust_nextflow_github_tag = 'development';
export const default_faust_nextflow_profile = 'aws';

export const generateNextflowRunOptions = (
    faust_submission_form_state: FAUSTSubmissionFormState
): NextflowUserRunOptions => {
    // Required
    let nextflow_run_options: NextflowUserRunOptions = {
        command: faust_submission_form_state.command,
        gating_set_directory_path:
            faust_submission_form_state.gating_set_directory_path !== null
                ? faust_submission_form_state.gating_set_directory_path
                : 'This parameter has not been set by the user',
        active_channels_file_path:
            faust_submission_form_state.active_channels_file_path !== null
                ? faust_submission_form_state.active_channels_file_path
                : 'This parameter has not been set by the user',
        channel_bounds_file_path:
            faust_submission_form_state.channel_bounds_file_path !== null
                ? faust_submission_form_state.channel_bounds_file_path
                : 'This parameter has not been set by the user',
        supervised_list_file_path:
            faust_submission_form_state.supervised_list_file_path !== null
                ? faust_submission_form_state.supervised_list_file_path
                : 'This parameter has not been set by the user'
        // AWS Options
    };
    if (faust_submission_form_state.aws_batch_job_queue_name !== null) {
        nextflow_run_options.aws_batch_job_queue_name = faust_submission_form_state.aws_batch_job_queue_name;
    }
    if (faust_submission_form_state.aws_s3_bucket_name !== null) {
        nextflow_run_options.aws_s3_bucket_name = faust_submission_form_state.aws_s3_bucket_name;
    }
    // Optional

    return nextflow_run_options;
};
export const generateNextflowRunCommand = (
    nextflow_executable_file_path: string,
    run_options: NextflowUserRunOptions,
    faust_nextflow_github_url: string = default_faust_nextflow_github_url,
    faust_nextflow_github_tag: string = default_faust_nextflow_github_tag,
    faust_nextflow_profile: string = default_faust_nextflow_profile
): string => {
    // Example syntax
    // ./nextflow run https://github.com/FredHutch/FAUST_Nextflow -revision development -profile local \
    //                                                  --active_channels_path ~/Desktop/FAUST/performance_tests/helper_files/activeChannels.rds \
    //                                                  --channel_bounds_path ~/Desktop/FAUST/performance_tests/helper_files/channelBounds.rds \
    //                                                  --supervised_list_path ~/Desktop/FAUST/performance_tests/helper_files/supervisedList.rds \
    //                                                  --input_gating_set_directory ~/Desktop/FAUST/performance_tests/gating_sets/gs_size_001MB \
    //                                                  --command generate_annotations
    let run_command = '';
    // Required Execution
    run_command += `\"${nextflow_executable_file_path}\" run ${faust_nextflow_github_url}`;
    run_command += `\\ -revision ${faust_nextflow_github_tag}`;
    run_command += `\\ -profile ${faust_nextflow_profile}`;
    // Required User
    run_command += `\\ --command ${run_options.command}`;
    run_command += `\\ --input_gating_set_directory \"${run_options.gating_set_directory_path}\"`;
    // -------------------------------------------------------------------------
    // Required
    // -------------------------------------------------------------------------
    if (run_options.active_channels_file_path !== undefined && run_options.active_channels_file_path !== null) {
        run_command += `\\ --active_channels_path \"${run_options.active_channels_file_path}\"`;
    }
    if (run_options.channel_bounds_file_path !== undefined && run_options.channel_bounds_file_path !== null) {
        run_command += `\\ --channel_bounds_path \"${run_options.channel_bounds_file_path}\"`;
    }
    if (run_options.supervised_list_file_path !== undefined && run_options.supervised_list_file_path !== null) {
        run_command += `\\ --supervised_list_path \"${run_options.supervised_list_file_path}\"`;
    }

    // -------------------------------------------------------------------------
    // Optional
    // -------------------------------------------------------------------------
    // TODO

    // -------------------------------------------------------------------------
    // AWS Specific
    // -------------------------------------------------------------------------
    // console.log(run_options);
    const aws_run_options = run_options as INextflowAWSUserRunOptions;
    // console.log(aws_run_options);
    if (aws_run_options.aws_s3_bucket_name !== undefined && aws_run_options.aws_s3_bucket_name !== null) {
        run_command += `\\ -bucket-dir s3://${aws_run_options.aws_s3_bucket_name}`;
    }
    if (aws_run_options.aws_batch_job_queue_name !== undefined && aws_run_options.aws_batch_job_queue_name !== null) {
        run_command += `\\ -process.queue ${aws_run_options.aws_batch_job_queue_name}`;
    }

    // console.log(run_command);
    return run_command;
};
