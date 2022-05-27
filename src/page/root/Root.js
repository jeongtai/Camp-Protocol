import App from "./App"
import Landing from "./Landing"
import Admin from "./Admin"

function Root(){

    if (window.location.host.includes("app")) {return <App/>}
    else if (window.location.host.includes("test")) {return <App/>}
    else if (window.location.host.includes("team42x")) {return <Admin/>}
    else {return <Landing/>}
    
}
export default Root;