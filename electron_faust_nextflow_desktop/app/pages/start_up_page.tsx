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
import { useHistory } from 'react-router-dom';
import { Col, Container, Row, Spinner, Table } from 'reactstrap';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
import { ComponentsStatusDisplay } from '../components/components_status_display';
import { FAUSTExecutionTimeTable } from '../components/faust_execution_time_table';
import {
    FAUSTExecutorDispatchContext,
    FAUSTExecutorStateContext,
    FAUSTExecutorStatus,
    FAUSTExecutorReducerActionType,
    generateNextflowRunOptions
} from '../components/faust_executor';
import { RManagerStateContext } from '../components/r_manager';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
import { getErrorPagePath, getResultsPagePath } from '../constants/app_paths';
import faust_logo_large from '../../resources/faust_icon/6000x3600.png';

interface IProps {}
export const StartUpPage = (props: IProps) => {
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
    // Hooks
    // -----------
    // const history = useHistory();
    // -----------
    // Context
    // -----------
    const r_manager_state = React.useContext(RManagerStateContext);
    // ---
    // const faust_executor_state = React.useContext(FAUSTExecutorStateContext);
    // -----------
    // Helpers
    // -----------
    // N/A

    // -------------------------------------------------------------------------
    // Logic
    // -------------------------------------------------------------------------
    // N/A

    // -------------------------------------------------------------------------
    // Life Cycle Events
    // -------------------------------------------------------------------------
    // ------------------------------
    // FAUST Execution Success
    // ------------------------------
    // React.useEffect(() => {
    //     if (
    //         faust_executor_state.status ===
    //         FAUSTExecutorStatus.EXECUTION_SUCCEEDED
    //     ) {
    //         history.push(getResultsPagePath());
    //     }
    // }, [faust_executor_state.status]);
    // ------------------------------
    // FAUST Execution Failure
    // ------------------------------
    // React.useEffect(() => {
    //     if (
    //         faust_executor_state.status === FAUSTExecutorStatus.EXECUTION_FAILED
    //     ) {
    //         history.push(getErrorPagePath());
    //     }
    // }, [faust_executor_state.status]);

    // -------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------
    const loading_page_element = (
        <Container fluid={true}>
            <Row>
                <Col
                    xs={{ size: 6, offset: 3 }}
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <img height={300} src={faust_logo_large} width={600} />
                </Col>
            </Row>
            <Row>
                <Col
                    xs={{ offset: 0, size: 12 }}
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <h1>Loading Required Dependencies - One Moment</h1>
                    <br />R - {r_manager_state.status}
                    <br />R Dependencies - {'Not Started'}
                    <br />
                    Nextflow - {'Not Started'}
                    <br />
                    <Spinner
                        color="info"
                        style={{ height: '200px', width: '200px' }}
                    />
                </Col>
            </Row>
        </Container>
    );

    return loading_page_element;
};
