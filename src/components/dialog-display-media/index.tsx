import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import connectComponent from '../../helpers/connect-component';

const styles = (theme: any) => ({
  root: {
    height: '100vh',
    width: '100vw',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight: 0,
  },

  text: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
});

interface DisplayMediaProps {
  classes: any;
}

type DisplayMediaState = any;

class DisplayMedia extends React.Component<DisplayMediaProps, DisplayMediaState> {
  constructor(props: DisplayMediaProps) {
    super(props);
    this.state = {
      sources: [],
    };
  }

  componentDidMount() {
    const { desktopCapturer } = window.remote;
    desktopCapturer.getSources({ types: ['window', 'screen'] }).then((sources: any) => {
      this.setState({ sources });
    });
  }

  render() {
    const { sources } = this.state;
    const { classes } = this.props;

    const screenSources = sources.filter((source: any) => source.id.startsWith('screen'));
    const windowSources = sources.filter((source: any) => source.id.startsWith('window'));
    // remove first item as it is the display media window itself
    windowSources.shift();

    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <div className={classes.root}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography variant="body2" className={classes.text}>
          The app wants to use the contents of your screen. Choose what you’d like to share.
        </Typography>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <List>
          {screenSources.map((source: any) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ListItem
              button
              onClick={() => {
                const { ipcRenderer } = window.remote;
                ipcRenderer.send('display-media-selected', source.id);
              }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ListItemText primary={source.name} />
            </ListItem>
          ))}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Divider />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ListSubheader disableSticky>Windows</ListSubheader>
          {windowSources.map((source: any) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ListItem
              button
              onClick={() => {
                const { ipcRenderer } = window.remote;
                ipcRenderer.send('display-media-selected', source.id);
              }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ListItemText primary={source.name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default connectComponent(DisplayMedia, null, null, styles);
