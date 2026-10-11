import React from "react";
import BlogPostPaginator from "@theme-original/BlogPostPaginator";
import GiscusComments from "@site/src/components/GiscusComments";

export default function BlogPostPaginatorWrapper(props) {
  return (
    <>
      <BlogPostPaginator {...props} />
      <GiscusComments />
    </>
  );
}
