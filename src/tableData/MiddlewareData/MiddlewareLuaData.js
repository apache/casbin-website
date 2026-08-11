export const MiddlewareLuaData = [
  {
    title: "[OpenResty](https://openresty.org/)",
    description:
      "A dynamic web platform based on NGINX and LuaJIT, via plugin: [lua-resty-casbin](https://github.com/casbin-lua/lua-resty-casbin) and [casbin-openresty-example](https://github.com/rushitote/casbin-openresty-example)",
    image: "/img/ecosystem/openResty.png",
  },
  {
    title: "[Kong](https://github.com/Kong/kong)",
    description:
      "A cloud-native, platform-agnostic, scalable API Gateway distinguished for its high performance and extensibility via plugins, via plugin: [kong-authz](https://github.com/casbin-lua/kong-authz)",
    image: "/img/ecosystem/openResty.png",
  },
  {
    title: "[Apache APISIX](https://github.com/apache/apisix)",
    description:
      "An Apache API gateway with a built-in [authz-casbin](https://apisix.apache.org/docs/apisix/plugins/authz-casbin/) plugin for route-level authorization.",
    image: "/img/ecosystem/apisix.png",
  },
].map((item) => {
  return {
    ...item,
    tags: ["Lua", "Middleware"],
  };
});
