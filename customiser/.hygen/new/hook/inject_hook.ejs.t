---
to: <%= absPath %>/index.ts
inject: true
after: ";"
---
export * from './use<%= h.inflection.camelize(hook_name) %>';