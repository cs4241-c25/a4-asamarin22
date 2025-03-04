import {useState} from "react";
import './App.css'

function MyStuff(props) {
    const [fullName, setFullname] = useState(props.username);
    const changeName = () => {
        const enteredName = prompt('Enter your name');
        setFullname(enteredName);
    }
    return (
        <>
        <h2>This is My Stuff</h2>
            <p>This is all the stuff I have in my Vite/React program.</p>
            <button onClick={changeName}>{fullName}</button>
        </>
    )
}
export default MyStuff;