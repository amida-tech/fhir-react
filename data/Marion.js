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
              display: 'Emergency Contact',
              system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
              code: 'C',
            },
          ],
        },
        {
          coding: [
            {
              code: 'MTH',
              system: 'http://terminology.hl7.org/CodeSystem/v3-RoleCode',
              display: 'Mother',
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
              code: 'N',
              system: 'http://terminology.hl7.org/CodeSystem/v2-0131',
              display: 'Next of Kin',
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
  photo: [
    {
      data: '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',
      contentType: 'image/jpeg',
    },
  ],
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
