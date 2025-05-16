import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Keyword } from "@/types/projects";
import { Badge } from "@/components/ui/badge"

interface KeywordsInfoProps {
  keywords: Keyword[];
  className?: string;
}

export default function KeywordsInfo({ keywords, className }: KeywordsInfoProps) {
  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Palabras Clave</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {keywords.map((key, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800"
            >
              {key.keyword}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}