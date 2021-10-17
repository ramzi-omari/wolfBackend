import { CONSULTANT, ENTREPRISE, INVESTOR } from '../../config/constants'
import User from '../../models/users'
export const usersResources = 
    {
        resource: User,
        options: {
          
            navigation:{
            icon: 'Events',
          
        },
        listProperties: ['first_name', 'last_name', 'email', 'phone', 'isVerified', 'type'],
          properties: {
            type: {
              availableValues: [
                {value:INVESTOR, label: "Investisseur"},
                {value:CONSULTANT, label: "Consultant"},
                {value:ENTREPRISE, label: "Entreprise"},
              ],
              isVisible: { list: true, filter: true, show: true, edit: true },
            },
            isDeleted: {isVisible: false},
          created_at: {isVisible: false},
          updated_at: {isVisible: false},
          password: {isVisible: false},
          _id: {isVisible: false},
          },
        }
      }