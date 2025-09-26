import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
   const handle = (await params).handle
    const client = await clientPromise;
    const db = client.db("bittree")
    const collection = db.collection("links")

     // If the handle is already claimed, you cannot create the bittree
    const item = await collection.findOne({handle: handle})
     if(!item){
        return notFound()
    }

    // const item2 = {
    //     "_id": {
    //         "$oid": "68d3b72a323621a973c9f1dc"
    //     },
    //     "links": [
    //         {
    //             "link": "https://facebook.com/jashan064",
    //             "linktext": "Fb"
    //         },
    //         {
    //             "link": "https://www.google.com",
    //             "linktext": "website"
    //         },
    //         {
    //             "link": "https://www.youtube.com",
    //             "linktext": "youtube"
    //         }
    //     ],
    //     "handle": "jashan",
    //     "pic": "https://avatars.githubusercontent.com/u/226454470?s=400&u=bdf9f4472f7f72bbe613e0ac7e703d1906c8f7eb&v=4"
    // }

     return (
    <div className="flex min-h-screen bg-purple-400 justify-center items-start pt-10 px-4 md:px-8 lg:px-16">
      {item && (
        <div className="photo flex flex-col items-center gap-4 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          
          {/* Profile Image */}
          <img
            className="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
            src={item.pic}
            alt={`@${item.handle}`}
          />

          {/* Handle */}
          <span className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">@{item.handle}</span>

          {/* Description */}
          <span className="desc text-center text-sm sm:text-base md:text-lg lg:text-xl px-4">
            {item.desc}
          </span>

          {/* Links */}
          <div className="links flex flex-col w-full px-2 sm:px-4">
            {item.links.map((linkItem, index) => (
              <Link key={index} target="_blank" href={linkItem.link}>
                <div className="bg-purple-100 py-3 sm:py-4 px-2 sm:px-4 min-w-full flex justify-center rounded-md my-2 sm:my-3 text-sm sm:text-base md:text-lg lg:text-xl shadow-md hover:bg-purple-200 transition">
                  {linkItem.linktext}
                </div>
              </Link>
            ))}
          </div>

        </div>
      )}
    </div>
  )
}