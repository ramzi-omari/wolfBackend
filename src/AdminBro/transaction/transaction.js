import { CONSULTANT, ENTREPRISE, INVESTOR } from '../../config/constants'
import Transaction from '../../models/transaction'
export const transactionResources =
{
    resource: Transaction,
    options: {

        navigation: {
            icon: 'Events',
        },
        listProperties: ['from', 'to', 'amount', 'date', 'motif', 'status'],
        properties: {
            from: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            to: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            date: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            amount: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            motif: {
                isVisible: { list: true, filter: true, show: true, edit: false },
            },
            created_at: {isVisible: false},
          updated_at: {isVisible: false},
        }
    }
}