const {
  find, has, isNull,
} = require('lodash');

const contacts = [
  {
    name: {
      given: [
        'Jane',
      ],
      family: 'Doe',
    },
    relationship: [
      {
        coding: [
          {
            code: 'Emergency Contact',
            system: 'http://hl7.org/fhir/ValueSet/patient-contactrelationship',
          },
        ],
      },
    ],
    telecom: [
      {
        system: 'phone',
        value: '(03) 3410 5613',
        use: 'mobile',
        rank: 2,
      },
      {
        system: 'phone',
        value: '232.131.4592 x2077',
        use: 'home',
      },
      {
        system: 'email',
        value: 'example@email.com',
        use: 'work',
        period: {
          start: '2009',
        },
        rank: 1,
      },
    ],
  },
  {
    name: {
      given: [
        'James',
      ],
      family: 'Blake',
    },
    relationship: [
      {
        coding: [
          {
            code: 'Next of Kin',
            system: 'http://hl7.org/fhir/ValueSet/patient-contactrelationship',
          },
        ],
      },
    ],
    telecom: [
      {
        system: 'pager',
        value: '(301) 123 1111',
        use: 'work',
        period: {
          start: '2015',
        },
      },
      {
        system: 'phone',
        value: '(301) 555 4533',
        use: 'work',
      },
    ],
  },
];


const getRelationshipsBySystem = (contacts, system) => {
  const contactRelationshipCodings = contacts
    .filter(contact => {
      if (has(contact, 'relationship[0].coding')) {
        let  x = find(contact.relationship[0].coding, code => has(code, 'system') && code.system === system);
        let y = !isNull(x);
        return !isNull(find(contact.relationship[0].coding, code => has(code, 'system') && code.system === system));
      }
      return false;
    });

  const relationships = contactRelationshipCodings.map(contact => {
    const code = find(contact.relationship[0].coding, currCode => has(currCode, 'system') && currCode.system === system);
    return has(code, 'display') ? code.display : code.code;
  });

  return relationships;
};
const contactRelationships = getRelationshipsBySystem(contacts, 'http://terminology.hl7.org/CodeSystem/v3-RoleCode');
console.log(contactRelationships);
