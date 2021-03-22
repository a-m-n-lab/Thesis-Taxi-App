import USERS from "../../data/dummy-data";
import User from "../../models/user";
import { EDIT_USER } from "../actions/users";

const initialState = {
  availableUsers: USERS.filter((user) => user.id === "u1"),
};
export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_USER:
      const userIndex = state.availableUsers.findIndex(
        (user) => user.id === action.id
      );
      // const userImage = state.availableUsers.find(
      //   (user) => user.imageUrl == action.image
      // );
      const editedUser = new User(
        state.availableUsers[userIndex].id,
        state.availableUsers[userIndex].imageUrl,
        action.userData.firstName,
        action.userData.lastName,
        action.userData.phone
      );
      const updatedUser = [...state.availableUsers];
      updatedUser[userIndex] = editedUser;
      // const availUsersIndex = state.availableUsers.findIndex(
      //   (user) => user.id === action.id
      // );
      // const updatedAvailableUsers = [...state.availableUsers];
      // updatedAvailableUsers[availUsersIndex] = editedUser;
      return {
        ...state,
        availableUsers: updatedUser,
      };
  }
  return state;
};
