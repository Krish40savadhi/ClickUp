import { useState} from 'react';
import { useAuth } from '../context/AuthenticationContext';

export default function Profile() {
    const { user,setUser } = useAuth();
    const [profile, setProfile] = useState({
        fullName: user?.email ? user.email.split('@')[0] : '' || '',
        email: user?.email || '',
        bio: user?.bio ||'',
        phone: user?.phone||''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(profile);

    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder='Enter your full name'
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={profile.email}
                        readOnly
                        className="w-full p-2 border rounded bg-gray-100"
                        placeholder='Enter your email'
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Bio</label>
                    <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        className="w-full p-2 border rounded"
                        rows="4"
                        placeholder='Tell us about yourself'
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full p-2 border rounded"
                        placeholder='Enter your phone number'
                    />
                </div>
                <button 
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}