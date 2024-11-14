export type Advertiser = {
  id: string;
  description: string;
};

export type Classification = {
  id: string;
  description: string;
};

export type Classifications = {
  classification: Classification;
  subclassification: Classification;
};

export type Location = {
  label: string;
  countryCode: string;
  seoHierarchy: {
      contextualName: string;
  }[];
};

export type SolMetadata = {
  searchRequestToken: string;
  token: string;
  jobId: string;
  section: string;
  sectionRank: number;
  jobAdType: string;
  tags: {
      [key: string]: string;
  };
};

export type WorkArrangement = {
  id: string;
  label: {
      text: string;
  };
};

export type WorkArrangements = {
  data: WorkArrangement[];
};


export type SeekJob = {
  advertiser: Advertiser;
  bulletPoints: string[];
  branding: {};
  classifications: Classifications[];
  companyProfileStructuredDataId: number;
  displayStyle: {
      search: string;
  };
  displayType: string;
  id: string;
  isFeatured: boolean;
  listingDate: string;
  listingDateDisplay: string;
  locations: Location[];
  roleId: string;
  salaryLabel: string;
  solMetadata: SolMetadata;
  teaser: string;
  title: string;
  tracking: string;
  workTypes: string[];
  workArrangements: WorkArrangements;
  company: string;
  listed: string;
  source: string;
  url: string;
};