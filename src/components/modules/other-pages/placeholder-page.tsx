import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="flex flex-1 items-center py-20 sm:py-28">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-medium tracking-wide text-accent">HelpNova</p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          This page is under construction.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
        <p className="mt-6 text-xs text-muted">
          Looking for something else?{" "}
          <Link href="/contact" className="text-accent underline-offset-2 hover:underline">
            Contact Us
          </Link>
        </p>
      </Container>
    </section>
  );
}
