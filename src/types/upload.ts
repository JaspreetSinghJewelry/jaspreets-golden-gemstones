
export interface ProductImageUpload {
  file: File | null;
  description: string;
  price: string;
}

export interface UploadResult {
  successCount: number;
  errorCount: number;
  errors?: string[];
}
