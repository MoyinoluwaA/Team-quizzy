export const auth = () => {
    let userToken = localStorage.getItem('Quizzy Login Token')
    if (!userToken ) {
        return location.href = '/'
    }
    
}