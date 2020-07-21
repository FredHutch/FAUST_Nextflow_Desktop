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
import { getShinyPagePath } from '../constants/app_paths';
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
    const [local_state, setLocalState] = React.useState({
        was_redirect_triggered: false
    });
    // -----------
    // Hooks
    // -----------
    // const url = 'http://127.0.0.1:3987';
    const history = useHistory();
    // if (!local_state.was_redirect_triggered) {
    //     // history.push(url);
    //     // window.location.href = url; // Broken for some reason
    //     // window.location.href = url; // Broken for some reason
    //     history.push(getStartUpPagePath());
    //     setLocalState({ ...local_state, was_redirect_triggered: true });
    // }
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

    // --------------------
    // Redirect to It When It's Ready
    // --------------------
    React.useEffect(() => {
        if (
            r_manager_state.status === RManagerStatus.READY &&
            shiny_manager_state.status === ShinyManagerStatus.EXECUTION_RUNNING &&
            local_state.was_redirect_triggered === false
        ) {
            console.log('REDIRECTING to ' + getShinyPagePath());
            setTimeout(() => {
                history.push(getShinyPagePath());
            }, 15000);

            setLocalState({ ...local_state, was_redirect_triggered: true });
            // -------------------------
            // const shiny_app_url = `http://${shiny_manager_state.shiny_host}:${shiny_manager_state.shiny_port}`;
            // console.log('REDIRECTING to ' + shiny_app_url);
            // setTimeout(() => {
            //     history.push(shiny_app_url);
            //     // window.location.href = shiny_app_url;
            // }, 5000);
            // setLocalState({ ...local_state, was_redirect_triggered: true });
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
