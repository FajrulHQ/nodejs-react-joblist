import { Button } from "antd"
import { cn } from "../routes/utils"

export default function Header({ fixed }: {
  fixed?: boolean
}) {
  const isLogged = localStorage.getItem('token')
  return (
    <div className={cn("h-16 bg-primary w-screen flex items-center justify-between px-4 text-2xl text-white", fixed && "fixed top-0")}>
      <div>
        <b>Github</b> Jobs
      </div>
      {isLogged && (
        <Button type="dashed" onClick={() => { localStorage.removeItem('token'); window.location.reload() }}>Logout</Button>
      )}
    </div>
  )
}