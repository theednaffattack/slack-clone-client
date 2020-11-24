import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export const AiOutlinePlusReplacement = (props: any) => {
  const {
    props: {
      attr: { pId, ...rest },
      children: [defs, ...paths]
    }
  } = AiOutlinePlus({});

  const SAFE_PATHS = paths.map(
    ({
      type,
      props: { pId: pathId, ...pathProps }
    }: {
      type: any;
      props: any;
    }) => {
      // The following two lines only exist to
      // get rid of no-unused-vars lint errors.
      const wasteObj = { pId, pathId };
      delete wasteObj.pId;
      React.createElement(type, pathProps);
    }
  );
  const SAFE_CHILDREN = React.Children.toArray([defs, ...SAFE_PATHS]);
  const SAFE_PROPS = { attr: rest, ...props };

  return React.cloneElement(AiOutlinePlus({}), SAFE_PROPS, SAFE_CHILDREN);
};
