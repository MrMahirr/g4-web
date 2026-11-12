import type { ReferenceItem } from "@/core/types";

export interface IReferenceRepository {
  getReferences(): ReferenceItem[];
}
