import AdminBro from 'admin-bro'
import { CONSULTANT, ENTREPRISE, INVESTOR } from '../../config/constants';
import Journal from '../../models/journal'
console.log(Journal);
export const journalResources = 
    {
        resource: Journal,
        options: {
            navigation:{
            icon: 'Add',
          
        },
        listProperties: ['content','concerned_type', 'nbr_like' ],
          properties: {
            concerned_type: {
              availableValues: [
                {value:INVESTOR, label: "Investisseur"},
                {value:CONSULTANT, label: "Consultant"},
                {value:ENTREPRISE, label: "Entreprise"},
              ],
              isVisible: { list: true, filter: true, show: true, edit: true },
            },
            image: {
              components: {
                edit: AdminBro.bundle('../journal/components/uplod_image'),
                create: AdminBro.bundle('../journal/components/uplod_image'),
              }
            },
            publisher: {isVisible: false},
          created_at: {isVisible: false},
          updated_at: {isVisible: false},
          nbr_like: {isVisible: false},
          like: {isVisible: false},
          comment: {isVisible: false},
          _id: {isVisible: false},
          },
        }
      }