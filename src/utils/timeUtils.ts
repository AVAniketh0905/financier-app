export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const years = [2021, 2022, 2023];

// <Select>
//           <SelectTrigger className='border-primary sm:w-[180px]'>
//             <SelectValue placeholder='Year' />
//           </SelectTrigger>
//           <SelectContent>
//             {years.map((year, index) => (
//               <SelectItem key={index} value={`${year}`}>
//                 {year}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//         <Select>
//           <SelectTrigger className='border-primary sm:w-[180px]'>
//             <SelectValue placeholder='Month' />
//           </SelectTrigger>
//           <SelectContent>
//             {months.map((month, index) => (
//               <SelectItem key={index} value={`${index + 1}`}>
//                 {month}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>

// mobile
// <Select>
// <SelectTrigger className='border-primary sm:w-[180px]'>
// <SelectValue placeholder='Year' />
// </SelectTrigger>
// <SelectContent>
// {years.map((year, index) => (
//   <SelectItem key={index} value={`${year}`}>
//     {year}
//   </SelectItem>
// ))}
// </SelectContent>
// </Select>
// <Select>
// <SelectTrigger className='border-primary sm:w-[180px]'>
// <SelectValue placeholder='Month' />
// </SelectTrigger>
// <SelectContent>
// {months.map((month, index) => (
//   <SelectItem key={index} value={`${index + 1}`}>
//     {month}
//   </SelectItem>
// ))}
// </SelectContent>
// </Select>
// <Select>
// <SelectTrigger className='border-primary sm:w-[180px]'>
// <SelectValue placeholder='Day' />
// </SelectTrigger>
// <SelectContent>
// {days.map((day, index) => (
//   <SelectItem key={index} value={`${index + 1}`}>
//     {day}
//   </SelectItem>
// ))}
// </SelectContent>
// </Select>
