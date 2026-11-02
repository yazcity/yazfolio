import { renderOg } from "@/lib/og";

// Site-wide 1200×630 social preview, exported as /og.png.
export const dynamic = "force-static";

export function GET() {
  return renderOg();
}
