import React, { useState } from 'react'
import Toolbar from '../../navigation/Toolbar/Toolbar'
import CandidatePanel from './CandidatesPanel/CandidatePanel'
function Candidates() {
  const [candidates] = useState([
    {
      name: 'Márcio Duarte',
      img: 'marcio.jpg',
      tags: ['Java', 'SCRUM Master', 'PHP', 'C'],
      local: 'Maternusstraße, 14, 50996 Köln',
      contact: '+49 152 2641 1141'
    },
    {
      name: 'Younes',
      img: 'younes.png',
      tags: ['Java', 'Frontend', 'Business Intelligence'],
      local: 'Straße, 4, 30196 Düsseldorf',
      contact: '+49 122 2001 3141'
    },
    {
      name: 'Majd',
      img: 'majd.png',
      tags: ['JavaScript', 'Software tester', 'React', 'HTML5'],
      local: 'Straße, 8, 34093  Düsseldorf',
      contact: '+49 131 0041 0142'
    }
  ])
  return (
    <div>
      <Toolbar />
      {candidates.map((candidate) => (
        <CandidatePanel key={candidate.img} data={candidate} />
      ))}
    </div>
  )
}

export default Candidates
