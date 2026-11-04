export type LegalDocumentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string };

export type LegalDocumentSection = {
  id: string;
  title: string;
  blocks: LegalDocumentBlock[];
};
