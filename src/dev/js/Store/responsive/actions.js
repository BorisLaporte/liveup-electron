export const RESIZING = 'RESIZING'

function resizing(width, height, orientation) {
  return {
    type: RESIZING,
    width,
    height,
    orientation
  }
}


export function getWindowSize(){
	return function (dispatch) {
    const width = window.innerWidth
    const height = window.innerHeight
    let orientation
    if (height <= width){
      orientation = LANDSCAPE
    } else {
      orientation = PORTRAIT
    }

    dispatch(resizing(width, height, orientation ))
  }
}

export const LANDSCAPE = 'LANDSCAPE'
export const PORTRAIT = 'PORTRAIT'