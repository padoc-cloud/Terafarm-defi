
import React from 'react';
import { Metadata } from 'next';
import Profile  from '@/views/profile';

export const metadata: Metadata = {
    title: "Terafarm | My Profile",
    description: "This is My Profile Page"
};

const ProfilePage = () => {
    return (
        <Profile />
    );
};

export default ProfilePage;