import { CONSULTANT, ENTREPRISE, INVESTOR } from '../../config/constants'
import Credit from '../../models/credit'
export const creditResources =
{
    resource: Credit,
    options: {

        navigation: {
            icon: 'Events',
        },
        listProperties: ['user', 'amount', 'date', 'status'],
        properties: {
            user: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            date: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            amount: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            created_at: {isVisible: false},
          updated_at: {isVisible: false},
        }
    }
}