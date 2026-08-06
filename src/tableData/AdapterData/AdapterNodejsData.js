export const AdapterNodejsData = [
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
    title: "[Filtered File Adapter (built-in)](/docs/policy-subset-loading)",
    type: "File",
    author: "Casbin",
    autoSave: "❌",
    description:
      "For [.CSV (Comma-Separated Values)](https://en.wikipedia.org/wiki/Comma-separated_values) files with policy subset loading support",
    image: "/img/ecosystem/file.png",
  },
  {
    title:
      "[String Adapter (built-in)](https://github.com/apache/casbin-node-casbin/blob/master/src/persist/stringAdapter.ts)",
    type: "String",
    author: "[@calebfaruki](https://github.com/calebfaruki)",
    autoSave: "❌",
    description: "For String",
    image: "/img/ecosystem/string.png",
  },
  {
    title: "[Basic Adapter](https://github.com/node-casbin/basic-adapter)",
    type: "Native ORM",
    author: "Casbin",
    autoSave: "✅",
    description:
      "pg, mysql, mysql2, sqlite3, oracledb, mssql are supported by the adapter itself",
    image: "/img/ecosystem/SQL.png",
  },
  {
    title:
      "[Sequelize Adapter](https://github.com/node-casbin/sequelize-adapter)",
    type: "ORM",
    author: "Casbin",
    autoSave: "✅",
    description:
      "MySQL, PostgreSQL, SQLite, Microsoft SQL Server are supported by [Sequelize](https://github.com/sequelize/sequelize)",
    image: "/img/ecosystem/SQL.png",
  },
  {
    title: "[TypeORM Adapter](https://github.com/node-casbin/typeorm-adapter)",
    type: "ORM",
    author: "Casbin",
    autoSave: "✅",
    description:
      "MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL, MongoDB are supported by [TypeORM](https://github.com/typeorm/typeorm)",
    image: "/img/ecosystem/SQL.png",
  },
  {
    title: "[Prisma Adapter](https://github.com/node-casbin/prisma-adapter)",
    type: "ORM",
    author: "Casbin",
    autoSave: "✅",
    description:
      "MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, AWS Aurora, Azure SQL are supported by [Prisma](https://www.prisma.io/)",
    image: "/img/ecosystem/SQL.png",
  },
  {
    title: "[Drizzle Adapter](https://github.com/node-casbin/drizzle-adapter)",
    type: "ORM",
    author: "Casbin",
    autoSave: "✅",
    description:
      "PostgreSQL, MySQL, SQLite, Turso, Neon, PlanetScale, Vercel Postgres, Xata are supported by [Drizzle ORM](https://orm.drizzle.team/)",
    image: "/img/ecosystem/SQL.png",
  },
  {
    title: "[Knex Adapter](https://github.com/knex/casbin-knex-adapter)",
    type: "ORM",
    author: "[knex](https://github.com/knex)",
    autoSave: "✅",
    description:
      "MSSQL, MySQL, PostgreSQL, SQLite3, Oracle are supported by [Knex.js](https://knexjs.org/)",
    image: "/img/ecosystem/SQL.png",
  },
  {
    title:
      "[Objection.js Adapter](https://github.com/willsoto/casbin-objection-adapter)",
    type: "ORM",
    author: "[@willsoto](https://github.com/willsoto)",
    autoSave: "✅",
    description:
      "MSSQL, MySQL, PostgreSQL, SQLite3, Oracle are supported by [Objection.js](https://vincit.github.io/objection.js/)",
    image: "/img/ecosystem/SQL.png",
  },
  {
    title:
      "[MikroORM Adapter](https://github.com/baisheng/casbin-mikroorm-adapter)",
    type: "ORM",
    author: "[@baisheng](https://github.com/baisheng)",
    autoSave: "✅",
    description:
      "MongoDB, MySQL, MariaDB, PostgreSQL, SQLite are supported by [MikroORM](https://mikro-orm.io/)",
  },
  {
    title:
      "[Node PostgreSQL Native Adapter](https://github.com/touchifyapp/casbin-pg-adapter)",
    type: "SQL",
    author: "[@touchifyapp](https://github.com/touchifyapp)",
    autoSave: "✅",
    description:
      "PostgreSQL adapter with advanced policy subset loading support and improved performances built with [node-postgres](https://node-postgres.com/).",
  },
  {
    title:
      "[Mongoose Adapter](https://github.com/node-casbin/mongoose-adapter)",
    type: "NoSQL",
    author: "[elastic.io](https://github.com/elasticio) and Casbin",
    autoSave: "✅",
    description: "MongoDB is supported by [Mongoose](https://mongoosejs.com/)",
  },
  {
    title:
      "[Mongoose Adapter (No-Transaction)](https://github.com/minhducck/casbin-mongoose-adapter)",
    type: "NoSQL",
    author: "[minhducck](https://github.com/minhducck)",
    autoSave: "✅",
    description: "MongoDB is supported by [Mongoose](https://mongoosejs.com/)",
  },
  {
    title: "[Node MongoDB Native Adapter](https://github.com/NathanBhanji/mongodb-casbin-adapter)",
    type: "NoSQL",
    author: "[NathanBhanji](https://github.com/NathanBhanji)",
    autoSave: "✅",
    description: "For [Node MongoDB Native](https://mongodb.github.io/node-mongodb-native/)",
  },
  {
    title:
      "[Node MongoDB Native Adapter](https://github.com/juicycleff/casbin-mongodb-adapter)",
    type: "NoSQL",
    author: "[@juicycleff](https://github.com/juicycleff)",
    autoSave: "✅",
    description:
      "For [Node MongoDB Native](https://mongodb.github.io/node-mongodb-native/)",
  },
  {
    title:
      "[DynamoDB Adapter](https://github.com/fospitia/casbin-dynamodb-adapter)",
    type: "NoSQL",
    author: "[@fospitia](https://github.com/fospitia)",
    autoSave: "✅",
    description: "For [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)",
  },
  {
    title:
      "[Couchbase Adapter](https://github.com/MarkMYoung/casbin-couchbase-adapter)",
    type: "NoSQL",
    author: "[@MarkMYoung](https://github.com/MarkMYoung)",
    autoSave: "✅",
    description: "For [Couchbase](https://www.couchbase.com/)",
  },
  {
    title: "[Redis Adapter](https://github.com/node-casbin/redis-adapter)",
    type: "KV store",
    author: "Casbin",
    autoSave: "❌",
    description: "For [Redis](https://redis.io/)",
  },
  {
    title:
      "[Redis Adapter](https://github.com/NandaKishorJeripothula/node-casbin-redis-adapter)",
    type: "KV store",
    author:
      "[@NandaKishorJeripothula](https://github.com/NandaKishorJeripothula)",
    autoSave: "❌",
    description: "For [Redis](https://redis.io/)",
  },
].map((item) => {
  return {
    ...item,
    tags: ["NodeJS", "Adapter"],
  };
});
