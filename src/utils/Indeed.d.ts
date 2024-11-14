export interface CompanyBrandingAttributes {
  shownForBrandedJobPackage: boolean;
}

export interface ExtractedSalary {
  max: number;
  min: number;
  type: string;
}

export interface HighQualityMarketplace {
  match: boolean;
}

export interface HighVolumeHiringModel {
  highVolumeHiring: boolean;
}

export interface HiringMultipleCandidatesModel {
  hiresNeeded: string;
  hiresNeededExact: string;
}

export interface JobTagRequirement {
  attrId: string;
  attrSuid: string;
  label: string;
  qstLabel: string;
  qstType: string;
  strictness: string;
  value: string;
}

export interface JobCardRequirementsModel {
  additionalRequirementsCount: number;
  jobOnlyRequirements: unknown[]; // Or specify a type if known
  jobTagRequirements: JobTagRequirement[];
  requirements: string[];
  requirementsHeaderShown: boolean;
  screenerQuestionRequirements: JobTagRequirement[];
}

export interface MoreLinks {
  companyName: string;
  companyText: string;
  locationName: string;
  resultNumber: number;
  salaryLocationName: string;
  salaryNoFollowLink: boolean;
  salaryUrl: string;
  salaryUrlParams: string;
  shortLocationName: string;
  showAcmeLink: boolean;
  showAcmeQnaLink: boolean;
  showViewAllCompanyAndLocationLinks: boolean;
  showViewAllCompanyLink: boolean;
  showViewAllLocationLink: boolean;
  showViewAllNormalizedTitleLink: boolean;
  viewAllCompanyLinkText: string;
  viewAllCompanyUrl: string;
  viewAllLocationUrl: string;
  viewAllNormalizedTitleLink: string;
  viewAllNormalizedTitleLinkText: string;
  visible: boolean;
}

export interface MouseDownHandlerOption {
  adId: string;
  advn: string;
  extractTrackingUrls: unknown[]; // Or specify a type if known
  from: string;
  jobKey: string;
  link: string;
  tk: string;
}

export interface PreciseLocationModel {
  obfuscateLocation: boolean;
  overrideJCMPreciseLocationModel: boolean;
}

export interface RankingScoresModel {
  bid: number;
  eApply: number;
  eAttainability: number;
  eQualified: number;
}

export interface RecommendationReasonModel {
  reason: null;
}

export interface SalarySnippet {
  currency: string;
  salaryTextFormatted: boolean;
  source: string;
  text: string;
}

export interface TaxonomyAttribute {
  attributes: { label: string; suid: string }[];
  label: string;
}

export interface Tier {
  matchedPreferences: {
    longMatchedPreferences: unknown[]; // Or specify a type if known
    stringMatchedPreferences: unknown[]; // Or specify a type if known
  };
  type: string;
}


export interface IndeedJob {
  appliedOrGreater: boolean;
  blobKey: string;
  clickLoggingUrl: string;
  company: string;
  companyBrandingAttributes: CompanyBrandingAttributes;
  companyIdEncrypted: string;
  companyRating: number;
  companyReviewCount: number;
  createDate: number;
  d2iEnabled: boolean;
  displayTitle: string;
  dradisJob: boolean;
  employerAssistEnabled: boolean;
  employerResponsive: boolean;
  encryptedFccompanyId: string;
  encryptedResultData: string;
  enhancedAttributesModel: Record<string, unknown>; // Or specify a type if known
  enticers: unknown[]; // Or specify a type if known
  expired: boolean;
  extractTrackingUrls: string;
  extractedSalary: ExtractedSalary;
  fccompanyId: number;
  featuredCompanyAttributes: Record<string, unknown>; // Or specify a type if known
  featuredEmployer: boolean;
  featuredEmployerCandidate: boolean;
  feedId: number;
  formattedLocation: string;
  formattedRelativeTime: string;
  gatedVjp: boolean;
  hideMetaData: boolean;
  highQualityMarketplace: HighQualityMarketplace;
  highVolumeHiringModel: HighVolumeHiringModel;
  hiringEventJob: boolean;
  hiringMultipleCandidatesModel: HiringMultipleCandidatesModel;
  homepageJobFeedSectionId: string;
  indeedApplyEnabled: boolean;
  indeedApplyResumeType: string;
  indeedApplyable: boolean;
  isJobVisited: boolean;
  isMobileThirdPartyApplyable: boolean;
  isNoResumeJob: boolean;
  isSubsidiaryJob: boolean;
  jobCardRequirementsModel: JobCardRequirementsModel;
  jobLocationCity: string;
  jobLocationState: string;
  jobTypes: string[];
  jobkey: string;
  jsiEnabled: boolean;
  link: string;
  locationCount: number;
  minimumCount: number;
  mobtk: string;
  moreLinks: MoreLinks;
  moreLocUrl: string;
  mouseDownHandlerOption: MouseDownHandlerOption;
  newJob: boolean;
  normTitle: string;
  openInterviewsInterviewsOnTheSpot: boolean;
  openInterviewsJob: boolean;
  openInterviewsOffersOnTheSpot: boolean;
  openInterviewsPhoneJob: boolean;
  organicApplyStartCount: number;
  organicBlob: string;
  overrideIndeedApplyText: boolean;
  preciseLocationModel: PreciseLocationModel;
  pubDate: number;
  rankingScoresModel: RankingScoresModel;
  recommendationReasonModel: RecommendationReasonModel;
  redirectToThirdPartySite: boolean;
  remoteLocation: boolean;
  resultBeforeExpansion: boolean;
  resumeMatch: boolean;
  salarySnippet: SalarySnippet;
  saved: boolean;
  savedApplication: boolean;
  screenerQuestionsURL: string;
  searchUID: string;
  showAttainabilityBadge: boolean;
  showCommutePromo: boolean;
  showEarlyApply: boolean;
  showJobType: boolean;
  showRelativeDate: boolean;
  showSponsoredLabel: boolean;
  showStrongerAppliedLabel: boolean;
  smartFillEnabled: boolean;
  smbD2iEnabled: boolean;
  snippet: string;
  sourceId: number;
  sponsored: boolean;
  taxoAttributes: unknown[]; // Or specify a type if known
  taxoAttributesDisplayLimit: number;
  taxoLogAttributes: unknown[]; // Or specify a type if known
  taxonomyAttributes: TaxonomyAttribute[];
  thirdPartyApplyUrl: string;
  tier: Tier;
  title: string;
  translatedAttributes: unknown[]; // Or specify a type if known
  translatedCmiJobTags: string[];
  truncatedCompany: string;
  urgentlyHiring: boolean;
  viewJobLink: string;
  vjFeaturedEmployerCandidate: boolean;
  id: string;
  workType: string;
  location: string;
  listed: string;
  source: string;
  url: string;
}