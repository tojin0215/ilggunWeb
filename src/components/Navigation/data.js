<<<<<<< HEAD
=======
// export const columns = [
//   {
//     name: "이름",
//     selector: "name",
//     sortable: true
//   },

  
//   {
//     name: "정규직/비정규직",
//     selector: "permanent",
//     grow:2,
//     cell: row =>
//         row.showButtons ? (
//           <> 
//             <button>정규직</button>
//             <button>비정규직</button>
//           </>
//         ) : null
//   },
//   {
//     name: "근로계약서작성여부",
//     selector: "write",
//     grow:2,
//     cell: row =>
//         row.showButtons ? (
//           <>
//             <button>작성</button>            
//             <button>미작성</button>                    
//           </>    
//           ) : null  
//   },
//   {
//     name: "근로계약서",
//     Button: true,
//     grow:2,
//     cell: row =>
//         row.showButtons ? (
//           <>           
//             <button>근로계약서</button>
//           </>
//         ) : null
//   },
//   ////1
//   {
//     name: "QR",
//     Button: true,
//     cell: row =>
//         row.showButtons ? (
//           <>           
//             <button>QR</button>
//           </>
//         ) : null
//   },
//   {
//     name: "입사일",
//     selector: "date",
//     sortable: true    
//   }, 
//   {
//     name: "직책(업무)",
//     selector: "work",
//     sortable: true
//   },
//   {
//     name: "퇴직처리",
//     Button: true,
//     cell: row =>
//         row.showButtons ? (
//           <>           
//             <button>Delete</button>              
//           </>
//         ) : null
//   },
//   /////2
//   {
//     name:"출근시간",
//     selector: "openTime",
//     sortable:true
//   },
//   {
//     name:" 퇴근시간",
//     selector: "closeTime",
//     sortable:true
//   },
//   {
//     name:"휴가",
//     selector: "vacation",
//     sortable:true
//   }
//   /////3
// ]

const nameArray = [
  "도윤",
  "서준",
  "하준",
  "은우",
  "시우",
  "이준",
  "지호",
  "서아",
  "지안",
  "서윤",
  "하은",
  "아린"
];
const lastNameArray = ["김", "이", "박", "최"]
const workArray = ["개발", "디자인", "운영", "영업"]
const starttimeArray = ["09:00", "10:00", "10:30"]
const endtimeArray = ["19:00", "18:00", "18:30"]


const data = []
for (let i = 0; i < 20; i++) {
  console.debug(Math.floor(Math.random()*2)+1)
  var name = lastNameArray[Math.floor(Math.random()*lastNameArray.length)] + nameArray[Math.floor(Math.random()*nameArray.length)];
  var to_name = lastNameArray[Math.floor(Math.random()*lastNameArray.length)] + nameArray[Math.floor(Math.random()*nameArray.length)];
  data.push({
    id: i,
    name: name,
    showButtons:true,
    date: "21/07/13",    
    work: workArray[Math.floor(Math.random()*workArray.length)],
    showButtons:true,
    openTime: starttimeArray[Math.floor(Math.random()*starttimeArray.length)],
    closeTime:endtimeArray[Math.floor(Math.random()*endtimeArray.length)],
    vacation: "무급휴가",
    withTax: (Math.floor(Math.random()*10)*100000).toString(),
    withoutTax: (Math.floor(Math.random()*10)*10000).toString(),
    from: name,
    to: to_name,
    title: "제목",
    read: true,
    workername: name,
    workername2: name,
    type: Math.floor(Math.random()*2)+1,
    state: Math.floor(Math.random()*2)+1,
    level: "사원",
    normalPay: "8000",
    worktime: "288",
    tax: "20000",
    realPay: "400000",
    startdate: "21/07/13"
  })
}
// export data;

>>>>>>> ba4a02713e33c8f8e9e2bf2262bd4464687e93f4

// export const data = [    
const data2 = [ 
  {
    id: 1,
    name: "A사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가",
    withTax: "50000",
    withoutTax: "30000",
    from: "A사원",
    to: "B과장",
    title: "제목",
    read: true,
    workername: "A사원",
    workername2: "A사원",
    type: 2,
    state: 2,
    level: "사원",
    normalPay: "8000",
    worktime: "288",
    tax: "20000",
    realPay: "400000",
    startdate: "21/07/13"
  },
  
  {
    id: 2,
    name: "B사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가",
    withTax: "50000",
    withoutTax: "30000",
    from: "A사원",
    to: "B과장",
    title: "제목",
    read: true,
    workername: "A사원",
    workername2: "A사원",
    type: 2,
    state: 2,
    level: "사원",
    normalPay: "8000",
    worktime: "288",
    tax: "20000",
    realPay: "400000"
  },
  {
    id: 3,
    name: "C사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가",
    withTax: "50000",
    withoutTax: "30000",
    from: "A사원",
    to: "B과장",
    title: "제목",
    read: false,
    workername: "A사원",
    workername2: "A사원",
    type: 2,
    state: 1,
    level: "사원",
    normalPay: "8000",
    worktime: "288",
    tax: "20000",
    realPay: "400000"
  },
  {
    id: 4,
    name: "A사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가",
    withTax: "50000",
    withoutTax: "30000",
    from: "A사원",
    to: "B과장",
    title: "제목",
    read: true,
    workername: "A사원",
    workername2: "A사원",
    type: 1,
    state: 2,
    level: "사원",
    normalPay: "8000",
    worktime: "288",
    tax: "20000",
    realPay: "400000"
  },
  {
    id: 5,
    name: "B사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가",
    withTax: "50000",
    withoutTax: "30000",
    from: "A사원",
    to: "B과장",
    title: "제목",
    read: true
  },
  {
    id: 6,
    name: "C사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가",
    withTax: "50000",
    withoutTax: "30000",
    from: "A사원",
    to: "B과장",
    title: "제목",
    read: false
  },{
    id: 7,
    name: "A사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가"
  },
  {
    id: 8,
    name: "B사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가"
  },
  {
    id: 9,
    name: "C3사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가"
  },
  {
    id: 10,
    name: "A2사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가"
  },
  {
    id: 11,
    name: "A24사원",
    showButtons:true,
    showButtons:true,
    showButtons:true,
    showButtons:true,
    date: "21/07/13",    
    work: "개발",
    showButtons:true,
    openTime: "07:00",
    closeTime:"17:00",
    vacation: "무급휴가"
  }
];




export default data;