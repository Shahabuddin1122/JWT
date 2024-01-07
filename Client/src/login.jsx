import { useState } from 'react'
import style from "./login.module.css"
import axios from "axios";
import Toaster, { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
function App() {
    
    const initialData = {
        email: '',
        password: ''
      };
    
      const [user, setUser] = useState(initialData);
      const navigate = useNavigate();
      const handleInputChangeemail = (e) => {
        setUser({ ...user, email: e.target.value });
      };
    
      const handleInputChangepass = (e) => {
        setUser({ ...user, password: e.target.value });
      };
      const handleSubmit = (e)=>{
        axios.post("http://localhost:4000/login",user)
        .then((data)=>{
            console.log("successfull")
            console.log(data);
            toast.success(`Successfully Logged in ${data.data.user.name}`)
            sessionStorage.setItem("User",JSON.stringify(data.data.user))
            sessionStorage.setItem("Auth",JSON.stringify(data.data.auth))
            navigate('/landing')
        })
        .catch((err)=>{
            console.log("Failed")
            toast.error(`Successfully Logged in ${data.data.user.name}`)
        })
      }
  return (
    <>
        <div className={style.container}>
            <div className={style.signin}>
                <div className={style.content}>
                    <h2>Sign in</h2>
                    <div className={style.form}>
                        <div className={style.inputBx}>
                            <input type="" value={user.email} onChange={handleInputChangeemail} required />
                            <label htmlFor="">Email</label>
                        </div>
                        <div className={style.inputBx}>
                            <input type="password" value={user.password} onChange={handleInputChangepass} required/>
                            <label htmlFor="">Password</label>
                        </div>
                        <div className={style.inputBx}>
                            <input type="submit" value='Login' onClick={handleSubmit} />
                        </div>
                    </div>
                    <div className={style.text}>
                        <h5>forgot password</h5>
                        <h5>SignUp</h5>
                    </div>
                    <div className={style.line}></div>
                    <div className={style.inputBx}>
                        <input type="submit" value='Login with Google' />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default App
