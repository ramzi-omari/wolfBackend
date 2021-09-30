import AdminBro from 'admin-bro';
import AdminBroExpress from '@admin-bro/express';
import AdminBroMongoose from '@admin-bro/mongoose';
import Admin from '../models/admin';
import { journalResources } from '../AdminBro/journal/journal';
import Journals from '../models/journal';
import Users from '../models/users'
import { usersResources } from '../AdminBro/users/users';

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
  resources:[
     // journalResource,
    usersResources,
    journalResources,
  ],
  locale: {
    translations: {
      labels: {
        Users: 'Utilisateurs',
        Journal: 'Publications'
      }
    }
  },
  rootPath: '/admin',
  branding: {
    companyName: "CaZaMeLe",
    softwareBrothers: false,
    logo:'/Users/mac/Documents/project/NODE/social Media/src/PM.png',
    favicon:'/Users/mac/Documents/project/NODE/social Media/src/PM.png',
    
  }
});

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async (email, password) => {
      const ADMIN = await Admin.findOne({email});
    if (ADMIN && email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    return null
  }
})

module.exports = router
