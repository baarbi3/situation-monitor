"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
}

const AccountInput = (props: TagInputProps) => {
  const {value, onChange, placeholder="Type and press space…"} = props;
  const [input, setInput] = React.useState("")

  function commitTag(raw: string) {
    const tag = raw.trim()
    if (!tag) return
    if (value.includes(tag)) return

    onChange([...value, tag])
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " ") {
      e.preventDefault()
      commitTag(input)
      setInput("")
    }

    if (e.key === "Backspace" && input === "" && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  function removeTag(tag: string) {
    onChange(value.filter(t => t !== tag))
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md border px-3 py-2">
      {value.map(tag => (
        <Badge
          key={tag}
          variant="secondary"
          className="flex items-center gap-1 px-2 py-1"
        >
          {tag}
          <button
            onClick={() => removeTag(tag)}
            className="ml-1 rounded-sm opacity-60 hover:opacity-100"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}

      <Input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-7 flex-1 border-none p-0 focus-visible:ring-0"
      />
    </div>
  )
}

export default AccountInput;