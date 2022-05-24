function NotFound(){
    console.log(window.location.href)
    console.log(window.location.pathname)
    var l = window.location;
    const replaceURL = () => {
        l.replace(l.protocol +'//' + l.host + l.pathname);
    }
    
    //   l.replace(
    //     l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
    //     l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
    //     l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
    //     (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
    //     l.hash
    //   );
    // window.location.href.replace(
    //     window.location.host,
    //     `app.${window.location.host}

    return <p>This page not found<br/>
        <button onClick={()=>replaceURL()}>replace</button>
    </p>
}
export default NotFound;