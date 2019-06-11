import React from 'react';
import { has } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import InfoChip  from '../../shared';

const styles = {
  SectionContainer: {

  },
  GeneralPractitioner: {

  },
}

const GeneralPractitionerSection = () => ({
  render() {
    const {
      generalPractitioners,
    } = this.props;
    const { classes } = this.props;
    const { SectionContainer, GeneralPractitioner } = classes;

    const getGeneralPractitioner = gp => (
      has(gp, 'name')
        ? (
          <Typography className={GeneralPractitioner}>
            {gp.name}
          </Typography>
        )
        : (
          <Typography className={GeneralPractitioner}>
            {gp.id}
          </Typography>
        )
    );

    return (
      <>
        <div className={SectionContainer}>
          {generalPractitioners && generalPractitioners.map(gp => (
            <InfoChip>
              {getGeneralPractitioner(gp)}
            </InfoChip>
          ))}
        </div>
      </>
    );
  },
});

GeneralPractitionerSection.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GeneralPractitionerSection);
