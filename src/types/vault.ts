export interface VaultFile {
  id: string;
  clientId: string;
  name: string;
  url: string;
  size: number;
  type: string;
  category: "contract" | "audit" | "design" | "other";
  uploadedBy: "client" | "admin";
  uploadedByName: string;
  storagePath: string;
  createdAt: string;
}
