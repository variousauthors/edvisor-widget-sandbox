import * as React from 'react';

export default function ModalComponents ({ children, mode }) {

  return (
    <div>
      { children[mode] }
    </div>
  );
}

