'use client';

import { Input } from '@/components/ui';

export default function InputTest() {
    return(
        <div style={{ width: '100%', background: 'white', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
            <Input placeholder='enter email' delay={0.02}></Input>
            <Input placeholder='name' delay={0.08}></Input>
        </div>
    );
}