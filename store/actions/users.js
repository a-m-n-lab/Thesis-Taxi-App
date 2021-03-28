export const EDIT_USER = "EDIT_USER";

export const editUser = (id, firstName, lastName, phone) => {
  return {
    type: EDIT_USER,
    id: id,
    userData: {
      firstName,
      lastName,
      phone,
      role,
    },
  };
};
