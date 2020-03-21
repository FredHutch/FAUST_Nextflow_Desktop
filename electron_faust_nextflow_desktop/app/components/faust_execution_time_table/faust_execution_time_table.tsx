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
import { Table } from 'reactstrap';
// -----------------------------------------------------------------------------
// Custom Components
// -----------------------------------------------------------------------------
// N/A
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

interface IProps {}
export const FAUSTExecutionTimeTable = (props: IProps) => {
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
    // N/A
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
    const faust_execution_time_table_element = (
        <Table>
            <thead>
                <tr>
                    <th>Data Set Size</th>
                    <th>Sample Size</th>
                    <th>Active Channels</th>
                    <th>Duration (hh:mm)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1MB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">10MB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">100MB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">200MB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">500MB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">1GB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">5GB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">10GB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">20GB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">50GB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">100GB</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
                <tr>
                    <th scope="row">100GB+</th>
                    <td>TODO</td>
                    <td>TODO</td>
                    <td>TODO</td>
                </tr>
            </tbody>
        </Table>
    );

    return faust_execution_time_table_element;
};
