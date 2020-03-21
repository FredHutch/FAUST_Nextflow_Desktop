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
import {
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Label
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
// ../../
import { FAUSTNextflowProfile } from '../../constants/constants';
// -----------------------------------------------------------------------------
// Resources
// -----------------------------------------------------------------------------
// N/A

interface IProps {
    debug?: boolean;
}
export const ProfileSelectorForm = (props: IProps) => {
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
    const [is_drop_down_open, setDropDownOpen] = React.useState(false);
    const toggle = () => setDropDownOpen(!is_drop_down_open);
    // -----------
    // Hooks
    // -----------
    // N/A
    // -----------
    // Context
    // -----------
    const faust_submission_form_state = React.useContext(
        FAUSTSubmissionFormStateContext
    );
    const faustSubmissionFormDispatch: any = React.useContext(
        FAUSTSubmissionFormDispatchContext
    );
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
    const profile_selector_element = (
        <FormGroup>
            <Label>
                <h2>Profile Selection</h2>
            </Label>
            <br />
            Please select the context that you'd like to execute Nextflow FAUST
            as
            <br />
            <br />
            <ButtonDropdown isOpen={is_drop_down_open} toggle={toggle}>
                <DropdownToggle caret color="primary">
                    {faust_submission_form_state.profile}
                </DropdownToggle>
                <DropdownMenu style={{ width: '100%' }}>
                    <DropdownItem
                        onClick={() => {
                            faustSubmissionFormDispatch({
                                payload: {
                                    profile: FAUSTNextflowProfile.LOCAL
                                },
                                type:
                                    FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
                            });
                        }}
                        style={{ textAlign: 'center' }}
                    >
                        {FAUSTNextflowProfile.LOCAL}
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => {
                            faustSubmissionFormDispatch({
                                payload: { profile: FAUSTNextflowProfile.AWS },
                                type:
                                    FAUSTSubmissionFormReducerActionType.SET_FORM_DATA
                            });
                        }}
                        style={{ textAlign: 'center' }}
                    >
                        {FAUSTNextflowProfile.AWS}
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </FormGroup>
    );

    return profile_selector_element;
};
