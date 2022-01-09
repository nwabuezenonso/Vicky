//Login Form
const Login = document.querySelector('.submitLogin');
const username_ = document.querySelector('.username')
const password_ = document.querySelector('.password')

Login.addEventListener('click', async (e)=>{
    e.preventDefault();

    const user_ = username_.value;
    const pass = password_.value;

    //get the values  
    console.log(user_, pass)
    try{
        const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({user_, pass}),
        headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json()

        // if(data.errors){
        //   emailError.textContent = data.errors.email;
        //   passwordError.textContent = data.errors.password
        // }
        if(data.user){
        location.assign('/dashboard')
        console.log("login is working", data)
        }
    }catch (err){
    console.log(err)
    }

})
