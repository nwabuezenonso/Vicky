//SIGNUP BACKEND LINKING
const submit = document.querySelector('.submit');
const username = document.querySelector('.username')
const password = document.querySelector('.password')
const city = document.querySelector('.city')
const state = document.querySelector('.state')
const number = document.querySelector('.number')
const email = document.querySelector('.email_address')
const last_name = document.querySelector('.last_name')
const first_name = document.querySelector('.first_name')


submit.addEventListener('click',  async(e)=>{
    e.preventDefault();

    //reset errors
    // email.textContent =  ' ';
    // password.textContent = ' '
    // Cpassword.textContent = ' '

    const user_ = username.value;
    const pass= password.value;
    const city_ = city.value
    const state_ = state.value;
    const number_ = number.value;
    const email_ = email.value
    const last = last_name.value;
    const first = first_name.value;

    //get the values

     console.log(user_, pass, city_, state_, number_, email_, last, first)
      
     try{
        const res = await fetch('/signup',{
          method: 'POST',
          body: JSON.stringify({user_, pass, city_, state_, number_, email_, last, first  }),
          headers: {'Content-Type': 'application/json'}
        });
        const data = await res.json()
        console.log(data)
        // if(data.errors){
        //   emailError.textContent = data.errors.email;
        //   passwordError.textContent = data.errors.password
        // }
        if(data.user){
          location.assign('/dashboard')
          console.log("Signup is working", data)
        }
      }catch (err){
      console.log(err)
      }

})


