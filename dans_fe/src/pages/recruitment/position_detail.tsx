import { useParams } from "react-router-dom";
import Header from "../header";

export default function RecruitmentPositionDetailPage() {
  const { id } = useParams()
  return (
    <div className="bg-gray-100 w-screen h-screen">
      <Header />
    </div>
  )
}