import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  //todo 2: SE ACTUALIZA FORM-STATE Y se vuelve a llamar a createValidators()
  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  //todo 4:  provoca un nuevo cambio en formState debido a la dependencia en formValidation dentro de isFormValid
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  //todo 1: SE ACTUALIZA FORM-STATE
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  //todo 3: a su vez actualiza formValidation
  const createValidators = () => {
    const formCheckedValues = {};
    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];
      //si includes @ => null
      //si NO includes @ => "El correo debe de tener una @"
      //emailValid = fn('rafael@gmail.com') ?
      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
      // console.log(formCheckedValues);
      //{emailValid: null, passwordValid: null, displayNameValid: null}
    }
    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
