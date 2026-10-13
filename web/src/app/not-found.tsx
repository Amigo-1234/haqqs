import { ButtonLink } from "@/components/ui/primitives";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="Page not found"
      title="This page could not be found"
      intro="The page may have moved during the website’s redesign. Try the home page or the library."
    >
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the home page</ButtonLink>
        <ButtonLink href="/library" variant="outline-light">
          Islamic library
        </ButtonLink>
      </div>
    </PageHeader>
  );
}
