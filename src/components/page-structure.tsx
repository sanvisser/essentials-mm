import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
function PageStructure(props: Props) {
  return <div className="text-white">{props.children}</div>;
}

export default PageStructure;
