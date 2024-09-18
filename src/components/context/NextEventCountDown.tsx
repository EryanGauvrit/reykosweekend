'use client';

import clsx from 'clsx';
import { formatDate } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useCallback, useEffect, useState } from 'react';
import { Card } from '../ui/card';

const NextEventCountDown = ({ startDate, title, className }: { startDate: Date; title?: string; className?: string }) => {
    const formatNumber = (number: number) => {
        if (number < 10) {
            return `0${number}`;
        }
        return number;
    };

    const calculateTimeLeft = useCallback(() => {
        const difference = +new Date(startDate) - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    }, [startDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, calculateTimeLeft]);

    return (
        <Card
            className={clsx(
                'flex flex-col items-center justify-center gap-4 p-5 xs:px-10 max-h-[300px] xs:max-w-[430px] m-auto',
                className,
            )}
        >
            <h2 className="text-2xl font-bold text-center uppercase">{title || 'Prochain évènement dans'}</h2>
            <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl xs:text-6xl font-bold">{formatNumber(timeLeft.days)}</span>
                    <span className="xs:text-lg font-bold">Jours</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl xs:text-6xl font-bold">{formatNumber(timeLeft.hours)}</span>
                    <span className="xs:text-lg font-bold">Heures</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl xs:text-6xl font-bold">{formatNumber(timeLeft.minutes)}</span>
                    <span className="xs:text-lg font-bold">Minutes</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl xs:text-6xl font-bold">{formatNumber(timeLeft.seconds)}</span>
                    <span className="xs:text-lg font-bold">Secondes</span>
                </div>
            </div>
            <h3 className="xs:text-lg font-bold text-center">
                Le {formatDate(startDate, 'dd LLLL', { locale: fr })} à {formatDate(startDate, 'HH')}h{formatDate(startDate, 'mm')}
            </h3>
        </Card>
    );
};

export default NextEventCountDown;
