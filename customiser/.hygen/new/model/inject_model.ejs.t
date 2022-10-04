---
to: <%= absPath %>/index.ts
inject: true
after: ";"
---
export * from './<%= h.changeCase.lowerCase(model_name) %>.model';