import { createFileRoute } from "@tanstack/react-router";
import { Instrument } from "@/components/instrument/shell";

export const Route = createFileRoute("/")({ component: Instrument });
