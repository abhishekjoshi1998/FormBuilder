import { configureStore } from '@reduxjs/toolkit';
import formBuilderReducer from '../features/form-builder/formBuilderSlice';
import savedFormsReducer from '../features/saved-forms/savedFormsSlice';

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    savedForms: savedFormsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;