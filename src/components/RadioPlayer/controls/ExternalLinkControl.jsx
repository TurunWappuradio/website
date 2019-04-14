import React from 'react';

import OpenInBrowserIcon from '../../../assets/icons/baseline-open_in_browser.svg';

const ICON_SIZE = '34px';

export default ({ onClick }) => (
  <button
    className="RadioPlayerControl"
    title="Kuuntele omassa soittimessa"
    onClick={onClick}>
    <OpenInBrowserIcon
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox={[0, 0, 24, 24]}
    />
  </button>
);
