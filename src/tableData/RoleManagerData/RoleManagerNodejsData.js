export const RoleManagerNodejsData = [
  {
    title:
      "[Default Role Manager (built-in)](https://github.com/apache/casbin-node-casbin/blob/master/src/rbac/defaultRoleManager.ts)",
    author: "Casbin",
    description: "Supports role hierarchy stored in the Casbin policy",
  },
  {
    title:
      "[Session Role Manager](https://github.com/node-casbin/session-role-manager)",
    author: "Casbin",
    description:
      "Supports role hierarchy stored in the Casbin policy, with time-range-based sessions",
    image: "/img/ecosystem/session.png",
  },
].map((item) => {
  return {
    ...item,
    tags: ["NodeJS", "RoleManager"],
  };
});
