import type { ReferenceItem } from "@/core/types";

export interface IReferenceCatalog {
  getReferences(): ReferenceItem[];
  getHomeReferences(): ReferenceItem[];
}
