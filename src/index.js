import React from "react";
import ReactDOM from "react-dom";
import Root from "./page/root/Root";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { reducer, Sendreducer, Viewreducer } from "./Contract";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./assets/theme";

const GlobalStyle = createGlobalStyle`
    /* vietnamese */
    @font-face {
      font-family: 'Lexend';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/lexend/v14/wlptgwvFAVdoq2_F94zlCfv0bz1WCwkWzLhnepKu.woff2) format('woff2');
      unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
    }
    /* latin */
    @font-face {
      font-family: 'Lexend';
      font-style: normal;
      font-weight: 500;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/lexend/v14/wlptgwvFAVdoq2_F94zlCfv0bz1WCwkWzLdneg.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* latin 'Montserrat' */
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400;
      src: url('../fonts/montserrat-v23-vietnamese_latin-ext_latin-regular.eot'); /* IE9 Compat Modes */
      src: local(''),
          url('../fonts/montserrat-v23-vietnamese_latin-ext_latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
          url('../fonts/montserrat-v23-vietnamese_latin-ext_latin-regular.svg#Montserrat') format('svg'); /* Legacy iOS */
    }

    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 400;
      src: local('Montserrat-Regular'), url(http://fonts.gstatic.com/s/montserrat/v6/zhcz-_WihjSQC0oHJ9TCYC3USBnSvpkopQaUR-2r7iU.ttf) format('truetype');
    }
    @font-face {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 700;
      src: local('Montserrat-Bold'), url(http://fonts.gstatic.com/s/montserrat/v6/IQHow_FEYlDC4Gzy_m8fcvEr6Hm6RMS0v1dtXsGir4g.ttf) format('truetype');
    }

    
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video, button {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font : inherit;
      font-family: 'Lexend', sans-serif;
      vertical-align: baseline;
    }
    
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
      display: block;
    }
    /* HTML5 hidden-attribute fix for newer browsers */
    *[hidden] {
        display: none;
    }
    body {
      line-height: 1;
    }
    menu, ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    * {
      box-sizing: border-box;
    }

    body{      
      background-color: ${(props) => props.theme.bgColor} ;
    }

    a {
      text-decoration:none ;
      color:inherit;
    }

`;

let store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Root />
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);
