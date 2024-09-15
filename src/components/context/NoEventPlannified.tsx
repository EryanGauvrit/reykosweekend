import Discord from '@/icons/Discord';
import Instagram from '@/icons/Instagram';
import Twitch from '@/icons/Twitch';
import Link from 'next/link';
import { Card } from '../ui/card';
import ContactSection from './ContactSection';

const NoEventPlannified = ({ social = true }: { social?: boolean }) => {
    return (
        <main className="flex-1 container my-20">
            <h1 className="text-3xl font-bold text-center uppercase mb-20">Aucun événement de prévu</h1>
            {social && <ContactSection />}
        </main>
    );
};

export default NoEventPlannified;
