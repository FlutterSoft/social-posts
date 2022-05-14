const deleteBtns = document.querySelectorAll('.btnDelete')
const likeBtns = document.querySelectorAll('.btnLike')
console.log(deleteBtns)
Array.from(deleteBtns).forEach( (element) => {
    element.addEventListener('click', deletePost)
})
Array.from(likeBtns).forEach( (element) => {
    element.addEventListener('click', likePost)
})

async function likePost(){
    const name = this.parentNode.childNodes[1].innerText
    const message = this.parentNode.childNodes[3].innerText
    const likes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('like', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'name': name,
                'message': message,
                'likes' : likes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
}

async function deletePost(){
    const name = this.parentNode.childNodes[1].innerText
    const message = this.parentNode.childNodes[3].innerText
    const likes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('delete', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'name': name,
                'message': message,
                'likes': likes
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }

}
