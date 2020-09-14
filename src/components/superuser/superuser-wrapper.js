import React, { useState, useEffect } from 'react';
import Superuser from './superuser';

export const SuperuserWrapper = (props) => {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    setCanRender(true);
    return () => {
      setCanRender(false);
    };
  }, []);

  return <>{canRender && <Superuser props />}</>;
};
