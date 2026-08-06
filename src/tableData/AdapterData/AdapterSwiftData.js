export const AdapterSwiftData = [
  {
    title: "[File Adapter (built-in)](/docs/adapters#file-adapter-built-in)",
    type: "File",
    author: "Casbin",
    autoSave: "❌",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files",
    image: "/img/ecosystem/file.png",
  },
  {
    title:
      "[Memory Adapter (built-in)](https://github.com/apache/casbin-SwiftCasbin/blob/master/Sources/Casbin/Adapter/MemoryAdapter.swift)",
    type: "Memory",
    author: "Casbin",
    autoSave: "❌",
    description: "For memory",
    image: "/img/ecosystem/memory.png",
  },
  {
    title: "[Fluent Adapter](https://github.com/SwiftCasbin/fluent-adapter)",
    type: "ORM",
    author: "Casbin",
    autoSave: "✅",
    description:
      "[PostgreSQL, SQLite, MySQL, MongoDB](https://docs.vapor.codes/4.0/fluent/overview/#drivers) are supported by [Fluent](https://github.com/vapor/fluent)",
    image: "/img/ecosystem/SQL.png",
  },
].map((item) => {
  return {
    ...item,
    tags: ["Swift", "Adapter"],
  };
});
