---
to: src/store/store.ts
inject: true
after: import
---
import <%= store_name %>Reducer from './<%= store_name %>';