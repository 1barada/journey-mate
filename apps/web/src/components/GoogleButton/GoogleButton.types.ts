export enum FormTypes {
  signIn = 'signIn',
  signUp = 'signUp',
}

export interface GoogleButtonProps {
  formType: FormTypes;
  toggleModal: () => void;
}
