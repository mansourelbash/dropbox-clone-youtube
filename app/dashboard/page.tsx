import { auth } from "@clerk/nextjs"
import DropzoneComponent from "@/app/components/DropzoneComponent";
const Dashboard = () => {
  const {userId} = auth();
  return (
    <div>
      {/* Dashboard (user is {userId}) */}
    <DropzoneComponent />
    </div>
    
  )
}

export default Dashboard