// Class component. It will be storing a satate value of menu-items

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

const Directory = ({ sections }) => {
  return (
    <div className='directory-menu'>
      {/* Using 'rest' operator for destructured parameters */}
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem
          key={id}
          // spreading values
          {...otherSectionProps}
        />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
