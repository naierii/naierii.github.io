---
to: <%= absPath %>/use<%= h.inflection.camelize(hook_name) %>/index.ts
---
export * from './use<%= h.inflection.camelize(hook_name) %>';
