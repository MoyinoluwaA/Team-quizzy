export const auth = () => {
    let userToken = localStorage.getItem('Quizzy Login Token')
    // console.log()
    // if (location.pathname == '/' && userToken) {
    //     return
    // }
    if (!userToken ) {
        return location.href = '/'
    }
    
}