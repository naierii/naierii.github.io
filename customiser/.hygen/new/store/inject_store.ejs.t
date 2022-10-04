---
to: src/store/store.ts
inject: true
after: "reducer: {"
---
    <%= store_name %>: <%= store_name %>Reducer,