import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import authenticationDataService from "../service/authentication.service.tsx"
import {useAuth} from "../auth/AuthProvider.tsx";
import Swal from "sweetalert2";
import {MTPage, MTPageBody, MTPageContent} from "../components/pages/MTPage.tsx";
import CenteredFlex from "../components/layout/CenteredFlex.tsx";

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState('')

    const auth = useAuth()
    const navigate = useNavigate()


    const checkAccountExists = (callback: any) => {
        authenticationDataService.checkAccountExists({username: username, password: ""})
            .then((r) => {
                callback(r.data?.accountExists)
            }).catch((r) => {
            Swal.fire({
                title: "Account check failed",
                text: r.data.message,
                icon: "error"
            }).then();
        })
    }


    const signUp = () => {
        authenticationDataService.signUp({username: username, password: password})
            .then((r) => {
                if (r.data.message === 'success') {
                    auth.login({username: username, token: r.data.token, currentRole: r.data.currentUserRole})
                    navigate('/home')
                } else {
                    Swal.fire({
                        title: "Sign up failed",
                        text: r.data.message,
                        icon: "error"
                    }).then();
                }
            }).catch(reason => {
            console.log(reason)
            Swal.fire({
                title: "Sign up failed",
                text: reason.response.data.message,
                icon: "error"
            }).then();

        })
    }

    const onButtonClick = (e: any) => {
        e.preventDefault()
        // Set initial error values to empty
        setUsernameError('')
        setPasswordError('')
        setRepeatPasswordError('')

        // Check if the user has entered both fields correctly
        if ('' === username) {
            setUsernameError('Please enter your email')
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username)) {
            setUsernameError('Please enter a valid email')
            return
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
            return
        }

        if ('' === repeatPassword) {
            setPasswordError('Please repeat your password')
            return
        }

        if (repeatPassword != password) {
            setPasswordError('passwords do not match')
            setRepeatPasswordError('passwords do not match')
            return
        }


        // if (password.length < 7) {
        //   setPasswordError('The password must be 8 characters or longer')
        //   return
        // }

        // Authentication calls will be made here...


        checkAccountExists((accountExists: boolean) => {
            if (accountExists) {
                Swal.fire({
                    title: "Sign up failed!",
                    text: "The email used to sign up is already registered, this warning should be replaced by a email with a confirmation link, to avoid privacy issues",
                }).then();

            } else {
                signUp()
            }
        })
    }


    return (


        <MTPage>
            <MTPageBody>
                <MTPageContent>
                    <div className={'titleContainer'}>
                        <div>
                            Sign In
                        </div>
                    </div>
                    <CenteredFlex>
                        <form onSubmit={onButtonClick}>
                            <div className={'inputContainer'}>
                                <input
                                    value={username}
                                    placeholder="Enter your email here"
                                    onChange={(ev) => setUsername(ev.currentTarget.value)}
                                    className={'inputBox'}
                                />
                                <label className="errorLabel">{usernameError}</label>
                            </div>
                            <br/>
                            <div className={'inputContainer'}>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    value={password}
                                    placeholder="Enter your password here"
                                    onChange={(ev) => setPassword(ev.currentTarget.value)}
                                    className={'inputBox'}
                                />
                                <label className="errorLabel">{passwordError}</label>
                            </div>
                            <br/>
                            <div className={'inputContainer'}>
                                <input
                                    type="password"
                                    autoComplete="off"
                                    value={repeatPassword}
                                    placeholder="Repeat password"
                                    onChange={(ev) => setRepeatPassword(ev.currentTarget.value)}
                                    className={'inputBox'}
                                />
                                <label className="errorLabel">{repeatPasswordError}</label>
                            </div>
                            <br/>
                            <div className={'buttonContainer'}>
                                <input className={'inputButton'} type='submit' value={'Register'}/>
                            </div>

                        </form>
                    </CenteredFlex>

                </MTPageContent>
            </MTPageBody>
        </MTPage>


    )
}

export default Register