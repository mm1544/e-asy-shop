import React from 'react';

/* 'withRouter' is a higher order component (it's a function). It takes a component as an argument and return a modified component.

'withRouter' will add to the 'MenuItem' component a 'location', 'match', and 'history' props
*/
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    // 'match.url' will give a current location (url) and by passing 'linkUrl', will navigate to the desired Route
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    {/*Not wrapping 'content' in this div, because we want to increase img when hoovering over but dwant other content to stay the same*/}
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);
