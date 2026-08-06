export const RoleManagerPythonData = [
  {
    title:
      "[Default Role Manager (built-in)](https://github.com/apache/casbin-pycasbin/blob/master/casbin/rbac/default_role_manager/role_manager.py)",
    author: "Casbin",
    description: "Supports role hierarchy stored in the Casbin policy",
  },
].map((item) => {
  return {
    ...item,
    tags: ["Python", "RoleManager"],
  };
});
