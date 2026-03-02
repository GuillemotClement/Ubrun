import { Link } from "@tanstack/react-router"
import type { ToolData } from "./ToolsDisplay"

type CardToolProps = {
  data: ToolData
}
const CardTool = ({ data }: CardToolProps) => {
  return (
    <div className="card w-96 bg-base-100 card-xs shadow-sm h-50 py-3">
      <div className="card-body flex flex-col items-center justify-center">
        <h2 className="card-title mx-auto text-xl">{data.title}</h2>
        <p className="flex-1">{data.description}</p>
        <div className="justify-center card-actions">
          <Link className="btn btn-primary" to={data.link}>Accéder</Link>
        </div>
      </div>
    </div>
  )
}

export default CardTool