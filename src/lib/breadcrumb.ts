const BASE_URL = "https://webdude.hu";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`,
    })),
  };

  return schema;
}

export function buildBreadcrumbSchemaString(items: BreadcrumbItem[]): string {
  const schema = buildBreadcrumbSchema(items);
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
