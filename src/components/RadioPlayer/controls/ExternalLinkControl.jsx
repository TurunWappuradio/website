import React from 'react';

import { FiExternalLink } from 'react-icons/fi';

const ExternalLinkControl = () => (
  <a
    className="RadioPlayerControl"
    title="Kuuntele omassa soittimessa"
    href="https://player.turunwappuradio.com/wappuradio.mp3"
    target="_blank">
    <FiExternalLink size="1.5em" />
  </a>
);

export default ExternalLinkControl;