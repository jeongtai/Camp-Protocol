
import { Routes, Route, Link, useMatch } from "react-router-dom";

function Landing() {
    return (
        <div>
            <p>
                landing
            </p>
            <p>
                {/* real  */}
                
                {/* <a href={`${window.location.href.replace(window.location.host, `app.${window.location.host}`)}`}>
                    <button>app</button>
                </a> */}

                {/* test  */}
                <a href={`${window.location.href.replace("landing", "")}`}>
                    <button>app</button>
                </a>
            </p>
        </div>


    )
}
export default Landing;