import type { ComponentType } from 'react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FolderIcon from '@material-ui/icons/Folder';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as actions from '../../state/dialog-add-workspace/actions';
import { getWorkspaces } from '../../senders';
const CreateContainer: ComponentType<{}> = styled(Paper)`
  margin-top: 5px;
`;
const LocationPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const LocationPickerInput = styled(TextField)``;
const LocationPickerButton = styled(Button)`
  white-space: nowrap;
  width: fit-content;
`;
const SoftLinkToMainWikiSelect = styled(Select)`
  width: 100%;
`;
const SoftLinkToMainWikiSelectInputLabel = styled(InputLabel)`
  margin-top: 5px;
`;
interface OwnProps {
  wikiCreationMessage: string;
  // @ts-expect-error ts-migrate(7051) FIXME: Parameter has a name but no type. Did you mean 'ar... Remove this comment to see the full error message
  existedFolderLocationSetter: (string) => void;
  wikiFolderName: string;
  // @ts-expect-error ts-migrate(7051) FIXME: Parameter has a name but no type. Did you mean 'ar... Remove this comment to see the full error message
  wikiFolderNameSetter: (string) => void;
  tagName: string;
  // @ts-expect-error ts-migrate(7051) FIXME: Parameter has a name but no type. Did you mean 'ar... Remove this comment to see the full error message
  tagNameSetter: (string) => void;
  mainWikiToLink: Object;
  // @ts-expect-error ts-migrate(7051) FIXME: Parameter has a name but no type. Did you mean 'ar... Remove this comment to see the full error message
  mainWikiToLinkSetter: (Object) => void;
  existedFolderLocation: string;
  wikiPort: number;
  // @ts-expect-error ts-migrate(7051) FIXME: Parameter has a name but no type. Did you mean 'ar... Remove this comment to see the full error message
  wikiPortSetter: (number) => void;
  fileSystemPaths: Array<{
    tagName: string;
    folderName: string;
  }>;
  isCreateMainWorkspace: boolean;
}
interface DispatchProps {
  // @ts-expect-error ts-migrate(7051) FIXME: Parameter has a name but no type. Did you mean 'ar... Remove this comment to see the full error message
  setWikiCreationMessage: (string) => void;
}
interface StateProps {
  wikiCreationMessage: string;
}
type Props = OwnProps & DispatchProps & StateProps;
function WikiPathForm({
  setWikiCreationMessage,
  wikiCreationMessage = '',
  existedFolderLocation,
  existedFolderLocationSetter,
  tagName,
  tagNameSetter,
  wikiFolderName,
  wikiFolderNameSetter,
  mainWikiToLink,
  mainWikiToLinkSetter,
  wikiPort,
  wikiPortSetter,
  fileSystemPaths,
  isCreateMainWorkspace,
}: Props) {
  const [workspaces, workspacesSetter] = useState({});
  useEffect(() => {
    workspacesSetter(getWorkspaces());
  }, []);
  const hasError = wikiCreationMessage.startsWith('Error');
  const { t } = useTranslation();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <CreateContainer elevation={2} square>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <LocationPickerContainer>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <LocationPickerInput
          error={hasError}
          helperText={hasError ? wikiCreationMessage : ''}
          fullWidth
          onChange={(event) => {
            existedFolderLocationSetter(event.target.value);
            setWikiCreationMessage('');
          }}
          label={t('AddWorkspace.WorkspaceFolder')}
          value={existedFolderLocation}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <LocationPickerButton
          onClick={() => {
            const { dialog } = window.remote;
            // eslint-disable-next-line promise/catch-or-return
            dialog
              .showOpenDialog({
                properties: ['openDirectory'],
              })
              .then(({ canceled, filePaths }: any) => {
                // eslint-disable-next-line promise/always-return
                if (!canceled && filePaths.length > 0) {
                  existedFolderLocationSetter(filePaths[0]);
                }
              });
          }}
          variant="outlined"
          color={existedFolderLocation ? 'default' : 'primary'}
          disableElevation
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          endIcon={<FolderIcon />}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="button" display="inline">
            {t('AddWorkspace.Choose')}
          </Typography>
        </LocationPickerButton>
      </LocationPickerContainer>
      {isCreateMainWorkspace && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <LocationPickerInput
          fullWidth
          onChange={(event) => {
            wikiPortSetter(event.target.value);
          }}
          label={t('AddWorkspace.WikiServerPort')}
          value={wikiPort}
        />
      )}
      {!isCreateMainWorkspace && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SoftLinkToMainWikiSelectInputLabel id="main-wiki-select-label">{t('AddWorkspace.MainWorkspaceLocation')}</SoftLinkToMainWikiSelectInputLabel>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SoftLinkToMainWikiSelect
            labelId="main-wiki-select-label"
            id="main-wiki-select"
            value={mainWikiToLink}
            onChange={(event) => mainWikiToLinkSetter(event.target.value)}>
            {Object.keys(workspaces).map((workspaceID) => (
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <MenuItem key={workspaceID} value={workspaces[workspaceID]}>
                {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                {workspaces[workspaceID].name}
              </MenuItem>
            ))}
          </SoftLinkToMainWikiSelect>
          {(mainWikiToLink as any).name && (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <FormHelperText>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Typography variant="body1" display="inline" component="span">
                {t('AddWorkspace.SubWorkspaceWillLinkTo')}
              </Typography>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Typography variant="body2" component="span" noWrap display="inline" align="center" style={{ direction: 'rtl', textTransform: 'none' }}>
                {(mainWikiToLink as any).name}/tiddlers/{wikiFolderName}
              </Typography>
            </FormHelperText>
          )}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Autocomplete
            freeSolo
            options={fileSystemPaths.map((fileSystemPath) => fileSystemPath.tagName)}
            value={tagName}
            onInputChange={(_, value) => tagNameSetter(value)}
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            renderInput={(parameters) => <TextField {...parameters} fullWidth label={t('AddWorkspace.TagName')} helperText={t('AddWorkspace.TagNameHelp')} />}
          />
        </>
      )}
    </CreateContainer>
  );
}
const mapStateToProps = (state: any) => ({
  wikiCreationMessage: state.dialogAddWorkspace.wikiCreationMessage,
});
// @ts-expect-error ts-migrate(2558) FIXME: Expected 5 type arguments, but got 6.
export default connect<Props, OwnProps, _, _, _, _>(mapStateToProps, (dispatch) => bindActionCreators(actions, dispatch))(WikiPathForm);
