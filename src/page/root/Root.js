import App from "./App"
import Landing from "./Landing"

function Root(){

    // -------------------real
    const isApp = () =>{
        return window.location.host.includes("test")
    }

    return isApp() ? <App/> : <Landing/>

    // -------------------test
    // const isLanding = () =>{
    //     return window.location.host.includes("landing")
    // }

    // return isLanding() ? <Landing/> : <App/>
}
export default Root;