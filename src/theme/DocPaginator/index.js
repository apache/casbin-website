import React from "react";
import DocPaginator from "@theme-original/DocPaginator";
import GiscusComments from "@site/src/components/GiscusComments";

export default function DocPaginatorWrapper(props) {
  return (
    <>
      <DocPaginator {...props} />
      <GiscusComments />
    </>
  );
}
