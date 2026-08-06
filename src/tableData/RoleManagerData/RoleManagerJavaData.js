export const RoleManagerJavaData = [
  {
    title:
      "[Default Role Manager (built-in)](https://github.com/apache/casbin-jcasbin/blob/master/src/main/java/org/casbin/jcasbin/rbac/DefaultRoleManager.java)",
    author: "Casbin",
    description: "Supports role hierarchy stored in the Casbin policy",
  },
].map((item) => {
  return {
    ...item,
    tags: ["Java", "RoleManager"],
  };
});
