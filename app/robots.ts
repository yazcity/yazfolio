import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // OpenAI crawlers: ChatGPT search results, training, and live browsing from ChatGPT.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      // Anthropic crawlers: Claude search results, training, and live fetches from Claude.
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

export const dynamic = "force-static";
