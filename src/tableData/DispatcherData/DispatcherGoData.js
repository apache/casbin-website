export const DispatcherGoData = [
  {
    title:
      "[Hashicorp Raft Dispatcher](https://github.com/apache/casbin-hraft-dispatcher)",
    type: "Raft",
    author: "Casbin",
    description:
      "A dispatcher based on [Hashicorp Raft](https://github.com/hashicorp/raft)",
    image: "/img/ecosystem/hashicorp.png",
  },
  {
    title:
      "[KDKYG/casbin-dispatcher](https://github.com/KDKYG/casbin-dispatcher)",
    type: "Raft",
    author: "[@KDKYG](https://github.com/KDKYG)",
    description:
      "A dispatcher based on [Hashicorp Raft](https://github.com/hashicorp/raft)",
  },
].map((item) => {
  return {
    ...item,
    tags: ["Go", "Dispatcher"],
  };
});
