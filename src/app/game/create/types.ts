export type createGameForm = {
  name: string;
  age: string;
  duration: string;
  image?: any;
  rate: number;
};

export type createGameFormData = Omit<createGameForm, "image"> & {
  image: string;
};
