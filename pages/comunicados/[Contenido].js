import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Contenido = () => {
  const { query } = useRouter();
  const dataContent = JSON.parse(query.data);
  const example = [dataContent];

  const html = dataContent.html.content[0].content[0].value;

  console.log(html);

  return (
    <div
      className="htmlContentComunications w-full flex justify-center"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
    // <div className="grid">
    //   <div className="object-contain flex justify-center items-center relative">
    //     <Image
    //       src={dataContent.image}
    //       width={1170}
    //       height={316}
    //       priority
    //       className="rounded-md"
    //     />
    //     <div className="absolute bg-gray-500/50 w-auto h-auto">
    //       <h1 className="text-white font-bold sm:!text-4xl text-xl">
    //         {dataContent.title}
    //       </h1>
    //     </div>
    //   </div>
    //   <div className="pt-8 px-28">
    //     <div className="grid justify-items-start pb-4 text-center">
    //       <h2 className="font-bold text-xl">{dataContent.subtitle}</h2>
    //     </div>
    //     <div className="grid grid-cols-5 gap-10">
    //       <div className="grid col-span-1 !items-center !justify-items-center">
    //         {dataContent.leftImage !== "" && (
    //           <Image
    //             src={dataContent.leftImage}
    //             width={248}
    //             height={256}
    //             priority
    //             className="rounded-md"
    //           />
    //         )}
    //       </div>
    //       {example.map((item, index) => (
    //         <div className="col-span-3" key={index}>
    //           {item.paragraph.map((paragraphItem, paragraphIndex) => (
    //             <div key={paragraphIndex}>
    //               <h3 className="font-bold pt-4 pb-4">
    //                 {paragraphItem.paragraph}
    //               </h3>
    //               {paragraphItem.paragraphList &&
    //                 paragraphItem.paragraphList.length > 0 && (
    //                   <ul>
    //                     {paragraphItem.paragraphList.map(
    //                       (listItem, listIndex) => (
    //                         <li className="pb-3" key={listIndex}>
    //                           {listItem}
    //                         </li>
    //                       )
    //                     )}
    //                   </ul>
    //                 )}
    //             </div>
    //           ))}
    //           <div className="grid justify-items-center py-10">
    //             <h3 className="font-bold text-center">
    //               {dataContent.articleEnd}
    //             </h3>
    //           </div>
    //         </div>
    //       ))}
    //       <div className="grid col-span-1 !items-center !justify-items-center ">
    //         {dataContent.rigthImage !== "" && (
    //           <Image
    //             src={dataContent.rightImage}
    //             width={229}
    //             height={247}
    //             priority
    //             className="rounded-md"
    //           />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Contenido;
