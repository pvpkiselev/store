import { AppState, createAppSelector } from '../redux';

const selectAuthState = (state: AppState) => state.auth;

export const selectStatus = createAppSelector([selectAuthState], (authState) => authState.status);
export const selectError = createAppSelector([selectAuthState], (authState) => authState.error);

export const selectIsAuth = createAppSelector([selectAuthState], (authState) => authState.isAuth);
export const selectUserName = createAppSelector([selectAuthState], (authState) => authState.name);
export const selectUserEmail = createAppSelector([selectAuthState], (authState) => authState.email);
export const selectUserAvatar = createAppSelector(
  [selectAuthState],
  (authState) => authState.avatar
);
