import {useNavigate} from 'react-router-dom'
import {useState} from "preact/compat";

import authenticationManager from "../auth/authenticationManager";

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    console.log("on home page")

    let currentUser = authenticationManager.getLoggedInUser()

    if (authenticationManager.isLoggedIn()) {
        console.log("local user found")
        setUsername(currentUser.username)
        setLoggedIn(true)
    }

    const onButtonClick = () => {
        if (loggedIn) {
            console.log("Logged in button click")
            authenticationManager.removeLogin()
            setLoggedIn(false)
            setUsername('')

        } else {
            console.log("Logged OUT button click")
            navigate('/login')
        }
    }

    return (
        <div className="mainContainer">
            <div className={'titleContainer'}>
                <div>Welcome to Medtracker!</div>
            </div>
            <div>This is the home page.</div>
            <div className={'buttonContainer'}>
                <input
                    className={'inputButton'}
                    type="button"
                    onClick={onButtonClick}
                    value={loggedIn ? 'Log out' : 'Log in'}
                />
                {loggedIn ? <div>Your email address is {username}</div> : <div/>}
            </div>
        </div>
    )


}

export default Home