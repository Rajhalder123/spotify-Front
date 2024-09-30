//rfce//

import React from 'react';
import './SidebarOption.css';

function SlidebarOption({ title, Icon }) {
  return (
    <div className='slidebarOption'>
      {Icon && <Icon className='SlidebarOption_icon' />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SlidebarOption;
