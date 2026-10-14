import { JsonLd } from "./JsonLd";
import { pageGraph } from "@/lib/structured-data";

export function PageSeo({ path, name, parent }: { path: string; name: string; parent?: { path: string; name: string } }) {
  return <JsonLd data={pageGraph(path, name, parent)} />;
}
