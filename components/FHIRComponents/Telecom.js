import React from 'react';
import { withStyles, withTheme } from '@material-ui/core';
import { compose } from 'recompose';
import {
  min, compact, sortBy, has, get,
} from 'lodash';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import Typography from '@material-ui/core/Typography';
import ContactPoint from './ContactPoint';
import { DataRow } from '../shared';

const styles = theme => ({
  heading: {
    '& h4': {
      color: get(theme, 'palette.primary.light'),
      fontFamily: get(theme, 'typography.body2.fontFamily'),
    },
  },
});

class Telecom extends React.PureComponent {
  render() {
    const { classes, telecom } = this.props;
    const phones = telecom.filter(contactPoint => contactPoint.system === 'phone');
    const fax = telecom.filter(contactPoint => contactPoint.system === 'fax');
    const emails = telecom.filter(contactPoint => contactPoint.system === 'email');
    const telecomByRank = sortBy([phones, fax, emails], contactPoints => {
      const ranks = compact(contactPoints.map(contactPoint => contactPoint.rank));
      return min(ranks);
    });

    return (
      <div className={classes.Contact}>
        {
          telecomByRank.map(contactPoints => {
            const label = has(contactPoints, '[0].system') ? contactPoints[0].system : undefined;
            return (
              !!contactPoints.length
              && (
                <div key={`telecom_${uuidv4()}`}>
                  {
                    (
                      <DataRow
                        label={(
                          <div className={classes.heading} key={`telecom_label_${uuidv4()}`}>
                            <Typography variant="h4">
                              {label}
                            </Typography>
                          </div>
                        )}
                      />
                    )
                  }
                  {
                    contactPoints
                    && contactPoints.map(contactPoint => (
                      <ContactPoint
                        key={`contact_point_${uuidv4()}`}
                        contactPoint={contactPoint}
                      />
                    ))
                  }
                </div>
              )
            );
          })
        }
      </div>
    );
  }
}

Telecom.propTypes = {
  telecom: PropTypes.array,
  classes: PropTypes.object,
};

export default compose(
  withTheme(),
  withStyles(styles),
)(Telecom);
