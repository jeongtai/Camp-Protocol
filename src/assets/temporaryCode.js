// // ---------------------------- dashboard  chart

// const TVL = styled.div`
//     margin: 16px 0px 0px 0px;
//     background-color: white;
//     border-radius: 15px;
//     border: 2px solid ${(props) => props.theme.borderColor};
//     padding: 20px;
//     span {
//         font-weight: 400;
//         font-size: 20px;
//         width: 100%;
//     }

//     p {
//         margin-top: 15px;
//         font-weight: 600;
//         font-size: 24px;
//     }
// `;

// <TVL>
//     <span>TVL</span>
//     <p>{infos[2].amt}</p>
//     <div>
//         <ApexCharts
//             type="area"
//             series={[
//                 {
//                     name: "sales",
//                     data: [21, 3, 45, 4, 3, 5, 8, 6, 24],
//                 },
//             ]}
//             options={{
//                 chart: {
//                     height: 300,
//                     width: 300,
//                     toolbar: { show: false },
//                     background: "transparent",
//                 },
//                 tooltip: { show: false },
//                 stroke: { curve: "smooth", width: 3 },
//                 grid: { show: false },
//                 xaxis: {
//                     labels: {
//                         show: false,
//                         format: 'MM-dd'
//                     },
//                     axisTicks: { show: false },
//                 },
//                 yaxis: {
//                     labels: {
//                         show: false
//                     }
//                 },
//                 theme: { mode: "dark" }
//             }}
//         />
//     </div>
// </TVL>