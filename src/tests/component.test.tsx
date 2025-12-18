
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JobCard } from '../components/JobCard';
import { generateMockJob } from '../utils/jobGenerator';

describe('JobCard Component', () => {
    it('renders job details correctly', () => {
        const job = generateMockJob();
        job.company = "TestCorp";
        job.title = "Chief Tester";

        render(<JobCard job={job} />);

        expect(screen.getByText("TestCorp")).toBeInTheDocument();
        expect(screen.getByText("Chief Tester")).toBeInTheDocument();
        expect(screen.getByText(/Apply Official/i)).toBeInTheDocument();
    });

    it('displays correct badge for Contract', () => {
        const job = generateMockJob();
        job.type = "CONTRACT";
        render(<JobCard job={job} />);
        expect(screen.getByText("Contract")).toBeInTheDocument();
    });
});
