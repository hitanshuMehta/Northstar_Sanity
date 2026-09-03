import React, { useState, useMemo } from "react";
import type { ObjectInputProps } from "sanity";
import { Card, TextInput, Stack, Text, Badge, Flex } from "@sanity/ui";
import { SearchIcon } from "@sanity/icons/Search";

interface SearchResult {
  fieldName: string;
  fieldTitle: string;
  groupName?: string;
  groupTitle?: string;
}

export function TabSearchInput(props: ObjectInputProps) {
  const [query, setQuery] = useState("");

  const groupsMap = useMemo(() => {
    const map = new Map<string, { name: string; title: string }>();
    if (props.schemaType.groups) {
      for (const g of props.schemaType.groups) {
        map.set(g.name, { name: g.name, title: g.title || g.name });
      }
    }
    return map;
  }, [props.schemaType.groups]);

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    for (const fieldMember of props.schemaType.fields) {
      const fieldTitle = fieldMember.type?.title || fieldMember.name;
      const fieldName = fieldMember.name;
      const groupName = typeof fieldMember.group === "string" ? fieldMember.group : Array.isArray(fieldMember.group) ? fieldMember.group[0] : undefined;
      const groupTitle = groupName ? groupsMap.get(groupName)?.title : undefined;

      if (
        fieldName.toLowerCase().includes(q) ||
        fieldTitle.toLowerCase().includes(q) ||
        (groupTitle && groupTitle.toLowerCase().includes(q))
      ) {
        results.push({ fieldName, fieldTitle, groupName, groupTitle });
      }
    }

    return results;
  }, [query, props.schemaType.fields, groupsMap]);

  const handleSelectResult = (result: SearchResult) => {
    if (result.groupName) {
      const url = new URL(window.location.href);
      url.searchParams.set("group", result.groupName);
      window.history.pushState({}, "", url.toString());

      // Trigger tab click event if tab element exists
      const tabEl = document.querySelector(`[data-ui-id*="tab-${result.groupName}"], button[id*="${result.groupName}"]`) as HTMLElement;
      if (tabEl) tabEl.click();
    }

    setTimeout(() => {
      const targetEl = document.querySelector(`[id*="${result.fieldName}"], [data-field-name="${result.fieldName}"]`) as HTMLElement;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        const origOutline = targetEl.style.outline;
        targetEl.style.outline = "2px solid #C7FF3D";
        setTimeout(() => {
          targetEl.style.outline = origOutline;
        }, 2500);
      }
    }, 200);

    setQuery("");
  };

  return (
    <Stack space={3 as any}>
      <Card padding={3} radius={2} border style={{ background: "var(--sanity-color-bg-base, #121316)" }}>
        <Stack space={2 as any}>
          <TextInput
            icon={SearchIcon}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder="🔍 Instant search all fields across section tabs..."
          />

          {query.trim() && (
            <Card padding={2} radius={2} border style={{ maxHeight: "220px", overflowY: "auto" }}>
              <Stack space={1 as any}>
                {searchResults.length === 0 ? (
                  <Text size={1} muted>No matching fields found for &quot;{query}&quot;</Text>
                ) : (
                  searchResults.map((res) => (
                    <Card
                      key={res.fieldName}
                      padding={2}
                      radius={2}
                      onClick={() => handleSelectResult(res)}
                      style={{ cursor: "pointer" }}
                    >
                      <Flex align="center" justify="space-between">
                        <Text size={1} weight="semibold">
                          {res.fieldTitle} <Text size={1} muted>({res.fieldName})</Text>
                        </Text>
                        {res.groupTitle && (
                          <Badge tone="primary" fontSize={0 as any}>
                            {res.groupTitle}
                          </Badge>
                        )}
                      </Flex>
                    </Card>
                  ))
                )}
              </Stack>
            </Card>
          )}
        </Stack>
      </Card>

      {props.renderDefault(props)}
    </Stack>
  );
}
