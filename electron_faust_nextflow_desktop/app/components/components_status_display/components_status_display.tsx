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
import { Card, Col, Row } from "reactstrap";
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
import { NextflowManagerStateContext } from "../nextflow_manager";
import { FAUSTExecutorStateContext } from "../faust_executor";

// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

interface IProps {}
export const ComponentsStatusDisplay = (props: IProps) => {
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
    // Context
    // -----------
    const nextflow_manager_state = React.useContext(NextflowManagerStateContext);
    const faust_executor_state = React.useContext(FAUSTExecutorStateContext);
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
    // N/A

    // -------------------------------------------------------------------------
    // Render
    // -------------------------------------------------------------------------
    const submission_form = (
        <Row>
            <Col xs={{ offset: 0, size: 12 }}>
                <Card>
                    <div>
                        Nextflow Executable File Path:{" "}
                        {nextflow_manager_state.nextflow_executable_file_path !== null
                            ? nextflow_manager_state.nextflow_executable_file_path
                            : "Nextflow NOT configured"}
                    </div>
                    <div>Nextflow Status: {nextflow_manager_state.status}</div>
                    <div>FAUST Status: {faust_executor_state.status}</div>
                </Card>
            </Col>
        </Row>
    );

    return submission_form;
};
