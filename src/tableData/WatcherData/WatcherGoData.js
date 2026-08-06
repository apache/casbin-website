export const WatcherGoData = [
  {
    title:
      "[PostgreSQL WatcherEx](https://github.com/IguteChung/casbin-psql-watcher)",
    type: "Database",
    author: "[@IguteChung](https://github.com/IguteChung)",
    description: "WatcherEx for [PostgreSQL](https://www.postgresql.org/)",
    image: "/img/ecosystem/postgreSQL.png",
  },
  {
    title: "[Redis WatcherEx](https://github.com/apache/casbin-redis-watcher)",
    type: "KV store",
    author: "Casbin",
    description: "WatcherEx for [Redis](http://redis.io/)",
    image: "/img/ecosystem/redis.png",
  },
  {
    title:
      "[Redis Watcher](https://github.com/billcobbler/casbin-redis-watcher)",
    type: "KV store",
    author: "[@billcobbler](https://github.com/billcobbler)",
    description: "Watcher for [Redis](http://redis.io/)",
    image: "/img/ecosystem/redis.png",
  },
  {
    title: "[Etcd Watcher](https://github.com/apache/casbin-etcd-watcher)",
    type: "KV store",
    author: "Casbin",
    description: "Watcher for [etcd](https://github.com/coreos/etcd)",
    image: "/img/ecosystem/etcd.png",
  },
  {
    title: "[TiKV Watcher](https://github.com/apache/casbin-tikv-watcher)",
    type: "KV store",
    author: "Casbin",
    description: "Watcher for [TiKV](https://github.com/tikv/tikv)",
    image: "/img/ecosystem/tikv.png",
  },
  {
    title: "[Kafka Watcher](https://github.com/wgarunap/casbin-kafka-watcher)",
    type: "Messaging system",
    author: "[@wgarunap](https://github.com/wgarunap)",
    description: "Watcher for [Apache Kafka](https://kafka.apache.org/)",
    image: "/img/ecosystem/kafka.png",
  },
  {
    title: "[NATS Watcher](https://github.com/Soluto/casbin-nats-watcher)",
    type: "Messaging system",
    author: "[Soluto](https://github.com/Soluto)",
    description: "Watcher for [NATS](https://nats.io/)",
  },
  {
    title: "[ZooKeeper Watcher](https://github.com/grepsr/casbin-zk-watcher)",
    type: "Messaging system",
    author: "[Grepsr](https://github.com/grepsr)",
    description:
      "Watcher for [Apache ZooKeeper](https://zookeeper.apache.org/)",
    image: "/img/ecosystem/zookeeper.png",
  },
  {
    title:
      "[NATS, RabbitMQ, GCP Pub/Sub, AWS SNS & SQS, Kafka, InMemory](https://github.com/rusenask/casbin-go-cloud-watcher)",
    type: "Messaging System",
    author: "[@rusenask](https://github.com/rusenask/)",
    description:
      "Watcher based on [Go Cloud Dev Kit](https://gocloud.dev/) that works with leading cloud providers and self-hosted infrastructure",
  },
  {
    title:
      "[NATS, RabbitMQ, GCP Pub/Sub, AWS SNS & SQS, Kafka, InMemory](https://github.com/bartventer/casbin-go-cloud-watcher)",
    type: "Messaging System",
    author: "[@bartventer](https://github.com/bartventer/)",
    description:
      "WatcherEx based on [Go Cloud Dev Kit](https://gocloud.dev/) that works with leading cloud providers and self-hosted infrastructure",
  },
  {
    title:
      "[RocketMQ Watcher](https://github.com/fmyxyz/casbin-rocketmq-watcher)",
    type: "Messaging system",
    author: "[@fmyxyz](https://github.com/fmyxyz)",
    description: "Watcher for [Apache RocketMQ](https://rocketmq.apache.org/)",
    image: "/img/ecosystem/rocketMQ.png",
  },
].map((item) => {
  return {
    ...item,
    tags: ["Go", "Watcher"],
  };
});
