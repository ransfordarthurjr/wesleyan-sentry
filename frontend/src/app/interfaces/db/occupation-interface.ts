import { OccupationIndustryInterface } from './occupation-industry-interface';

export interface OccupationInterface {
    id: number;
    name: string;
    industry_id: number;
    members_occupations_industries?: OccupationIndustryInterface;
}
