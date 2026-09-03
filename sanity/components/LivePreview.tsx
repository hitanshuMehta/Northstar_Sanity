import React from "react";
import { Card, Flex, Text, Button } from "@sanity/ui";
import { LaunchIcon } from "@sanity/icons/Launch";
import { RefreshIcon } from "@sanity/icons/Refresh";

interface LivePreviewProps {
  document?: {
    displayed?: {
      _type?: string;
      slug?: { current?: string };
    };
  };
  options?: {
    previewUrl?: string;
  };
}

export function LivePreview(props: LivePreviewProps) {
  const docType = props.document?.displayed?._type;
  const slug = props.document?.displayed?.slug?.current;

  let path = "/";
  if (docType === "aboutPage") path = "/about";
  else if (docType === "servicesPage") path = "/services";
  else if (docType === "workPage") path = "/work";
  else if (docType === "insightsPage") path = "/insights";
  else if (docType === "contactPage") path = "/contact";
  else if (docType === "caseStudy" && slug) path = `/work/${slug}`;
  else if (docType === "blogPost" && slug) path = `/insights/${slug}`;

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const previewUrl = props.options?.previewUrl || `${origin}${path}`;

  const [iframeKey, setIframeKey] = React.useState(0);

  return (
    <Flex direction="column" style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <Card padding={2} borderBottom tone="transparent">
        <Flex align="center" justify="space-between">
          <Text size={1} weight="medium">
            Live Preview: <code style={{ color: "#C7FF3D" }}>{path}</code>
          </Text>
          <Flex gap={2}>
            <Button
              icon={RefreshIcon}
              text="Reload"
              fontSize={1}
              padding={2}
              mode="ghost"
              onClick={() => setIframeKey((prev) => prev + 1)}
            />
            <Button
              icon={LaunchIcon}
              text="Open Site"
              fontSize={1}
              padding={2}
              mode="ghost"
              onClick={() => window.open(previewUrl, "_blank")}
            />
          </Flex>
        </Flex>
      </Card>
      <iframe
        key={iframeKey}
        src={previewUrl}
        style={{ width: "100%", height: "100%", border: "none", background: "#0B0C0E" }}
        title="Live Web Preview"
      />
    </Flex>
  );
}
