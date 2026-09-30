import { Briefcase, FileSignature, House, Landmark, Scale, Users } from "lucide-react"

const map = {
  scale: Scale,
  briefcase: Briefcase,
  landmark: Landmark,
  users: Users,
  home: House,
  file: FileSignature,
}

export default function AreaIcon({ name, size = 20 }) {
  const Icon = map[name] || Scale
  return <Icon size={size} strokeWidth={1.5} />
}
