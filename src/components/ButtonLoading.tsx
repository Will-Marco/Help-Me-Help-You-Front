// components/ButtonLoading.tsx
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

type Props = {
  text: string
  loading?: boolean
  disabled?: boolean
}

export function ButtonLoading({ text, loading = false, disabled = false }: Props) {
  return (
    <Button type="submit" disabled={disabled || loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  )
}
