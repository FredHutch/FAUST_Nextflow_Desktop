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
// import { RManagerStateContext, RManagerStatus } from '../components/r_manager';
import { ShinyManagerStateContext, ShinyManagerStatus } from '../components/shiny_manager';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
import { getShinyPagePath, getStartUpPagePath } from '../constants/app_paths';
// import faust_logo_large from '../../resources/faust_icon/6000x3600.png';

interface IProps {}
export const ShinyAppPage = (props: IProps) => {
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
    // N/A
    // -----------
    // Context
    // -----------
    const shiny_manager_state = React.useContext(ShinyManagerStateContext);
    // -----------
    // Helpers
    // -----------
    const shiny_app_url = `http://${shiny_manager_state.shiny_host}:${shiny_manager_state.shiny_port}`;
    console.log('Using shiny app url: ' + shiny_app_url);

    // -------------------------------------------------------------------------
    // Logic
    // -------------------------------------------------------------------------
    // N/A

    // -------------------------------------------------------------------------
    // Life Cycle Events
    // -------------------------------------------------------------------------
    // N/A

    // -------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------
    const shiny_app_element = (
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
                    <iframe src={shiny_app_url} style={{ height: '100vh', width: '100vw' }}>
                        If you're seeing this, call my mom.
                    </iframe>
                </Col>
            </Row>
        </Container>
    );

    return shiny_app_element;
};
