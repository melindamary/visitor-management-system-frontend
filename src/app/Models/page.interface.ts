export interface Page {
    pageId: number;
    pageName: string;
    pageUrl: string;
  }

  export interface PagesResponse {
    $values: Page[];
  }