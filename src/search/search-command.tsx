"use client"

import * as React from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

import { useState } from "react"




export function SearchCommand() {
  const [open, setOpen] = React.useState(false)
  const { results, search } = useSearchResults()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="w-9 px-0"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search articles..." 
          onValueChange={search}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {results.length > 0 && (
            <CommandGroup heading="Articles">
              {results.map((article) => (
                <CommandItem
                  key={article.title}
                  className="flex items-center gap-2 p-2"
                >
                  <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{article.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {article.category} • {article.date}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

// Combine all articles for search
const allArticles = [...featuredArticles, ...latestNews]

export function useSearchResults() {
  const [results, setResults] = useState(allArticles)

  const search = (query: string) => {
    if (!query) {
      setResults([])
      return
    }

    const searchResults = allArticles.filter((article) => {
      const searchContent = [
        article.title,
        article.category,
        article.author,
        article.excerpt,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()

      return searchContent.includes(query.toLowerCase())
    })

    setResults(searchResults)
  }

  return { results, search }
}