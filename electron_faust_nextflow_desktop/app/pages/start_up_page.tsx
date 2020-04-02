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
// import { ComponentsStatusDisplay } from '../components/components_status_display';
// import { FAUSTExecutionTimeTable } from '../components/faust_execution_time_table';
// import {
//     FAUSTExecutorDispatchContext,
//     FAUSTExecutorStateContext,
//     FAUSTExecutorStatus,
//     FAUSTExecutorReducerActionType,
//     generateNextflowRunOptions
// } from '../components/faust_executor';
import { RManagerStateContext, RManagerStatus } from '../components/r_manager';
import {
    ShinyManagerDispatchContext,
    ShinyManagerReducerActionType,
    ShinyManagerStateContext,
    ShinyManagerStatus
} from '../components/shiny_manager';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// import { getErrorPagePath, getResultsPagePath } from '../constants/app_paths';
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
    const shiny_manager_state = React.useContext(ShinyManagerStateContext);
    const shinyManagerDispatch: any = React.useContext(ShinyManagerDispatchContext);
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
    // --------------------
    // Launch Shiny
    // --------------------
    React.useEffect(() => {
        // if (
        //     faust_executor_state.status === FAUSTExecutorStatus.EXECUTION_FAILED
        // ) {
        //     history.push(getErrorPagePath());
        // }
        if (
            r_manager_state.status === RManagerStatus.READY &&
            shiny_manager_state.status === ShinyManagerStatus.READY
        ) {
            shinyManagerDispatch({
                payload: {},
                type: ShinyManagerReducerActionType.LAUNCH_SHINY
            });
        }
    }, [r_manager_state.status, shiny_manager_state.status]);

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
                    <center>
                        <h1>Loading Required Dependencies - One Moment</h1>
                    </center>
                    <br />R - {r_manager_state.status}
                    <br />
                    Application Components - {shiny_manager_state.status}
                    <br />
                    <Spinner color="info" style={{ height: '200px', width: '200px' }} />
                </Col>
            </Row>
        </Container>
    );

    return loading_page_element;
};
