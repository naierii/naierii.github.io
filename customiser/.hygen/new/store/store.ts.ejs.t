---
to: <%= absPath %>/<%= store_name %>.ts
---
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface <%= store_name %>State {}

const initialState: <%= store_name %>State = {};

export const <%= store_name %>Slice = createSlice({
  name: '<%= store_name %>',
  initialState,
  reducers: {},
});

export default <%= store_name %>Slice.reducer;
