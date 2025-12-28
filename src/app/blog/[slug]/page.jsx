import dateFormat from "@/utils/dateFormat";
import Image from "next/image";

export default function SingleBlog(){
    return(
        <section>
            <div>
               <Image src = "/thumbnails/dreams.png" width={500} height={250} />
               <p className="text-gray-400 text-xs">{dateFormat(new Date())}</p>
            </div>
            <div>
                <p>Category:</p>
                
            </div>
        </section>

    )
}