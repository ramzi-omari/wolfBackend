import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import AdminBroMongoose from '@admin-bro/mongoose';
import User from './src/models/users';
import Journal from './src/models/journal';
import { CONSULTANT, ENTREPRISE, INVESTOR } from './src/config/constants';

AdminBro.registerAdapter(AdminBroMongoose)

//admin bro
const contentNavigation = {
  name: 'content',
  icon: 'Accessibility',
}

const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: {
        
          navigation:{
          name: 'Utilisateur',
          icon: 'Events',
        
      },
        properties: {
          type: {
            availableValues: [
              {value:INVESTOR, label: "Investisseur"},
              {value:CONSULTANT, label: "Consultant"},
              {value:ENTREPRISE, label: "Entreprise"},
            ],
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          isDeleted: {isVisible: { list: false, filter: false, show: true, edit: false },},
        created_at: {isVisible: false},
        updated_at: {isVisible: false},
        password: {isVisible: false},
        _id: {isVisible: false},
        },
      }
    },
    {
      resource: Journal,
      options: {
        
          navigation:{
          name: 'Publication',
          icon: 'application--web',
        
      },
    },
  }
  ],
  rootPath: '/admin',
  branding: {
    logo: './logo.png',
    companyName: 'WOLF',
    softwareBrothers: true   // if Software Brothers logos should be shown in the sidebar footer
  },
})

const router = AdminBroExpress.buildRouter(adminBro)

export default router;
