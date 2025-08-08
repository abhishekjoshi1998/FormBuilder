import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type FormField, type FieldType, type FormSchema } from "../../types";
import { v4 as uuidv4 } from "uuid";

interface FormBuilderState {
  currentForm: Omit<FormSchema, "id" | "name" | "createdAt">;
}

const initialState: FormBuilderState = {
  currentForm: {
    fields: [],
  },
};

const formBuilderSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<{ type: FieldType }>) => {
      const newField: FormField = {
        id: uuidv4(),
        type: action.payload.type,
        label: `New ${action.payload.type} field`,
        required: false,
        validationRules: [],
        options: ["select", "radio"].includes(action.payload.type)
          ? ["Option 1"]
          : undefined,
      };
      state.currentForm.fields.push(newField);
    },
    updateField: (state, action: PayloadAction<FormField>) => {
      const index = state.currentForm.fields.findIndex(
        (f) => f.id === action.payload.id
      );
      if (index !== -1) {
        state.currentForm.fields[index] = action.payload;
      }
    },
    deleteField: (state, action: PayloadAction<{ id: string }>) => {
      state.currentForm.fields = state.currentForm.fields.filter(
        (f) => f.id !== action.payload.id
      );
    },
    reorderFields: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>
    ) => {
      const [removed] = state.currentForm.fields.splice(
        action.payload.startIndex,
        1
      );
      state.currentForm.fields.splice(action.payload.endIndex, 0, removed);
    },
    loadFormForEditing: (state, action: PayloadAction<FormSchema>) => {
      state.currentForm = { fields: action.payload.fields };
    },
    resetBuilder: (state) => {
      state.currentForm = initialState.currentForm;
    },
  },
});

export const {
  addField,
  updateField,
  deleteField,
  reorderFields,
  loadFormForEditing,
  resetBuilder,
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
