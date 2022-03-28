function LoadingSVG(props) {

  
    const selectLoading = (type) => {
        switch (type) {
            case "dot":
                return (
                    <svg
                        version="1.1"
                        id="L9"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width={props.width}
                        height={props.height}
                        x="0px"
                        y="0px"
                        viewBox="0 25 100 50"
                        enableBackground="new 0 0 0 0"
                        xmlSpace="preserve"
                    >
                        <g transform="translate(20 50)">
                            <circle cx="0" cy="0" r="6" fill="#182731">
                                <animateTransform
                                    attributeName="transform"
                                    type="scale"
                                    begin="-0.375s"
                                    calcMode="spline"
                                    keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                                    values="0;1;0"
                                    keyTimes="0;0.5;1"
                                    dur="1s"
                                    repeatCount="indefinite"
                                ></animateTransform>
                            </circle>
                        </g>
                        <g transform="translate(40 50)">
                            <circle cx="0" cy="0" r="6" fill={props.color}>
                                <animateTransform
                                    attributeName="transform"
                                    type="scale"
                                    begin="-0.25s"
                                    calcMode="spline"
                                    keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                                    values="0;1;0"
                                    keyTimes="0;0.5;1"
                                    dur="1s"
                                    repeatCount="indefinite"
                                ></animateTransform>
                            </circle>
                        </g>
                        <g transform="translate(60 50)">
                            <circle cx="0" cy="0" r="6" fill="#182731">
                                <animateTransform
                                    attributeName="transform"
                                    type="scale"
                                    begin="-0.125s"
                                    calcMode="spline"
                                    keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                                    values="0;1;0"
                                    keyTimes="0;0.5;1"
                                    dur="1s"
                                    repeatCount="indefinite"
                                ></animateTransform>
                            </circle>
                        </g>
                        <g transform="translate(80 50)">
                            <circle cx="0" cy="0" r="6" fill={props.color}>
                                <animateTransform
                                    attributeName="transform"
                                    type="scale"
                                    begin="0s"
                                    calcMode="spline"
                                    keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                                    values="0;1;0"
                                    keyTimes="0;0.5;1"
                                    dur="1s"
                                    repeatCount="indefinite"
                                ></animateTransform>
                            </circle>
                        </g>
                    </svg>
                );
                break;
            case "circle":
                return (
                    <svg
                        version="1.1"
                        id="L9"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width={props.width}
                        height={props.height}
                        x="0px"
                        y="0px"
                        viewBox="0 0 100 100"
                        enableBackground="new 0 0 0 0"
                        xmlSpace="preserve"
                    >
                        <path
                            stroke={props.color}
                            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                            strokeWidth={props.strokeWidth}
                        >
                            <animateTransform
                                attributeName="transform"
                                attributeType="XML"
                                type="rotate"
                                dur="1s"
                                from="0 50 50"
                                to="360 50 50"
                                repeatCount="indefinite"
                            />
                        </path>
                    </svg>
                );
                break;
        }
    };
    return <>{selectLoading(props.type)}</>;
}

export default LoadingSVG;
