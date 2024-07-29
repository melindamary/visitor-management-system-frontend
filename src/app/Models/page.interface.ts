export interface Page {
    id: number;
    name: string;
    url: string;
  }

  export interface PagesResponse {
    $values: Page[];
  }