import App from "./App"
import Landing from "./Landing"

function Root(){

    if (window.location.host.includes("app")) {return <App/>}
    else if (window.location.host.includes("test")) {return <App/>}
    else {return <Landing/>}
    
}
export default Root;