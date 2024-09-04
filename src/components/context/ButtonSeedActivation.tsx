'use client';

import { useRouter } from 'next/navigation';
import { dbInitializer } from '../../../prisma/seed';
import { Button } from '../ui/button';

const ButtonSeedActivation = () => {
    const router = useRouter();
    return (
        <Button
            className="m-auto"
            onClick={async () => {
                await dbInitializer()
                    .then(() => {
                        console.log('Database initialized');
                        router.refresh();
                    })
                    .catch((e) => {
                        console.error(e);
                        process.exit(1);
                    });
            }}
        >
            Générer les données par default
        </Button>
    );
};

export default ButtonSeedActivation;
