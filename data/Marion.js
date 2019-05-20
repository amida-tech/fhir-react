export const patient = {
  active: true,
  name: [{
    use: 'nickname',
    family: 'Cotillard',
    given: ['Marion', 'Simone'],
    prefix: ['Miss'],
    suffix: ['III'],
    period: {
      start: new Date('September 30, 1975 00:00:00'),
    },
  },
  {
    use: 'official',
    text: 'Marion Simone Cotillard',
    family: 'Cotillard',
    given: ['Marion'],
    period: {
      start: new Date('September 30, 1975 00:00:00'),
    },
  },
  {
    use: 'usual',
    text: 'Marion Cotillard',
    family: 'Cotillard',
    given: ['Marion'],
    period: {
      start: new Date('September 30, 1975 00:00:00'),
    },
  },
  {
    use: 'nickname',
    text: 'Simone',
    period: {
      start: new Date('November 30, 1975 00:00:00'),
      end: new Date(),
    },
  }],
  contact: [
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
  ],
  birthDate: new Date('September 30, 1975 00:00:00'),
  identifier: [{
    use: 'official',
    system: 'http://www.ign.com',
    value: '0005',
    period: {
      start: new Date('September 30, 1975 00:00:00'),
      end: new Date(),
    },
  }],
  photo: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTIwNjA4NjM0MTE4MDQ3MjQ0/marion-cotillard-267544-1-402.jpg',
  gender: 'female',
  address: [
    {
      use: 'home',
      type: 'physical',
      line: ['167 Hollywood Boulevard', 'Excelsior Heights'],
      city: 'Los Angeles',
      state: 'California',
      postalCode: '90001',
      country: 'United States',
      period: {
        start: new Date('July 17, 2015 00:00:00'),
        end: new Date(),
      },
    },
    {
      use: 'home',
      type: 'physical',
      line: ['167 Merveille Rue', 'Nouveau Quartier'],
      city: 'Paris',
      district: 'Île-de-France',
      state: '',
      postalCode: '75000',
      country: 'France',
      period: {
        start: new Date('July 17, 2015 00:00:00'),
        end: new Date(),
      },
    },
    {
      use: 'work',
      type: 'physical',
      text: '2000 Zut Alors Route\nQuartier du Film\n75006 Paris, France',
      line: ['2000 Zut Alors Route', 'Quartier du Film'],
      city: 'Paris',
      district: 'Île-de-France',
      state: '',
      postalCode: '75006',
      country: 'France',
      period: {
        start: new Date('July 17, 2009 00:00:00'),
        end: new Date('August 25, 2015 00:00:00'),
      },
    },
  ],
};

export const fhirDescriptions = {
  nameDescription: 'Information about an individual or animal receiving health care services.',
  identifierDescription: 'An identifier for this patient. Identity likely provided by managing organization.',
  addressDescription: 'Other or past addresses this individual or organization has used.',
};
