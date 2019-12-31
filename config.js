var config ={}

config.endpoint = "https://family-assistance-cosmos-db.documents.azure.com:443/"
config.primartKey = "99OEziozdzKjAzBRHDIC2PYijN3mcJzSbAxDYqJe3N92r33hbk8cqdi8ayIqCW2yMnKbmareLWXFz6nN8J2gcA=="



config.database = {
    id: 'FamilyDatabase'
  }
  
  config.container = {
    id: 'FamilyContainer'
  }
  
  config.items = {
    Andersen: {
      id: 'Anderson.1',
      Country: 'USA',
      lastName: 'Andersen',
      parents: [
        {
          firstName: 'Thomas'
        },
        {
          firstName: 'Mary Kay'
        }
      ],
      children: [
        {
          firstName: 'Henriette Thaulow',
          gender: 'female',
          grade: 5,
          pets: [
            {
              givenName: 'Fluffy'
            }
          ]
        }
      ],
      address: {
        state: 'WA',
        county: 'King',
        city: 'Seattle'
      }
    },
    Wakefield: {
      id: 'Wakefield.7',
      Country: 'Italy',
      parents: [
        {
          familyName: 'Wakefield',
          firstName: 'Robin'
        },
        {
          familyName: 'Miller',
          firstName: 'Ben'
        }
      ],
      children: [
        {
          familyName: 'Merriam',
          firstName: 'Jesse',
          gender: 'female',
          grade: 8,
          pets: [
            {
              givenName: 'Goofy'
            },
            {
              givenName: 'Shadow'
            }
          ]
        },
        {
          familyName: 'Miller',
          firstName: 'Lisa',
          gender: 'female',
          grade: 1
        }
      ],
      address: {
        state: 'NY',
        county: 'Manhattan',
        city: 'NY'
      },
      isRegistered: false
    }
  }
  
  module.exports = config