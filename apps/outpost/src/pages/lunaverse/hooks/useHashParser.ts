import { useLocation } from "react-router-dom"
import { parseINT } from "../utils"

export function useHashParser() {
  const location = useLocation()
  const hashes = location.hash.split("#")
  const hash = hashes[1]

  const messageId = parseINT(hashes.length > 2 ? hashes[2] : "-1")
  return { hash, messageId }
}
