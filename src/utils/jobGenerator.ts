
import { CONTRACT_COMPANIES, FULLTIME_COMPANIES } from '../data/companies';

interface Job {
    id: string;
    title: string;
    company: string;
    type: 'CONTRACT' | 'FULL_TIME';
    location: string;
    postedAt: string;
    url: string;
    source: 'OFFICIAL' | 'AGGREGATOR'; // We will enforce OFFICIAL
    status: 'ACTIVE' | 'CLOSED';
}

const TITLES = [
    "Senior Software Engineer", "Full Stack Developer", "Frontend Architect",
    "DevOps Engineer", "Cloud Solutions Architect", "Backend Developer",
    "Data Engineer", "Machine Learning Engineer", "Site Reliability Engineer",
    "Product Manager", "UX/UI Designer", "Security Analyst", "System Administrator",
    "Technical Program Manager", "QA Engineer"
];

const LOCATIONS = [
    "Remote", "San Francisco, CA", "New York, NY", "Austin, TX", "Seattle, WA",
    "Boston, MA", "Chicago, IL", "Denver, CO", "Atlanta, GA", "Dallas, TX"
];

export const generateMockJob = (dateOverride?: Date): Job => {
    const isContract = Math.random() < 0.3; // 30% chance for contract based on company lists size roughly
    const companyList = isContract ? CONTRACT_COMPANIES : FULLTIME_COMPANIES;
    const company = companyList[Math.floor(Math.random() * companyList.length)];
    const title = TITLES[Math.floor(Math.random() * TITLES.length)];
    const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

    // Simulate "official" URL
    const sanitizedCompany = company.toLowerCase().replace(/[^a-z0-9]/g, '');
    const url = `https://careers.${sanitizedCompany}.com/jobs/${Math.floor(Math.random() * 10000)}`;

    return {
        id: crypto.randomUUID(),
        title,
        company,
        type: isContract ? 'CONTRACT' : 'FULL_TIME',
        location,
        postedAt: (dateOverride || new Date()).toISOString(),
        url,
        source: 'OFFICIAL',
        status: 'ACTIVE'
    };
};
