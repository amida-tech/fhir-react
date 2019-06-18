import React, { PureComponent } from 'react'
import { compose } from 'recompose';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { get } from 'lodash';
import classNames from 'classnames';
import moment from 'moment'

// TODO: Properly handle expand/collapse
// - I the note is small enough to fit on 3 lines of text, don't show Expand/Collapse button
// - When collapsed, show 3 lines of text ending in an ellipses (this is super hard to do)

const styles = theme => ({
  noteContainer: {
    padding: '1.5rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '3px',
    boxShadow: '2px 3px 10px 0px rgba(188, 204, 220)',
  },
  author: {
    ...get(theme, 'typography.h3'),
    marginBottom: '0.5rem'
  },
  time: {
    ...get(theme, 'typography.subtitle1'),
    color: get(theme, 'palette.primary.light'),
    marginBottom: '2rem'
  },
  body: {
    ...get(theme, 'typography.body1'),
    color: get(theme, 'palette.primary.dark'),
    marginBottom: '2.5rem',
  },
  summary: {
    maxHeight: '4.5rem',
    backgroundColor: 'green',
    overflow: 'hidden',
  },
  bodyCollapsed: {
    maxHeight: '4.5rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  button: {
    ...get(theme, 'typography.button2'),
    color: get(theme, 'palette.secondary.light'),
    position: 'absolute',
    // TODO: Why is this lined-up properly with 2rem rather than 1.5rem? (noteContainer padding is 1.5rem, so I would think this should be equal)
    right: '2rem',
  }
});

class Note extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true
    };
  }

  handleClick = () => this.setState({
    collapsed: !this.state.collapsed
  })

  render () {
    const { classes, note } = this.props
    const { author, time, text } = note
    const { collapsed } = this.state;

    const bodyClass = collapsed ? classNames([classes.body, classes.bodyCollapsed]) : classes.body

    return (
      <div className={classes.noteContainer}>
        <div className={classes.author}>{author.authorString}</div>
        <div className={classes.time}>{moment(time).format('MM-DD-YYYY')}</div>
        <div id='note_body' className={bodyClass}>{text}</div>
        <button className={classes.button} onClick={this.handleClick}>{collapsed ? 'Expand' : 'Collapse'}</button>
      </div>
    )
  }
}

export default compose(
  withTheme(),
  withStyles(styles),
)(Note);
