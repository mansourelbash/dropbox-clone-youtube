import { auth } from "@clerk/nextjs"
import DropzoneComponent from "@/app/components/DropzoneComponent";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";
async function Dashboard() {
  const {userId} = auth();
  const docResults = await getDocs(collection(db, "users",userId!,"files"));
  const sketltonFiles: FileType[] = docResults.docs.map(doc=>({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds + 1000) || undefined,
    fullname: doc.data().fullname,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size
  }))
  console.log(sketltonFiles);
  return (
    <div className="border-t">
      {/* Dashboard (user is {userId}) */}
    <DropzoneComponent />
    <section className="container space-y-5">
      <h2>All Files</h2>
     
      <div> {/* TableWrapper */}
         <TableWrapper sketltonFiles={sketltonFiles} />
      </div>
    </section>
    </div>
    
  )
}

export default Dashboard