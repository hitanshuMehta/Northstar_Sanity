import React, { useState, useMemo, useEffect, useCallback, useRef } from "react";
import type { ObjectInputProps } from "sanity";
import { Card, TextInput, Stack, Text, Badge, Flex } from "@sanity/ui";
import { SearchIcon } from "@sanity/icons/Search";

interface FlatSearchField {
  fieldName: string;
  fieldTitle: string;
  path: string;
  groupName?: string;
  groupTitle?: string;
  contentPreview?: string;
}

function extractStringValues(val: any): string {
  if (val === null || val === undefined) return "";
  if (typeof val === "string") return val;
  if (typeof val === "number" || typeof val === "boolean") return String(val);
  if (Array.isArray(val)) {
    return val.map((item) => extractStringValues(item)).join(" ");
  }
  if (typeof val === "object") {
    let result = "";
    for (const key of Object.keys(val)) {
      if (key.startsWith("_")) continue;
      result += " " + extractStringValues(val[key]);
    }
    return result;
  }
  return "";
}

function getNestedValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const parts = path.split(".");
  let curr = obj;
  for (const part of parts) {
    if (curr === null || curr === undefined) return undefined;
    curr = curr[part];
  }
  return curr;
}

export function TabSearchInput(props: ObjectInputProps) {
  const [query, setQuery] = useState("");
  const lastHrefRef = useRef("");
  const isUserSearchingRef = useRef(false);

  const groupsMap = useMemo(() => {
    const map = new Map<string, { name: string; title: string }>();
    if (props.schemaType.groups) {
      for (const g of props.schemaType.groups) {
        map.set(g.name, { name: g.name, title: g.title || g.name });
      }
    }
    return map;
  }, [props.schemaType.groups]);

  // Helper function to reset scroll position of the editor pane to the top when changing sections
  const resetScrollToTop = useCallback(() => {
    setTimeout(() => {
      const allElements = Array.from(document.querySelectorAll("*"));
      for (const el of allElements) {
        if (el.scrollTop > 0) {
          el.scrollTop = 0;
        }
      }
      window.scrollTo(0, 0);
    }, 50);
  }, []);

  // Recursively collect all searchable fields (names + actual content values)
  const allFlatFields = useMemo<FlatSearchField[]>(() => {
    const list: FlatSearchField[] = [];

    const traverse = (
      fields: any[],
      parentPath = "",
      parentGroup?: { name: string; title: string }
    ) => {
      if (!Array.isArray(fields)) return;

      for (const field of fields) {
        if (!field) continue;
        const fieldName = field.name;
        if (!fieldName) continue;

        const fieldTitle = field.type?.title || field.title || fieldName;
        const path = parentPath ? `${parentPath}.${fieldName}` : fieldName;

        let groupName: string | undefined;
        if (typeof field.group === "string") {
          groupName = field.group;
        } else if (Array.isArray(field.group) && field.group.length > 0) {
          groupName = field.group[0];
        }

        const currentGroup = groupName ? groupsMap.get(groupName) : parentGroup;

        // Retrieve actual document content value for this path
        const rawVal = getNestedValue(props.value, path);
        const contentStr = extractStringValues(rawVal).trim();

        list.push({
          fieldName,
          fieldTitle,
          path,
          groupName: currentGroup?.name,
          groupTitle: currentGroup?.title,
          contentPreview: contentStr.length > 0 ? contentStr : undefined,
        });

        // Traverse nested object fields
        if (field.type?.fields && Array.isArray(field.type.fields)) {
          traverse(field.type.fields, path, currentGroup);
        } else if (field.fields && Array.isArray(field.fields)) {
          traverse(field.fields, path, currentGroup);
        }
      }
    };

    traverse(props.schemaType.fields || []);
    return list;
  }, [props.schemaType.fields, groupsMap, props.value]);

  // Filter out parent container objects to leave ONLY leaf input fields (no duplicate parent rows)
  const leafFields = useMemo(() => {
    const leaves = allFlatFields.filter((item) => {
      return !allFlatFields.some(
        (other) => other.path !== item.path && other.path.startsWith(item.path + ".")
      );
    });

    const seenPaths = new Set<string>();
    return leaves.filter((item) => {
      if (seenPaths.has(item.path)) return false;
      seenPaths.add(item.path);
      return true;
    });
  }, [allFlatFields]);

  // Filter search results based on query (searches names, titles, paths, AND actual field content values)
  const searchResults = useMemo<FlatSearchField[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return leafFields.filter((item) => {
      const matchName = item.fieldName.toLowerCase().includes(q);
      const matchTitle = item.fieldTitle.toLowerCase().includes(q);
      const matchPath = item.path.toLowerCase().includes(q);
      const matchGroup = Boolean(item.groupTitle && item.groupTitle.toLowerCase().includes(q));
      const matchContent = Boolean(item.contentPreview && item.contentPreview.toLowerCase().includes(q));

      return matchName || matchTitle || matchPath || matchGroup || matchContent;
    });
  }, [query, leafFields]);

  // Helper function to click tab button by group name or title
  const selectTabByGroup = useCallback(
    (groupName?: string, groupTitle?: string) => {
      const tabs = Array.from(
        document.querySelectorAll('button[role="tab"], button[id*="tab"]')
      );

      let targetTab: HTMLElement | undefined;

      if (groupName || groupTitle) {
        targetTab = tabs.find((t) => {
          const text = (t.textContent || "").toLowerCase();
          const id = (t.id || "").toLowerCase();
          const dataId = (t.getAttribute("data-ui-id") || "").toLowerCase();

          return (
            (groupName && (id.includes(groupName.toLowerCase()) || dataId.includes(groupName.toLowerCase()))) ||
            (groupTitle && text.includes(groupTitle.toLowerCase())) ||
            (groupName && text.includes(groupName.toLowerCase()))
          );
        }) as HTMLElement | undefined;
      }

      if (targetTab) {
        targetTab.click();
      }
    },
    []
  );

  // Auto-sync tab selection ONLY when structure side panel navigation changes
  useEffect(() => {
    const syncGroupFromUrl = () => {
      const currentHref = window.location.href.toLowerCase();

      // Skip sync if URL hasn't changed or if user explicitly clicked a search result
      if (currentHref === lastHrefRef.current || isUserSearchingRef.current) {
        return;
      }
      lastHrefRef.current = currentHref;

      if (currentHref.includes("-all")) {
        const tabs = Array.from(
          document.querySelectorAll('button[role="tab"], button[id*="tab"]')
        );
        const allTab = tabs.find((t) =>
          (t.textContent || "").toLowerCase().includes("all fields")
        ) as HTMLElement | undefined;

        if (allTab && allTab.getAttribute("aria-selected") !== "true") {
          allTab.click();
          resetScrollToTop();
        }
        return;
      }

      if (props.schemaType.groups) {
        for (const group of props.schemaType.groups) {
          const gName = group.name.toLowerCase();
          const gTitle = (group.title || "").toLowerCase();

          if (currentHref.includes(`-${gName}`) || currentHref.includes(`group=${gName}`)) {
            const tabs = Array.from(
              document.querySelectorAll('button[role="tab"], button[id*="tab"]')
            );

            const targetTab = tabs.find((t) => {
              const text = (t.textContent || "").toLowerCase();
              return text.includes(gTitle) || text.includes(gName);
            }) as HTMLElement | undefined;

            if (targetTab && targetTab.getAttribute("aria-selected") !== "true") {
              targetTab.click();
              resetScrollToTop();
            }
            break;
          }
        }
      }
    };

    syncGroupFromUrl();
    const interval = setInterval(syncGroupFromUrl, 500);
    return () => clearInterval(interval);
  }, [props.schemaType.groups, resetScrollToTop]);

  // Handle clicking a search result item
  const handleSelectResult = (result: FlatSearchField) => {
    isUserSearchingRef.current = true;

    if (result.groupName || result.groupTitle) {
      selectTabByGroup(result.groupName, result.groupTitle);
    }

    setTimeout(() => {
      const fieldIdParts = result.path.split(".");
      const lastPart = fieldIdParts[fieldIdParts.length - 1];

      const targetEl = document.querySelector(
        `[id*="${lastPart}"], [data-field-name="${lastPart}"], [id*="${result.fieldName}"]`
      ) as HTMLElement;

      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
        const origOutline = targetEl.style.outline;
        targetEl.style.outline = "2px solid #C7FF3D";

        // Focus the input element inside target container so user can edit immediately
        const inputChild = targetEl.querySelector("input, textarea") as HTMLElement | null;
        if (inputChild) {
          inputChild.focus();
        } else if (typeof targetEl.focus === "function") {
          targetEl.focus();
        }

        setTimeout(() => {
          targetEl.style.outline = origOutline;
        }, 2500);
      }

      // Reset searching flag after navigation is settled
      setTimeout(() => {
        isUserSearchingRef.current = false;
        lastHrefRef.current = window.location.href.toLowerCase();
      }, 3000);
    }, 200);

    setQuery("");
  };

  return (
    <Stack space={3 as any}>
      {/* Hide native section tab bar from UI since side panel manages section selection */}
      <style>{`
        [role="tablist"],
        div[data-testid*="group-tab"],
        div[class*="TabList"],
        div[class*="tabList"] {
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          overflow: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>

      <Card
        padding={3}
        radius={2}
        border
        style={{ background: "var(--sanity-color-bg-base, #121316)" }}
      >
        <Stack space={2 as any}>
          <TextInput
            icon={SearchIcon}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            placeholder="🔍 Instant search any text content, headline or field name..."
          />

          {query.trim() && (
            <Card
              padding={2}
              radius={2}
              border
              style={{ maxHeight: "280px", overflowY: "auto", background: "var(--sanity-color-bg-base, #121316)" }}
            >
              <Stack space={2 as any}>
                {searchResults.length === 0 ? (
                  <Text size={1} muted>
                    No matching fields or content found for &quot;{query}&quot;
                  </Text>
                ) : (
                  searchResults.map((res, index) => (
                    <Card
                      key={`${res.path}-${index}`}
                      padding={3}
                      radius={2}
                      border
                      onClick={() => handleSelectResult(res)}
                      style={{
                        cursor: "pointer",
                        background: "rgba(255, 255, 255, 0.03)",
                      }}
                    >
                      <Flex align="flex-start" justify="space-between" gap={3}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: "13px", color: "var(--sanity-color-fg-base, #FFFFFF)", marginBottom: "4px", lineHeight: "1.4" }}>
                            {res.fieldTitle}{" "}
                            <span style={{ fontWeight: 400, opacity: 0.5, fontSize: "11px" }}>
                              ({res.path})
                            </span>
                          </div>
                          {res.contentPreview && (
                            <div style={{ fontSize: "12px", color: "var(--sanity-color-text-muted, #94A3B8)", lineHeight: "1.4", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                              &quot;{res.contentPreview}&quot;
                            </div>
                          )}
                        </div>
                        {res.groupTitle && (
                          <Badge tone="primary" style={{ flexShrink: 0, marginTop: "2px" }}>
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
