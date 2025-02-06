import { WebsiteType } from "./website";

export interface StepType {
    id: number,
    name: string,
    order: number,
    description: string | null,
    funnel_id: number,
    website_id: number,
    last_modified_by: string | null,
    created_at: string | null,
    updated_at: string | null,
    deleted_at: string | null,
    created_by: Number | null,
    website: WebsiteType

}

export interface FunnelType {
    created_at: string,
    created_by: number,
    deleted_at: string | null,
    description: string | null,
    id: number,
    last_modified_by: number | null,
    name: string,
    slug: string,
    steps: Array<StepType>,
    thumbnail: string | null,
    updated_at: string | null,
    user_id: number,
    workspace_id: number,
}

export interface FunnelSliceState {
    loading: boolean,
    buttonLoading: boolean,
    funnels: Array<FunnelType>,
    funnelId: number,
    singleFunnel: FunnelType | null,
    createModalOpen: boolean,
    isEdit?: boolean,
    editObj?: any,
    websites: any,
    products: any,
    // websites: Array<WebsiteType>,
}

export interface WebsiteSliceState {
    loading: boolean,
    buttonLoading: boolean,
    singleWebsite?: any
    singleWebsiteId?: number | string
}

export interface WebPlannerSliceState {
    loading: boolean,
    buttonLoading: boolean,
    generatedSections?: any
    plannerSections?: any
    plannerPages?: any
    activeSectionId?: any
    currentPage?: any
}