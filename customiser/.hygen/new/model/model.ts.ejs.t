---
to: <%= absPath %>/<%= h.changeCase.lowerCase(model_name) %>.model.ts
---

export interface <%= h.inflection.camelize(model_name) %>Model {}
