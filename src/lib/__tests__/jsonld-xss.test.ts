import { serializeJsonLd } from "../structuredData";

describe("serializeJsonLd XSS hardening", () => {
  it("escapes every raw '<' character", () => {
    const output = serializeJsonLd({
      "@type": "Thing",
      name: "</script><script>alert(1)</script>",
      nested: { a: ["<", "<b>", "x < y"] },
    });
    expect(output).not.toContain("<");
    expect(output).toContain("\\u003c/script>");
  });

  it("stays valid JSON that round-trips to the original data", () => {
    const input = { name: "<script>", list: ["</script>", "<"] };
    expect(JSON.parse(serializeJsonLd(input))).toEqual(input);
  });
});
