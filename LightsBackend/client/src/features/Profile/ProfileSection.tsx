import './ProfileSection.css'
import Section from '../../layout/Section/Section'
import { useEffect, useState } from 'react';
import { Profile } from '../../types/Profile';
import agent from '../../api/agent';

const defaultProfileInfo : Profile = {
  email: '',
  name: '',
  wordsDiscoveredCount: 0,
  favoriteWordsCount: 1,
  latestWord: 'ghiga',
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
        <div className="profileSection">
          <h2 className="sectionHeadline">Profil</h2>
          <hr></hr>
          <div className='row'>
            <div className='profileInfo cell'>
              <p>Nume: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <p>Cuvinte descoperite: {profile.wordsDiscoveredCount}</p>
              <p>Ultima descoperire: {profile.latestWord}</p>
              <p>Cuvinte favorite: {profile.favoriteWordsCount}</p>
            </div>
            <div className='random cell'>
              <p>Oare</p>
              <p>nisipul</p>
              <p>e de fapt</p>
              <p>multe pietre</p>
              <p>mici?</p>
            </div>      
          </div>
        </div>
    </Section>
  )
}

export default ProfileSection
