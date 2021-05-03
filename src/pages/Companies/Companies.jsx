import React, { useState } from 'react'
import Toolbar from '../../navigation/Toolbar/Toolbar'
import CompanyPanel from './CompanyPanel/CompanyPanel'

function Companies() {
  const [companies] = useState([
    {
      name: 'Shop Apotheke',
      img: 'FIRM8130336.png',
      tags: [
        'Active Kunde ',
        'Java ',
        'SCRUM Master ',
        'Data Scientist ',
        'DevOps '
      ],
      location: { 
        region: 'Köln',
        coord: {
        lat: '51.2015981',
        lng: '6.7958679'
      },
        address: 'Kirschstr.47',
        postalCode: '45688'
      },
      linkToLocal: 'https://goo.gl/maps/Kqeu5r7aXtGfHxsA9',
      select: false,
      web: 'https://jobs.shop-apotheke-europe.com/de/',
      email: 'Job@gmail.de',
      protokoll: 'will be coming from Majd',
      info: 'Same template with different info from Majd',
      business: 'Same here also'
    },
    {
      name: 'Asmodee',
      img: 'FIRM8143376.gif',
      tags: [
        'Active Kunde ',
        'Java ',
        'Frontend ',
        'Business Intelligence '
      ],
      location: { 
        region: 'Essen',
        coord: {
        lat: '51.2015981',
        lng: '6.7958679'
      },
        address: 'Friedrichstr.47',
        postalCode: '45128'
      },
      linkToLocal: 'https://g.page/Asmodee-Deutschland?share',
      select: false,
      web: 'https://asmodee.de/Tags/Karriere',
      email: 'punkte1email@gmail.de',
      protokoll: 'will be coming from Majd',
      info: 'Same template with different info from Majd',
      Business: 'Same here also'
    },
    {
      name: 'Check 24',
      img: 'FIRM8018546.gif',
      tags: [
        'Active Kunde ',
        'C++ ',
        'Software tester ',
        'System administrator ',
        'Business Intelligence '
      ],
      location: { 
        region: 'Berlin',
        coord: {
        lat: '51.2015981',
        lng: '6.7958679'
      },
        address: 'Kakastr.45',
        postalCode: '45200'
      },
      linkToLocal: 'https://www.google.com/maps/search/Check+24/@51.4459506,6.6460209,9z/data=!3m1!4b1',
      select: false,
      web: 'https://jobs.check24.de/',
      email: 'punkte2email@gmail.de',
      protokoll: 'will be coming from Majd',
      info: 'Same template with different info from Majd',
      Business: 'Same here also'
    },
    {
      name: 'Sedo',
      img: 'FIRM19923.gif',
      tags: [
        'Active Kunde ',
        'JavaScript ',
        'React ',
        'Nodejs '
      ],
      location: { 
        region: 'Leipzig',
        coord: {
        lat: '51.2015981',
        lng: '6.7958679'
      },
        address: 'Mamastr.47',
        postalCode: '40128'
      },
      linkToLocal: 'https://goo.gl/maps/RzRtHmoMNgBcy1yt9',
      select: false,
      web: 'https://sedo.com/de/ueber-uns/karriere/',
      email: 'punkte3email@gmail.de',
      protokoll: 'will be coming from Majd',
      info: 'Same template with different info from Majd',
      Business: 'Same here also'
    },
    {
      name: 'Rewe',
      img: 'FIRM1022827.gif',
      tags: ['Active Kunde', 'PhP', 'Java', 'Python'],
      location: { 
        region: 'Passau',
        coord: {
        lat: '51.2015981',
        lng: '6.7958679'
      },
        address: 'Engelmeisterstr.11',
        postalCode: '39032'
      },
      linkToLocal: 'https://www.google.com/maps/search/rewe+gmbh/@51.4151821,6.7565612,14z/data=!3m1!4b1',
      select: false,
      web: 'https://karriere.rewe-group.com/?utm_source=careersite&utm_campaign=konzernzentrale',
      email: 'punkte4email@gmail.de',
      protokoll: 'will be coming from Majd',
      info: 'Same template with different info from Majd',
      Business: 'Same here also'
    }
  ])
  return (
    <div>
      <Toolbar />
      {companies.map((company) => (
        <CompanyPanel key={company.img} data={company} />
      ))}
    </div>
  )
}

export default Companies
