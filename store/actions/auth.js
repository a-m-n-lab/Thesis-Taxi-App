// export const SIGNUP = "SIGNUP";
// export const USERLOGIN = "USERLOGIN";
// export const DRIVERLOGIN = "DRIVERLOGIN";
// export const LOGOUT = "LOGOUT";

// export const signup = (email, password) => {
//   return async (dispatch) => {
//     const response = await fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7hTq-te4Z7Wb6BN3KkQdGlMQXg8eOUTo",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Something went wrong!");
//     }

//     const resData = await response.json();
//     console.log(resData);
//     dispatch({
//       type: SIGNUP,
//       token: resData.idToken,
//       userId: resData.localId,
//     });
//   };
// };

// export const userLogin = (email, password) => {
//   return async (dispatch) => {
//     const response = await fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7hTq-te4Z7Wb6BN3KkQdGlMQXg8eOUTo",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorResData = await response.json();
//       console.log(errorResData);
//     }

//     const resData = await response.json();
//     console.log(resData);
//     dispatch({
//       type: USERLOGIN,
//       token: resData.idToken,
//       userId: resData.localId,
//     });
//   };
// };

// export const driverLogin = (email, password) => {
//   return async (dispatch) => {
//     const response = await fetch(
//       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7hTq-te4Z7Wb6BN3KkQdGlMQXg8eOUTo",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           returnSecureToken: true,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Something went wrong!");
//     }

//     const resData = await response.json();
//     console.log(resData);
//     dispatch({
//       type: DRIVERLOGIN,

//       token: resData.idToken,
//       userId: resData.localId,
//     });
//   };
// };

// export const logout = () => {
//   return {
//     type: LOGOUT,
//   };
// };
