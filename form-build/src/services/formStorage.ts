import { type FormSchema } from "../types";

const FORMS_KEY = "dynamicForms";

export const getAllForms = (): FormSchema[] => {
  try {
    const formsJson = localStorage.getItem(FORMS_KEY);
    return formsJson ? JSON.parse(formsJson) : [];
  } catch (error) {
    console.error("Error parsing forms from localStorage", error);
    return [];
  }
};

export const getFormById = (formId: string): FormSchema | undefined => {
  const forms = getAllForms();
  return forms.find((form) => form.id === formId);
};

export const saveForm = (formToSave: FormSchema): void => {
  const forms = getAllForms();
  const existingIndex = forms.findIndex((form) => form.id === formToSave.id);

  if (existingIndex > -1) {
    forms[existingIndex] = formToSave;
  } else {
    forms.push(formToSave);
  }

  localStorage.setItem(FORMS_KEY, JSON.stringify(forms));
};
