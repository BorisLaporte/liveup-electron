export const LOGING = 'LOGING'
export const LOG_SUCCESS = 'LOG_SUCCESS'
export const LOG_FAILURE = 'LOG_FAILURE'

export const SIGNING_UP = 'SIGNING_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const PASSWORD_REQUESTING = 'PASSWORD_REQUESTING'
export const PASSWORD_FINISHED = 'PASSWORD_FINISHED'

export const LOGOUT = 'LOGOUT'

// function resizing(width, height, orientation) {
//   return {
//     type: RESIZING,
//     width,
//     height,
//     orientation
//   }
// }


// export function getWindowSize(){
//   return function (dispatch) {
//     const width = window.innerWidth
//     const height = window.innerHeight
//     let orientation
//     if (height <= width){
//       orientation = LANDSCAPE
//     } else {
//       orientation = PORTRAIT
//     }

//     dispatch(resizing(width, height, orientation ))
//   }
// }