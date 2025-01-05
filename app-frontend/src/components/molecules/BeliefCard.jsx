import React from "react";
import "./BeliefCard.css";

function BeliefCard({ data }) {
  console.log(data);
  return (
    // <div className="flex justify-center rounded-lg items-start shadow-xl px-3 py-2 flex-wrap  w-4/5 lg:w-1/5   min-h-[250px] sm:transform sm:transition-transform sm:duration-300 sm:hover:scale-110 cursor-pointer">
    //   {/* <div className="w-full flex justify-center flex-wrap">
    //     <img src={data.image} alt="" className="w-20 h-20 object-cover" />
    //     <p className="w-full text-center text-2xl font-semibold py-2  text-blue-500">
    //       {data.title}
    //     </p>
    //   </div>
    //   <p className="text-center">{data.statement}</p> */}
    //   {/* <div class="one-div"></div> */}
    //   {/* <div class="card"> */}
    //   <img src={data.image} alt="" className="w-20 h-20 object-cover" />
    //   <p className="w-full text-center text-2xl font-semibold py-2  text-blue-500">
    //     {data.title}
    //   </p>
    //   <p className="text-center">{data.statement}</p>
    // </div>
    // </div>
    /* From Uiverse.io by eslam-hany */
    <div class="book">
      <p className="ml-9 mr-2 font-semibold text-base ">{data.statement}</p>
      <div class="cover">
        <img src={data.image} alt="" className="w-20 h-20 object-cover" />
        <p className="py-2 border-b-2 border-blue-500">{data.title}</p>
      </div>
    </div>
  );
}

export default BeliefCard;
// import React from "react";

// function BeliefCard({ data }) {
//   return (
//     <div className="flex justify-center rounded-lg items-start shadow-xl px-3 py-2 flex-wrap w-4/5 lg:w-1/5 min-h-[250px] sm:transform sm:transition-transform sm:duration-300 sm:hover:scale-110 cursor-pointer">
//       <div className="relative h-[250px] w-[200px] bg-[rgb(15,15,15)] transform-style-3d animate-rotation rounded-[20px] shadow-[0_0_50px_0px_white,inset_0_0_50px_0px_white] transition-all duration-1000 hover:h-[300px] hover:w-[250px] hover:shadow-[0_0_5px_0px_black,inset_-3px_-3px_10px_3px_rgb(25,25,25),inset_3px_3px_20px_3px_black] hover:cursor-pointer">
//         {/* Top Section with Image */}
//         <div className="absolute inset-0 flex flex-col justify-center items-center">
//           <img
//             src={data.image}
//             alt={data.title}
//             className="w-20 h-20 object-cover rounded-full"
//           />
//           <p className="text-[30px] text-white font-bold mt-2">{data.title}</p>
//         </div>

//         {/* Overlay Effect */}
//         <div className="absolute top-[-20px] left-[40px] flex h-[270px] w-[220px] items-center justify-center bg-[rgb(25,25,25)] text-[25px] text-white letter-spacing-[7px] rounded-[20px] transform translate-y-[50px] translate-z-[50px] transition-transform duration-500 blur-none shadow-[0_0_5px_0px_black,-3px_-3px_10px_3px_rgb(25,25,25),inset_0px_0px_40px_-20px_black] hover:transform-[translateZ(-50px)_translateY(50px)] hover:text-[10px] hover:h-[300px] hover:w-[250px] hover:shadow-[0_0_5px_0px_black,-3px_-3px_10px_3px_rgb(25,25,25),inset_0px_0px_40px_-20px]">
//           <p className="text-center">{data.statement}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BeliefCard;
