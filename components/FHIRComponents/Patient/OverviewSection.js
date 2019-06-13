import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { DataRow } from '../../shared';
import Telecom from '../Telecom';
import Addresses from '../Address';

const styles = {
  OverviewContainer: {

  },
};

const OverviewSection = () => ({
  render() {
    const {
      classes, 
      telecom, 
      gender, 
      birthDate,
      deceasedBoolean,
      deceasedDateTime,
      address,
      martialStatus,
      multipleBirthBoolean,
      multipleBirthInteger,
      communication,
      managingOrganization,
      link,
    } = this.props;
    const { OverviewContainer } = classes;
    return (
      <>
        <div className={OverviewContainer}>
          { gender && (
            <DataRow
              label={(
                <Typography className={classes.header} variant="h4">
                  {'Gender'}
                </Typography>
              )}
              value={(
                <Typography className={classes.value} variant="h5">
                  {gender}
                </Typography>
              )}
            />
          ) }
          { telecom && <Telecom telecom={telecom} /> }
          { address && <Addresses addresses={address} />}
        </div>
      </>
    );
  },
});

OverviewSection.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(OverviewSection);
