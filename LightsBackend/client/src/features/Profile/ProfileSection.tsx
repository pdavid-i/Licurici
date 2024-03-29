import './ProfileSection.css'
import Section from '../../layout/Section/Section'
import { useEffect, useState } from 'react';
import { Profile } from '../../types/Profile';
import { Thought } from '../../types/Thought';
import agent from '../../api/agent';

const defaultProfileInfo : Profile = {
  email: '',
  name: '',
  wordsDiscoveredCount: 0,
  favoriteWordsCount: 1,
  latestWord: 'ghiga',
  profilePicture: ''
}

const defaultThoughtChunks : Thought = {
  firstFragment: 'Not',
  secondFragment: 'a thought',
  thirdFragment: 'behind those',
  forthFragment: 'eyes'
}

function ProfileSection() {
  const [profile, setProfile] = useState<Profile>(defaultProfileInfo);
  const [thought, setThought] = useState<Thought>(defaultThoughtChunks);

  useEffect(() => {
    agent.Profile.getProfile()
    .then(res => {
        setProfile(res)          
    })
    .catch(err => console.log(err.response))
  }, [])

  useEffect(() => {
    agent.Thoughts.random()
    .then(res => {
      const contentParts = res.content.split('#');
      setThought({
        firstFragment: contentParts[0] || '',
        secondFragment: contentParts[1] || '',
        thirdFragment: contentParts[2] || '',
        forthFragment: contentParts[3] || ''
      });   
     })
    .catch(err => console.log(err))
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
              <p>{thought.firstFragment}</p>
              <p>{thought.secondFragment}</p>
              <p>{thought.thirdFragment}</p>
              <p>{thought.forthFragment}</p>
            </div>      
          </div>
        </div>
    </Section>
  )
}

export default ProfileSection
