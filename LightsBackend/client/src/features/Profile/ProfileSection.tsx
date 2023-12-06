import './ProfileSection.css'
import Section from '../../layout/Section/Section'
import { useEffect, useState } from 'react';
import { Profile } from '../../types/Profile';
import agent from '../../api/agent';

const defaultProfileInfo : Profile = {
  email: 'unregistered@gmail.com',
  name: 'Sofer fantoma pe autostrada',
  wordsDiscoveredCount: 999,
  favoriteWordsCount: 1,
  latestWord: 'Ghiga',
  profilePicture: ''
}
function ProfileSection() {
  const [profile, setProfile] = useState<Profile>(defaultProfileInfo);

  useEffect(() => {
    agent.Profile.getProfile()
    .then(res => {
        setProfile(res)          
    })
    .catch(err => console.log(err.response))
  }, [])

    return (
    <Section>
        <h1>Profil</h1>
        <p>Nume: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <p>Cuvinte descoperite: {profile.wordsDiscoveredCount}</p>
        <p>Ultima descoperire: {profile.latestWord}</p>
        <p>Cuvinte favorite: {profile.favoriteWordsCount}</p>
    </Section>
  )
}

export default ProfileSection
