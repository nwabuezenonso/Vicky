const trashcan = document.querySelector('a.delete');
trashcan.addEventListener('click',  async (e)=>{
    
    try{
        const endpoint = `/user/${trashcan.dataset.doc}`;
        const res = await fetch(endpoint, {
            method: 'DELETE'
        })
        const data = await res.json()
        if(data.user){
            location.assign('/delete')
        }
    }
    catch (err){
        console.log(err)
    }   

})
